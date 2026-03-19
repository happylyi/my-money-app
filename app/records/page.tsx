'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

interface Project {
  id: number;
  name: string;
}

export default function Records() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [recordDate, setRecordDate] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProjects();
    const today = new Date().toISOString().split('T')[0];
    setRecordDate(today);
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories((data as Category[]) || []);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*');
    setProjects((data as Project[]) || []);
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d.]/g, '');
    const dot = val.indexOf('.');
    if (dot !== -1) val = val.slice(0, dot + 3);
    setAmount(val);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setMsg('请输入正确金额');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('records').insert([
      {
        amount: parseFloat(amount),
        type,
        note: note.trim(),
        category_id: categoryId,
        project_id: projectId,
        record_date: recordDate,
      },
    ]);

    if (error) setMsg('保存失败：' + error.message);
    else {
      setMsg('保存成功！');
      setAmount('');
      setNote('');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: '#fff',
        borderRadius: '18px',
        padding: '24px',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>记录收支</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
          <button
            onClick={() => setType('income')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: type === 'income' ? '#10b981' : '#eee',
              color: type === 'income' ? '#fff' : '#333',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            收入
          </button>
          <button
            onClick={() => setType('expense')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: type === 'expense' ? '#ef4444' : '#eee',
              color: type === 'expense' ? '#fff' : '#333',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            支出
          </button>
        </div>

        <input
          type="text"
          placeholder="金额（小数点后最多2位）"
          value={amount}
          onChange={handleAmountInput}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="text"
          placeholder="备注"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="date"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        />

        <select
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        >
          <option value="">不选择分类</option>
          {categories
            .filter((c) => c.type === type)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>

        <select
          value={projectId ?? ''}
          onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : null)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        >
          <option value="">不选择项目</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            color: '#fff',
            background: loading ? '#a5b4fc' : '#667eea',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            fontSize: '15px',
          }}
        >
          {loading ? '保存中...' : '保存记录'}
        </button>

        {msg && (
          <p style={{
            textAlign: 'center',
            marginTop: '16px',
            color: msg.includes('成功') ? '#10b981' : '#ef4444',
          }}>
            {msg}
          </p>
        )}

        <button
          onClick={() => router.push('/dashboard')}
          style={{
            width: '100%',
            padding: '12px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '10px',
            marginTop: '16px',
            cursor: 'pointer',
          }}
        >
          返回仪表盘
        </button>
      </div>
    </div>
  );
}