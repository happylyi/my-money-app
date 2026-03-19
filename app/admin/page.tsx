'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// 固定管理员账号
const ADMIN_EMAIL = 'bestwishesforeb@163.com';
const ADMIN_PASS = 'best6661';

interface User {
  id: string;
  email: string;
  created_at: string;
}

// 改名：避免和内置 Record 类型冲突
interface RecordItem {
  id: number;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  note: string;
  record_date: string;
  users: { email: string } | null;
}

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allRecords, setAllRecords] = useState<RecordItem[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // 页面标题
  useEffect(() => {
    document.title = '个人记账 - 超级管理员';
  }, []);

  // 登录状态持久化
  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAdminLoggedIn(true);
      loadAllData();
    } else {
      setLoading(false);
    }
  }, []);

  // 管理员登录
  const handleAdminLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAdminLoggedIn(true);
      setMsg('');
      loadAllData();
    } else {
      setMsg('账号或密码错误');
    }
  };

  // 退出登录
  const handleAdminLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAdminLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // 加载所有数据
  async function loadAllData() {
    setLoading(true);
    // 加载用户
    const { data: usersData } = await supabase
      .from('users')
      .select('id, email, created_at')
      .order('created_at', { ascending: false });
    // 加载流水
    const { data: recordsData } = await supabase
      .from('records')
      .select('*, users(email)')
      .order('record_date', { ascending: false });

    setAllUsers(usersData || []);
    setAllRecords(recordsData as RecordItem[] || []);
    setLoading(false);
  }

  // 筛选流水
  const filteredRecords = selectedUserId === 'all'
    ? allRecords
    : allRecords.filter(r => r.user_id === selectedUserId);

  // 统计
  const totalIncome = filteredRecords
    .filter(r => r.type === 'income')
    .reduce((s, r) => s + Number(r.amount), 0);
  const totalExpense = filteredRecords
    .filter(r => r.type === 'expense')
    .reduce((s, r) => s + Number(r.amount), 0);

  // 每日注册
  const dailyReg: Record<string, number> = {};
  allUsers.forEach(u => {
    const day = u.created_at.split('T')[0];
    dailyReg[day] = (dailyReg[day] || 0) + 1;
  });

  // 未登录 → 显示登录页
  if (!isAdminLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>🔑 管理员登录</h2>
          <input
            type="email"
            placeholder="管理员邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '15px',
            }}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '15px',
            }}
          />
          <button
            onClick={handleAdminLogin}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            登录管理后台
          </button>
          {msg && (
            <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '16px' }}>
              {msg}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 已登录 → 显示后台
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1f2937',
      padding: '20px',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2>⚙️ 超级管理员管理后台</h2>
          <button
            onClick={handleAdminLogout}
            style={{
              padding: '10px 16px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            退出登录
          </button>
        </div>

        {/* 概览卡片 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div style={{ background: '#111827', padding: '20px', borderRadius: '16px' }}>
            <h4>总用户数</h4>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px' }}>
              {allUsers.length}
            </div>
          </div>
          <div style={{ background: '#111827', padding: '20px', borderRadius: '16px' }}>
            <h4>总流水</h4>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px' }}>
              {filteredRecords.length}
            </div>
          </div>
          <div style={{ background: '#111827', padding: '20px', borderRadius: '16px' }}>
            <h4>总收入</h4>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px', color: '#22c55e' }}>
              {totalIncome.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#111827', padding: '20px', borderRadius: '16px' }}>
            <h4>总支出</h4>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px', color: '#ef4444' }}>
              {totalExpense.toFixed(2)}
            </div>
          </div>
        </div>

        {/* 筛选 */}
        <div style={{ background: '#111827', padding: '16px', borderRadius: '16px', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>数据筛选</h4>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: '#374151',
              color: '#fff',
              border: 'none',
            }}
          >
            <option value="all">🌍 全站所有用户</option>
            {allUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        {/* 图表 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div style={{ background: '#111827', padding: '24px', borderRadius: '16px' }}>
            <h4>收支占比</h4>
            <Pie
              data={{
                labels: ['收入', '支出'],
                datasets: [
                  { data: [totalIncome, totalExpense], backgroundColor: ['#22c55e', '#ef4444'] },
                ],
              }}
            />
          </div>
          <div style={{ background: '#111827', padding: '24px', borderRadius: '16px' }}>
            <h4>每日注册量</h4>
            <Bar
              data={{
                labels: Object.keys(dailyReg),
                datasets: [
                  { data: Object.values(dailyReg), backgroundColor: '#667eea' },
                ],
              }}
            />
          </div>
        </div>

        {/* 用户列表 */}
        <div style={{ background: '#111827', padding: '24px', borderRadius: '16px' }}>
          <h4>所有用户注册信息</h4>
          <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '12px' }}>
            {allUsers.map((u, i) => (
              <div
                key={u.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderBottom: '1px solid #374151',
                  fontSize: '14px',
                }}
              >
                <div>{i + 1}</div>
                <div>{u.email}</div>
                <div>{u.created_at.split('T')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 流水记录 */}
        <div style={{
          background: '#111827',
          padding: '24px',
          borderRadius: '16px',
          marginTop: '20px',
        }}>
          <h4>流水记录</h4>
          <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '12px' }}>
            {filteredRecords.map((r) => (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderBottom: '1px solid #374151',
                  fontSize: '14px',
                }}
              >
                <div>{r.users?.email || '未知'}</div>
                <div>{r.record_date}</div>
                <div>{r.type === 'income' ? '收入' : '支出'}</div>
                <div style={{ color: r.type === 'income' ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>
                  {r.type === 'income' ? '+' : '-'}{Number(r.amount).toFixed(2)}
                </div>
                <div>{r.note || '无备注'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}