'use client';

import { useState, useEffect } from 'react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 设置浏览器标题 + 监听滚动控制导航栏显示/隐藏
    useEffect(() => {
        document.title = '个人记账1.0';
        setIsVisible(true);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // 向下滚动且超过 50px 时隐藏 header，向上滚动或回到顶部时显示
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const features = [
        {
            icon: '📊',
            title: '智能统计',
            description: '实时展示收支概览，直观的图表分析',
        },
        {
            icon: '📝',
            title: '便捷记账',
            description: '快速记录每日流水，支持多种分类',
        },
        {
            icon: '📁',
            title: '项目管理',
            description: '独立项目记账，清晰管理专项资金',
        },
        {
            icon: '🔍',
            title: '智能筛选',
            description: '多维度筛选账单，快速找到目标记录',
        },
    ];

    const mockData = {
        income: 15680,
        expense: 8920,
        balance: 6760,
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
            data-oid="ovfcs-t"
        >
            {/* Header - 平滑显示/隐藏 */}
            <header
                className={`border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
                    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
                data-oid=".u.6041"
            >
                <div
                    className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid="h5_3cgx"
                >
                    <div className="flex items-center space-x-2" data-oid="w.w2vuh">
                        <div
                            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                            data-oid="g_h9ug9"
                        >
                            <span className="text-white font-bold" data-oid="tsqta7e">
                                💰
                            </span>
                        </div>
                        <h1 className="text-xl font-semibold" data-oid="8d0hnjp">
                            个人记账
                        </h1>
                    </div>
                    <nav className="hidden md:flex space-x-6" data-oid="wdo5iek">
                        <a
                            href="#features"
                            className="text-gray-300 hover:text-white transition-colors"
                            data-oid="hkl.u9l"
                        >
                            功能
                        </a>
                        <a
                            href="#demo"
                            className="text-gray-300 hover:text-white transition-colors"
                            data-oid="cf_6jsh"
                        >
                            演示
                        </a>
                    </nav>
                    <button
                        onClick={() => (window.location.href = '/login')}
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
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                        data-oid="9twcrev"
                    >
                        登录/注册
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4" data-oid="4r.8-m8">
                <div className="max-w-6xl mx-auto text-center" data-oid="qfs4at_">
                    <div
                        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="k.ciev:"
                    >
                        <h2
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                            data-oid="7qn9jx7"
                        >
                            个人记账助手
                        </h2>
                        <p
                            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                            data-oid=".w0-b55"
                        >
                            简洁现代的个人财务管理工具，支持日常流水记账和项目专项记账，让您的财务管理更加清晰高效
                        </p>
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            data-oid="njgur3g"
                        >
                            <button
                                onClick={() => (window.location.href = '/login')}
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
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                                }}
                                data-oid="dte9bbf"
                            >
                                登录 / 注册
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-gray-800/20" data-oid="umhc4m4">
                <div className="max-w-6xl mx-auto" data-oid="_ldo3s3">
                    <h3 className="text-3xl font-bold text-center mb-12" data-oid="anzkv1q">
                        核心功能
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="1x0t:ta">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/40 p-6 rounded-xl hover:bg-gray-700/40 transition-colors"
                                data-oid="br0y3g0"
                            >
                                <div className="text-3xl mb-4" data-oid="lb1hlpd">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-2" data-oid="t1k1blv">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-300" data-oid="uhbigc5">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="py-20 px-4" data-oid="2sqw9ce">
                <div className="max-w-6xl mx-auto" data-oid="5fxdh15">
                    <h3 className="text-3xl font-bold text-center mb-12" data-oid="blnj6s6">
                        界面预览
                    </h3>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8" data-oid="hfry0-r">
                        <div
                            className="bg-gray-800/40 p-1 rounded-lg flex space-x-1"
                            data-oid="j7cf-y5"
                        >
                            {[
                                { id: 'overview', name: '统计概览' },
                                { id: 'daily', name: '日常记账' },
                                { id: 'project', name: '项目记账' },
                                { id: 'bills', name: '账单列表' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                    data-oid="-xnpbmj"
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Demo Content */}
                    <div
                        className="bg-gray-800/40 rounded-xl p-6 max-w-4xl mx-auto"
                        data-oid="1zw:5rz"
                    >
                        {activeTab === 'overview' && (
                            <div className="space-y-6" data-oid=":ctccqq">
                                <h4 className="text-xl font-semibold mb-4" data-oid=":qw53n.">
                                    本月财务概览
                                </h4>
                                <div className="grid md:grid-cols-3 gap-4" data-oid="e-g_esc">
                                    <div
                                        className="bg-green-600/20 border border-green-600/30 p-4 rounded-lg"
                                        data-oid="v5psr0_"
                                    >
                                        <div className="text-green-300 text-sm" data-oid="lcwp6gb">
                                            总收入
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-green-300"
                                            data-oid="qy-8th4"
                                        >
                                            ¥{mockData.income.toLocaleString()}
                                        </div>
                                    </div>
                                    <div
                                        className="bg-red-600/20 border border-red-600/30 p-4 rounded-lg"
                                        data-oid=".:n.b:w"
                                    >
                                        <div className="text-red-300 text-sm" data-oid="wsvphf_">
                                            总支出
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-red-300"
                                            data-oid="6ksfyaq"
                                        >
                                            ¥{mockData.expense.toLocaleString()}
                                        </div>
                                    </div>
                                    <div
                                        className="bg-blue-600/20 border border-blue-600/30 p-4 rounded-lg"
                                        data-oid="4-::5sb"
                                    >
                                        <div className="text-blue-300 text-sm" data-oid="xboup72">
                                            结余
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-blue-300"
                                            data-oid="fvg482i"
                                        >
                                            ¥{mockData.balance.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mt-6" data-oid="b_zgb-3">
                                    <div
                                        className="bg-gray-700/40 p-4 rounded-lg"
                                        data-oid="-d.2suq"
                                    >
                                        <h5 className="font-semibold mb-2" data-oid="71om5e6">
                                            支出分类
                                        </h5>
                                        <div className="text-gray-300" data-oid="5q7ff.x">
                                            饼图展示区域
                                        </div>
                                    </div>
                                    <div
                                        className="bg-gray-700/40 p-4 rounded-lg"
                                        data-oid="xf60tml"
                                    >
                                        <h5 className="font-semibold mb-2" data-oid="t6xp2eq">
                                            项目统计
                                        </h5>
                                        <div className="text-gray-300" data-oid="nqd2d3h">
                                            柱状图展示区域
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'daily' && (
                            <div className="space-y-4" data-oid="xoroscy">
                                <h4 className="text-xl font-semibold mb-4" data-oid="aisisoz">
                                    每日流水记账
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4" data-oid="8gy2dv0">
                                    <div data-oid="otfoz2v">
                                        <label
                                            className="block text-sm text-gray-300 mb-2"
                                            data-oid="u5--09g"
                                        >
                                            金额
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2"
                                            data-oid="3rwxwvf"
                                        />
                                    </div>
                                    <div data-oid="pd0oyz3">
                                        <label
                                            className="block text-sm text-gray-300 mb-2"
                                            data-oid="7x5u0fk"
                                        >
                                            类型
                                        </label>
                                        <select
                                            className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2"
                                            data-oid="l7fq_bo"
                                        >
                                            <option data-oid="63jjf-g">收入</option>
                                            <option data-oid="az2.i2p">支出</option>
                                        </select>
                                    </div>
                                    <div data-oid="1pn5iry">
                                        <label
                                            className="block text-sm text-gray-300 mb-2"
                                            data-oid="gu5a6eh"
                                        >
                                            分类
                                        </label>
                                        <select
                                            className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2"
                                            data-oid="v75-6-8"
                                        >
                                            <option data-oid=":kb1oxm">餐饮</option>
                                            <option data-oid="xufpt6y">交通</option>
                                            <option data-oid="zl21y06">娱乐</option>
                                            <option data-oid="af7p_tr">购物</option>
                                        </select>
                                    </div>
                                    <div data-oid="wf:4vba">
                                        <label
                                            className="block text-sm text-gray-300 mb-2"
                                            data-oid="m.bhq_5"
                                        >
                                            时间
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2"
                                            data-oid="6_9vi3j"
                                        />
                                    </div>
                                </div>
                                <div data-oid="gv6y1r8">
                                    <label
                                        className="block text-sm text-gray-300 mb-2"
                                        data-oid="rb13on4"
                                    >
                                        备注
                                    </label>
                                    <textarea
                                        placeholder="添加备注..."
                                        className="w-full bg-gray-700/40 border border-gray-600 rounded-lg px-3 py-2 h-20"
                                        data-oid="zpazyf8"
                                    ></textarea>
                                </div>
                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors"
                                    data-oid="xgfh6aq"
                                >
                                    保存记录
                                </button>
                            </div>
                        )}

                        {activeTab === 'project' && (
                            <div className="space-y-4" data-oid="376437w">
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="cbd-x5t"
                                >
                                    <h4 className="text-xl font-semibold" data-oid="95r9oft">
                                        项目记账
                                    </h4>
                                    <button
                                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors"
                                        data-oid="-64lf6:"
                                    >
                                        新建项目
                                    </button>
                                </div>
                                <div className="grid gap-3" data-oid="pa2m.p2">
                                    {['装修预算', '旅行基金', '学习投资'].map((project, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-700/40 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600/40 cursor-pointer transition-colors"
                                            data-oid="t549.tz"
                                        >
                                            <div data-oid="xzk09bh">
                                                <div className="font-semibold" data-oid="lxfq9rk">
                                                    {project}
                                                </div>
                                                <div
                                                    className="text-sm text-gray-300"
                                                    data-oid="fo0qjlk"
                                                >
                                                    点击进入项目记账
                                                </div>
                                            </div>
                                            <div className="text-right" data-oid="7:elj3t">
                                                <div
                                                    className="text-sm text-gray-300"
                                                    data-oid="bhy0ube"
                                                >
                                                    余额
                                                </div>
                                                <div className="font-semibold" data-oid="gxo2w4z">
                                                    ¥{(Math.random() * 10000).toFixed(0)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'bills' && (
                            <div className="space-y-4" data-oid="41zvr5e">
                                <div
                                    className="flex justify-between items-center"
                                    data-oid="b7zkj5f"
                                >
                                    <h4 className="text-xl font-semibold" data-oid="8wvk_3w">
                                        账单列表
                                    </h4>
                                    <div className="flex space-x-2" data-oid="6582lkp">
                                        <select
                                            className="bg-gray-700/40 border border-gray-600 rounded px-3 py-1 text-sm"
                                            data-oid="kwy13bh"
                                        >
                                            <option data-oid="e.-wo8n">全部类型</option>
                                            <option data-oid="i_hu_bq">收入</option>
                                            <option data-oid="24ivmxd">支出</option>
                                        </select>
                                        <select
                                            className="bg-gray-700/40 border border-gray-600 rounded px-3 py-1 text-sm"
                                            data-oid="-zfxbd7"
                                        >
                                            <option data-oid=":kw6hdf">全部项目</option>
                                            <option data-oid="extl45a">日常流水</option>
                                            <option data-oid="_ahxc0x">装修预算</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2" data-oid="r4t3:fv">
                                    {[
                                        {
                                            type: '支出',
                                            category: '餐饮',
                                            amount: -45,
                                            note: '午餐',
                                            time: '今天 12:30',
                                        },
                                        {
                                            type: '收入',
                                            category: '工资',
                                            amount: 8000,
                                            note: '月薪',
                                            time: '昨天 09:00',
                                        },
                                        {
                                            type: '支出',
                                            category: '交通',
                                            amount: -12,
                                            note: '地铁',
                                            time: '昨天 18:30',
                                        },
                                    ].map((bill, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-700/40 p-4 rounded-lg flex justify-between items-center"
                                            data-oid="uc6.mdf"
                                        >
                                            <div
                                                className="flex items-center space-x-3"
                                                data-oid="t-nsuhf"
                                            >
                                                <div
                                                    className={`w-2 h-2 rounded-full ${bill.type === '收入' ? 'bg-green-400' : 'bg-red-400'}`}
                                                    data-oid="57mapcp"
                                                ></div>
                                                <div data-oid="1-:_rwl">
                                                    <div
                                                        className="font-semibold"
                                                        data-oid="rce7pyh"
                                                    >
                                                        {bill.category}
                                                    </div>
                                                    <div
                                                        className="text-sm text-gray-300"
                                                        data-oid="ox0w0lx"
                                                    >
                                                        {bill.note} • {bill.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`font-semibold ${bill.type === '收入' ? 'text-green-400' : 'text-red-400'}`}
                                                data-oid="uw:djfa"
                                            >
                                                {bill.amount > 0 ? '+' : ''}¥{Math.abs(bill.amount)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                id="download"
                className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                data-oid="uys3zs0"
            >
                <div className="max-w-4xl mx-auto text-center" data-oid="y.cz:ca">
                    <h3 className="text-3xl font-bold mb-6" data-oid="d8swobu">
                        开始您的个人记账之旅
                    </h3>
                    <p className="text-xl text-gray-200 mb-8" data-oid="nvmt645">
                        支持移动端和桌面端，随时随地管理您的财务
                    </p>

                    {/* 统一按钮：登录/注册 */}
                    <button
                        onClick={() => (window.location.href = '/login')}
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
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                        data-oid="24o.:nr"
                    >
                        登录 / 注册
                    </button>

                    <p className="mt-4 text-gray-300 text-sm" data-oid="ndlvmhn">
                        首次登录将自动注册账号
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800/30 py-12 px-4" data-oid="9dm:0dt">
                <div className="max-w-6xl mx-auto" data-oid="yrgf8v8">
                    <div className="grid md:grid-cols-4 gap-8" data-oid="5n4e5iw">
                        <div data-oid="buvqamg">
                            <div className="flex items-center space-x-2 mb-4" data-oid="y6cv7r1">
                                <div
                                    className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"
                                    data-oid="owtjtda"
                                ></div>
                                <span className="font-semibold" data-oid="t6ex07m">
                                    个人记账
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm" data-oid="h8g_1uy">
                                让财务管理变得简单高效
                            </p>
                        </div>
                        <div data-oid="fuz6-i5">
                            <h5 className="font-semibold mb-3" data-oid="g4c9xad">
                                产品
                            </h5>
                            <ul className="space-y-2 text-sm text-gray-300" data-oid="3m0x8hz">
                                <li data-oid="x53g_s8">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid="qxvjnk5"
                                    >
                                        功能介绍
                                    </a>
                                </li>
                                <li data-oid="r_xrwo8">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid="g5vi2wb"
                                    >
                                        使用教程
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="28woj_u">
                            <h5 className="font-semibold mb-3" data-oid="smzz1fe">
                                支持
                            </h5>
                            <ul className="space-y-2 text-sm text-gray-300" data-oid="41x2kem">
                                <li data-oid="z-pxpqf">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid="maueqch"
                                    >
                                        帮助中心
                                    </a>
                                </li>
                                <li data-oid="a965g1a">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid=".8g50_c"
                                    >
                                        联系我们
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="lo3x3-y">
                            <h5 className="font-semibold mb-3" data-oid="apk.0ql">
                                关于
                            </h5>
                            <ul className="space-y-2 text-sm text-gray-300" data-oid="hswtqvp">
                                <li data-oid="fi.d:5z">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid="opip_gu"
                                    >
                                        关于我们
                                    </a>
                                </li>
                                <li data-oid="y22q19o">
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                        data-oid="mwmdwt4"
                                    >
                                        隐私政策
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-800/30 mt-8 pt-8 text-center text-gray-300 text-sm"
                        data-oid="-cxovzo"
                    >
                        © 2026 个人记账. 保留所有权利.
                    </div>
                </div>
            </footer>
        </div>
    );
}
