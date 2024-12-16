import localFont from 'next/font/local';
import './globals.css';
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});
export const metadata = {
    title: 'Gamer Gear',
    description: 'Bringing you amazing gear since 2024',
};
export default function RootLayout({ children, }) {
    return (<html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{
            backgroundImage: "url('/images/snowy-background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            overflow: 'hidden',
        }}>
        {/* Add NavMenu to the layout */}
        {/* Render the page content */}
        <div>{children}</div>
      </body>
    </html>);
}
