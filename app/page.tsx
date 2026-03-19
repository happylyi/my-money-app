'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function Page() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 修复：移除不必要的依赖，消除 ESLint 警告
    useEffect(() => {
        document.title = '个人记账1.0';
        setIsVisible(true);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    // 修复：去掉 [lastScrollY]，避免无限循环 & 警告
    }, []);

    const features = [
        { icon: '📊', title: '智能统计', description: '实时展示收支概览，直观的图表分析' },
        { icon: '📝', title: '便捷记账', description: '快速记录每日流水，支持多种分类' },
        { icon: '📁', title: '项目管理', description: '独立项目记账，清晰管理专项资金' },
        { icon: '🔍', title: '智能筛选', description: '多维度筛选账单，快速找到目标记录' },
    ];

    const mockData = { income: 15680, expense: 8920, balance: 6760 };

    return (
        <div className="min-h-screen text-white" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}>
            <header className={`border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm sticky top-0 z-50 transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">💰</span>
                        </div>
                        <h1 className="text-xl font-semibold">个人记账</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors">功能</a>
                        <a href="#demo" className="text-gray-300 hover:text-white transition-colors">演示</a>
                    </nav>
                    <button
                        onClick={() => window.location.href = '/login'}
                        style={{
                            padding: '10px 20px',
                            background: '#ffffff',
                            color: '#667eea',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLButtonElement;
                            target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLButtonElement;
                            target.style.transform = 'scale(1)';
                        }}
                    >
                        登录/注册
                    </button>
                </div>
            </header>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">个人记账助手</h2>
                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">简洁现代的个人财务管理工具，支持日常流水记账和项目专项记账，让您的财务管理更加清晰高效</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/login'}
                                style={{
                                    padding: '16px 48px',
                                    background: '#ffffff',
                                    color: '#667eea',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    const target = e.currentTarget as HTMLButtonElement;
                                    target.style.transform = 'translateY(-2px)';
                                    target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    const target = e.currentTarget as HTMLButtonElement;
                                    target.style.transform = 'translateY(0)';
                                    target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                登录 / 注册
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-4 bg-gray-800/20">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">核心功能</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-800/40 p-6 rounded-xl hover:bg-gray-700/40 transition-colors">
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="demo" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">界面预览</h3>
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-800/40 p-1 rounded-lg flex space-x-1">
                            {[{ id: 'overview', name: '统计概览' }, { id: 'daily', name: '日常记账' }, { id: 'project', name: '项目记账' }, { id: 'bills', name: '账单列表' }].map((tab) => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-md transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}>
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800/40 rounded-xl p-6 max-w-4xl mx-auto">
                        {activeTab === 'overview' && <div className="space-y-6">
                            <h4 className="text-xl font-semibold mb-4">本月财务概览</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-green-600/20 border border-green-600/30 p-4 rounded-lg">
                                    <div className="text-green-300 text-sm">总收入</div>
                                    <div className="text-2xl font-bold text-green-300">¥{mockData.income.toLocaleString()}</div>
                                </div>
                                <div className="bg-red-600/20 border border-red-600/30 p-4 rounded-lg">
                                    <div className="text-red-300 text-sm">总支出</div>
                                    <div className="text-2xl font-bold text-red-300">¥{mockData.expense.toLocaleString()}</div>
                                </div>
                                <div className="bg-blue-600/20 border border-blue-600/30 p-4 rounded-lg">
                                    <div className="text-blue-300 text-sm">结余</div>
                                    <div className="text-2xl font-bold text-blue-300">¥{mockData.balance.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>}

                        {activeTab === 'daily' && <div className="space-y-4">
                            <h4 className="text-xl font-semibold mb-4">每日流水记账</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-sm text-gray-300 mb-2">金额</label><input type="number" placeholder="0.00" className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2" /></div>
                                <div><label className="block text-sm text-gray-300 mb-2">类型</label><select className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2"><option>收入</option><option>支出</option></select></div>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors">保存记录</button>
                        </div>}

                        {activeTab === 'project' && <div className="space-y-4">
                            <div className="flex justify-between items-center"><h4 className="text-xl font-semibold">项目记账</h4><button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors">新建项目</button></div>
                            {['装修预算', '旅行基金', '学习投资'].map((project, index) => (
                                <div key={index} className="bg-gray-700/40 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600/40 cursor-pointer transition-colors">
                                    <div>
                                        <div className="font-semibold">{project}</div>
                                        <div className="text-sm text-gray-300">点击进入项目记账</div>
                                    </div>
                                </div>
                            ))}
                        </div>}

                        {activeTab === 'bills' && <div className="space-y-4">
                            <div className="flex justify-between items-center"><h4 className="text-xl font-semibold">账单列表</h4></div>
                            {[{ type: '支出', category: '餐饮', amount: -45, note: '午餐', time: '今天 12:30' }, { type: '收入', category: '工资', amount: 8000, note: '月薪', time: '昨天 09:00' }].map((bill, index) => (
                                <div key={index} className="bg-gray-700/40 p-4 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${bill.type === '收入' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                        <div>
                                            <div className="font-semibold">{bill.category}</div>
                                            <div className="text-sm text-gray-300">{bill.note} • {bill.time}</div>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${bill.type === '收入' ? 'text-green-400' : 'text-red-400'}`}>
                                        {bill.amount > 0 ? '+' : ''}¥{Math.abs(bill.amount)}
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </section>

            <section id="download" className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-6">开始您的个人记账之旅</h3>
                    <p className="text-xl text-gray-200 mb-8">支持移动端和桌面端，随时随地管理您的财务</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        style={{
                            padding: '16px 48px',
                            background: '#ffffff',
                            color: '#667eea',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '18px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        }}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLButtonElement;
                            target.style.transform = 'translateY(-2px)';
                            target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLButtonElement;
                            target.style.transform = 'translateY(0)';
                            target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        登录 / 注册
                    </button>
                    <p className="mt-4 text-gray-300 text-sm">首次登录将自动注册账号</p>
                </div>
            </section>

            <footer className="border-t border-gray-800/30 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                                <span className="font-semibold">个人记账</span>
                            </div>
                            <p className="text-gray-300 text-sm">让财务管理变得简单高效</p>
                        </div>
                        <div><h5 className="font-semibold mb-3">产品</h5><ul className="space-y-2 text-sm text-gray-300"><li><a href="#" className="hover:text-white transition-colors">功能介绍</a></li></ul></div>
                        <div><h5 className="font-semibold mb-3">支持</h5><ul className="space-y-2 text-sm text-gray-300"><li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li></ul></div>
                        <div><h5 className="font-semibold mb-3">关于</h5><ul className="space-y-2 text-sm text-gray-300"><li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li></ul></div>
                    </div>
                    <div className="border-t border-gray-800/30 mt-8 pt-8 text-center text-gray-300 text-sm">© 2026 个人记账. 保留所有权利.</div>
                </div>
            </footer>
        </div>
    );
}