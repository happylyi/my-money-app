import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
export const metadata: Metadata = {
    title: '\u4E2A\u4EBA\u8BB0\u8D26',
    description: '',
    metadataBase: new URL('https://1s3gja95to0bni8qyh9lp.onlook.live/'),
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-oid="09km0sm">
            <body className="" data-oid=".oz3393">
                {children}

                <Script src="/builtwith.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
