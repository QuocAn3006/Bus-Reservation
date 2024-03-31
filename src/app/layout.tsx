import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppContextProvider from '@/context/app.context';
import Header from '@/components/Header';
import { ConfigProvider } from 'antd';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bus Reservation'
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={`bg-white ${inter.className}`}>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#ef5222',
							fontSize: 16
						},
						hashed: false
					}}
				>
					<AppContextProvider>
						<Header />
						{children}
					</AppContextProvider>
				</ConfigProvider>
			</body>
		</html>
	);
}
