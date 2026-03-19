'use client';
import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../../supabase';
import { useRouter, useSearchParams } from 'next/navigation';

// 外层页面 + Suspense 包裹（修复 Netlify 构建错误）
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{padding:'50px',textAlign:'center'}}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

// 内层真实页面逻辑
function ResetPasswordContent() {
    const [newPassword, setNewPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        document.title = '重置密码 - 个人记账1.0';
        const hash = window.location.hash;
        if (!hash.includes('recovery_token')) {
            setMsg('无效的重置链接，请重新获取');
        }
    }, []);

    const handleReset = async () => {
        if (!newPassword || newPassword.length < 6) {
            setMsg('密码长度应至少6位');
            return;
        }
        setLoading(true);
        setMsg('');

        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                setMsg('重置失败：密码不符合要求或链接已过期');
            } else {
                setMsg('密码重置成功！正在跳转到登录...');
                setTimeout(() => router.push('/login'), 1600);
            }
        } catch (e) {
            setMsg('操作失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
            data-oid="bm6d2wa"
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '40px 32px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    textAlign: 'center',
                }}
                data-oid="r3qkgkb"
            >
                <h2 style={{ fontSize: '26px', marginBottom: 20 }} data-oid="l2rcdt9">
                    重置密码
                </h2>
                <input
                    type="password"
                    placeholder="请输入新密码（至少6位）"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 12,
                        marginBottom: 16,
                        border: '1px solid #eee',
                        borderRadius: 8,
                    }}
                    data-oid="r2wyrfu"
                />

                <button
                    onClick={handleReset}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: 14,
                        background: loading
                            ? '#a5b4fc'
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 16,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                    data-oid="9fn6_68"
                >
                    {loading ? '处理中...' : '确认重置密码'}
                </button>
                {msg && (
                    <p
                        style={{
                            color: msg.includes('成功') ? '#10b981' : '#ef4444',
                            marginTop: 16,
                            fontSize: 14,
                        }}
                        data-oid="oi_c2wu"
                    >
                        {msg}
                    </p>
                )}
            </div>
        </div>
    );
}