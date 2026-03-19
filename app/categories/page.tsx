'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

export default function Categories() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categories, setCategories] = useState<Category[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('id', { ascending: false });
    setCategories((data as Category[]) || []);
  };

  const handleAdd = async () => {
    const trimName = name.trim();
    if (!trimName) {
      setMsg('请输入分类名称');
      return;
    }
    if (trimName.length > 20) {
      setMsg('分类名称不能超过20个字符');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('categories').insert([{ name: trimName, type }]);
    if (error) setMsg('添加失败');
    else {
      setMsg('添加成功！');
      setName('');
      fetchCategories();
    }
    setLoading(false);
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditType(cat.type);
  };

  const handleSaveEdit = async () => {
    const trimName = editName.trim();
    if (!editingId || !trimName) {
      setMsg('请输入分类名称');
      return;
    }
    if (trimName.length > 20) {
      setMsg('分类名称不能超过20个字符');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .update({ name: trimName, type: editType })
      .eq('id', editingId);
    if (error) setMsg('修改失败');
    else {
      setMsg('修改成功！');
      setEditingId(null);
      fetchCategories();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, catName: string) => {
    const confirmDel = window.confirm(`此分类下所有记账数据将一并删除，确认是否删除【${catName}】？`);
    if (!confirmDel) return;

    setLoading(true);
    await supabase.from('records').delete().eq('category_id', id);
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) setMsg('删除失败');
    else {
      setMsg('删除成功！');
      fetchCategories();
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
        maxWidth: '600px',
        background: '#fff',
        borderRadius: '18px',
        padding: '24px',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>分类管理</h2>

        <div style={{
          padding: '18px',
          background: '#f9fafb',
          borderRadius: '14px',
          marginBottom: '24px',
        }}>
          <h4 style={{ margin: '0 0 12px 0' }}>新增分类</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <button
              onClick={() => setType('income')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: type === 'income' ? '#10b981' : '#eee',
                color: type === 'income' ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              收入
            </button>
            <button
              onClick={() => setType('expense')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: type === 'expense' ? '#ef4444' : '#eee',
                color: type === 'expense' ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              支出
            </button>
          </div>
          <input
            type="text"
            maxLength={20}
            placeholder="分类名称（20字内）"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#a5b4fc' : '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              marginTop: '10px',
              cursor: 'pointer',
            }}
          >
            {loading ? '提交中...' : '添加分类'}
          </button>
        </div>

        <h4 style={{ margin: '0 0 14px 0' }}>分类列表</h4>
        {categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>暂无分类</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                style={{
                  padding: '16px',
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {editingId === cat.id ? (
                  <div style={{ width: '100%' }}>
                    <input
                      type="text"
                      maxLength={20}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        marginBottom: '10px',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <button
                        onClick={() => setEditType('income')}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '6px',
                          border: 'none',
                          background: editType === 'income' ? '#10b981' : '#eee',
                          color: editType === 'income' ? '#fff' : '#333',
                          cursor: 'pointer',
                        }}
                      >
                        收入
                      </button>
                      <button
                        onClick={() => setEditType('expense')}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '6px',
                          border: 'none',
                          background: editType === 'expense' ? '#ef4444' : '#eee',
                          color: editType === 'expense' ? '#fff' : '#333',
                          cursor: 'pointer',
                        }}
                      >
                        支出
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleSaveEdit}
                        style={{
                          padding: '8px 14px',
                          background: '#667eea',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
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
                  </div>
                ) : (
                  <>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, wordBreak: 'break-all' }}>{cat.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{cat.type === 'income' ? '收入' : '支出'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(cat)}
                        style={{
                          padding: '8px 14px',
                          background: '#f59e0b',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        style={{
                          padding: '8px 14px',
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

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
            marginTop: '20px',
            cursor: 'pointer',
          }}
        >
          返回仪表盘
        </button>
      </div>
    </div>
  );
}