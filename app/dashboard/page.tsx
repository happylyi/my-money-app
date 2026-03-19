'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

interface Project {
  id: number;
  name: string;
}

interface Record {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  note: string;
  record_date: string;
  category_id: number | null;
  project_id: number | null;
  categories: Category | null;
  projects: Project | null;
}

export default function Dashboard() {
  const router = useRouter();
  const [records, setRecords] = useState<Record[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    amount: '',
    note: '',
    record_date: '',
    category_id: null as number | null,
    project_id: null as number | null,
  });

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push('/login');
      return;
    }
    await Promise.all([loadRecords(), loadCategories(), loadProjects()]);
    setLoading(false);
  }

  async function loadRecords() {
    const { data } = await supabase
      .from('records')
      .select('*, categories(*), projects(*)')
      .order('record_date', { ascending: false });
    setRecords((data as Record[]) || []);
  }

  async function loadCategories() {
    const { data } = await supabase.from('categories').select('*');
    setCategories((data as Category[]) || []);
  }

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*');
    setProjects((data as Project[]) || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  function handleEdit(item: Record) {
    setEditId(item.id);
    setForm({
      amount: item.amount.toString(),
      note: item.note || '',
      record_date: item.record_date,
      category_id: item.category_id,
      project_id: item.project_id,
    });
  }

  async function handleUpdate(id: number) {
    await supabase
      .from('records')
      .update({
        amount: parseFloat(form.amount),
        note: form.note,
        record_date: form.record_date,
        category_id: form.category_id,
        project_id: form.project_id,
      })
      .eq('id', id);
    setEditId(null);
    loadRecords();
  }

  const totalIncome = records
    .filter((r) => r.type === 'income')
    .reduce((s, r) => s + Number(r.amount), 0);
  const totalExpense = records
    .filter((r) => r.type === 'expense')
    .reduce((s, r) => s + Number(r.amount), 0);

  const pieData = {
    labels: ['收入', '支出'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  const expenseRecords = records.filter((r) => r.type === 'expense');
  const barData = {
    labels: expenseRecords.map((r) => r.categories?.name || '未分类'),
    datasets: [
      {
        label: '支出金额',
        data: expenseRecords.map((r) => Number(r.amount)),
        backgroundColor: '#ef4444',
      },
    ],
  };

  const lineData = {
    labels: records.map((r) => r.record_date),
    datasets: [
      {
        label: '收入',
        data: records.map((r) => (r.type === 'income' ? r.amount : 0)),
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
      },
      {
        label: '支出',
        data: records.map((r) => (r.type === 'expense' ? r.amount : 0)),
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
      },
    ],
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '14px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2 style={{ color: '#fff', margin: 0 }}>📊 记账仪表盘</h2>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 16px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            退出登录
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>收支占比</h4>
            <Pie data={pieData} />
          </div>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>支出分类</h4>
            <Bar data={barData} />
          </div>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>收支趋势</h4>
            <Line data={lineData} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}>
          <button
            onClick={() => router.push('/records')}
            style={{
              padding: '10px 16px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            记录收支
          </button>
          <button
            onClick={() => router.push('/categories')}
            style={{
              padding: '10px 16px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            分类管理
          </button>
          <button
            onClick={() => router.push('/projects')}
            style={{
              padding: '10px 16px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            项目管理
          </button>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>流水记录</h3>
          {loading ? (
            <p style={{ textAlign: 'center' }}>加载中...</p>
          ) : records.length === 0 ? (
            <p style={{ textAlign: 'center' }}>暂无记录</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {records.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {editId === r.id ? (
                    <div style={{ width: '100%' }}>
                      <input
                        type="number"
                        step="0.01"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      />
                      <input
                        type="text"
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        placeholder="备注"
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      />
                      <input
                        type="date"
                        value={form.record_date}
                        onChange={(e) => setForm({ ...form, record_date: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      />
                      <select
                        value={form.category_id ?? ''}
                        onChange={(e) =>
                          setForm({ ...form, category_id: e.target.value ? Number(e.target.value) : null })
                        }
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="">不选分类</option>
                        {categories
                          .filter((c) => c.type === r.type)
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                      <select
                        value={form.project_id ?? ''}
                        onChange={(e) =>
                          setForm({ ...form, project_id: e.target.value ? Number(e.target.value) : null })
                        }
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginBottom: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="">不选项目</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleUpdate(r.id)}
                        style={{
                          padding: '8px 14px',
                          background: '#667eea',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          marginRight: '6px',
                        }}
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        style={{
                          padding: '8px 14px',
                          background: '#eee',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{r.note || '无备注'}</div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          {r.record_date} | {r.categories?.name || '未分类'} | {r.projects?.name || '未项目'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', marginBottom: '6px' }}>
                        <span style={{
                          color: r.type === 'income' ? '#22c55e' : '#ef4444',
                          fontWeight: 'bold',
                        }}>
                          {r.type === 'income' ? '+' : '-'}{Number(r.amount).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEdit(r)}
                        style={{
                          padding: '8px 12px',
                          background: '#f59e0b',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        修改
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}