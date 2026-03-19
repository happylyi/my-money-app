'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  name: string;
}

export default function Projects() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('id', { ascending: false });
    setProjects((data as Project[]) || []);
  };

  const handleAdd = async () => {
    const trimName = name.trim();
    if (!trimName) {
      setMsg('请输入项目名称');
      return;
    }
    if (trimName.length > 20) {
      setMsg('项目名称不能超过20个字符');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('projects').insert([{ name: trimName }]);
    if (error) setMsg('添加失败');
    else {
      setMsg('添加成功！');
      setName('');
      fetchProjects();
    }
    setLoading(false);
  };

  const handleEdit = (item: Project) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const handleSaveEdit = async () => {
    const trimName = editName.trim();
    if (!editingId || !trimName) {
      setMsg('请输入项目名称');
      return;
    }
    if (trimName.length > 20) {
      setMsg('项目名称不能超过20个字符');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('projects').update({ name: trimName }).eq('id', editingId);
    if (error) setMsg('修改失败');
    else {
      setMsg('修改成功！');
      setEditingId(null);
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, projectName: string) => {
    const confirmDel = window.confirm(`此项目下所有记账数据将一并删除，确认是否删除【${projectName}】？`);
    if (!confirmDel) return;

    setLoading(true);
    await supabase.from('records').delete().eq('project_id', id);
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) setMsg('删除失败');
    else {
      setMsg('删除成功！');
      fetchProjects();
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
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>项目管理</h2>

        <div style={{
          padding: '18px',
          background: '#f9fafb',
          borderRadius: '14px',
          marginBottom: '24px',
        }}>
          <h4 style={{ margin: '0 0 12px 0' }}>新增项目</h4>
          <input
            type="text"
            maxLength={20}
            placeholder="项目名称（20字内）"
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
            {loading ? '提交中...' : '添加项目'}
          </button>
        </div>

        <h4 style={{ margin: '0 0 14px 0' }}>项目列表</h4>
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>暂无项目</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map((item) => (
              <div
                key={item.id}
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
                {editingId === item.id ? (
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
                    <div style={{ fontWeight: 500, flex: 1, wordBreak: 'break-all' }}>{item.name}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(item)}
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
                        onClick={() => handleDelete(item.id, item.name)}
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