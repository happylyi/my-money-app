import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

// 强制客户端渲染，彻底解决 Netlify 404 问题
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: '个人记账',
    description: '简洁现代的个人财务管理工具',
    metadataBase: new URL('https://resonant-torte-df239d.netlify.app/'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" data-oid="09km0sm">
            <body className="" data-oid=".oz3393">
                {children}
                <Script src="/builtwith.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}