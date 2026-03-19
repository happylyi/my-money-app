import { supabase } from '../supabase';

// ======================
// 账单记录
// ======================
export async function addRecord(data: any) {
  return await supabase.from('records').insert([data]);
}

export async function getRecords() {
  return await supabase
    .from('records')
    .select('*, categories(*), projects(*)')
    .order('created_at', { ascending: false });
}

// ======================
// 分类管理
// ======================
export async function addCategory(data: any) {
  return await supabase.from('categories').insert([data]);
}

export async function getCategories() {
  return await supabase.from('categories').select('*');
}

// ======================
// 项目管理
// ======================
export async function addProject(data: any) {
  return await supabase.from('projects').insert([data]);
}

export async function getProjects() {
  return await supabase.from('projects').select('*');
}