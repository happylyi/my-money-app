'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('处理中');
  const [showForget, setShowForget] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = '个人记账1.0';
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let dots = 0;
      interval = setInterval(() => {
        dots = (dots + 1) % 4;
        setLoadingText('处理中' + '.'.repeat(dots));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) router.push('/dashboard');
    };
    checkUser();
  // ✅ 只加这一行，彻底消除警告，不影响任何功能
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const withTimeout = <T,>(promise: Promise<T>): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error('请求超时')), 800)
      ),
    ]);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('请输入邮箱和密码');
      return;
    }
    if (password.length < 6) {
      setMsg('密码长度应至少6位');
      return;
    }

    setLoading(true);
    setMsg('');

    try {
      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password })
      );

      if (!error && data.user) {
        if (data.user.email_confirmed_at) {
          router.push('/dashboard');
          return;
        } else {
          setMsg('请先前往邮箱验证账号');
        }
      } else {
        const { error: err2 } = await withTimeout(
          supabase.auth.signUp({ email, password })
        );
        if (err2) {
          setMsg('操作失败：注册失败，可能是邮箱已存在或密码不符合要求');
        } else {
          setMsg('注册成功，请前往邮箱验证');
        }
      }
    } catch (e) {
      setMsg('操作失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleForget = async () => {
    if (!email) {
      setMsg('请输入邮箱');
      return;
    }
    setLoading(true);
    setMsg('');

    try {
      await withTimeout(supabase.auth.resetPasswordForEmail(email));
      setMsg('重置链接已发送至您的邮箱');
    } catch (e) {
      setMsg('发送失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '16px', padding: '40px 32px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: 8 }}>个人记账</h2>
        <p style={{ color: '#666', marginBottom: 30 }}>首次登录自动注册</p>

        {!showForget ? (
          <>
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #eee', borderRadius: '8px' }}
            />
            <input
              type="password"
              placeholder="密码（至少6位）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #eee', borderRadius: '8px' }}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? loadingText : '登录/注册'}
            </button>
            <p style={{ marginTop: '16px', color: '#667eea', cursor: 'pointer' }} onClick={() => setShowForget(true)}>忘记密码？</p>
          </>
        ) : (
          <>
            <h3 style={{ marginBottom: '20px' }}>找回密码</h3>
            <input
              type="email"
              placeholder="输入您的邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #eee', borderRadius: '8px' }}
            />
            <button
              onClick={handleForget}
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? loadingText : '发送重置链接'}
            </button>
            <p style={{ marginTop: '16px', color: '#667eea', cursor: 'pointer' }} onClick={() => setShowForget(false)}>返回登录</p>
          </>
        )}

        {msg && <p style={{ color: msg.includes('成功') || msg.includes('已发送') ? '#10b981' : '#ef4444', marginTop: '16px', fontSize: '14px' }}>{msg}</p>}
      </div>
    </div>
  );
}