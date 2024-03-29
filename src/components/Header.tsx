'use client';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectAuth } from '@/firebase/clientApp';
import { getAuth } from 'firebase/auth';

const MobileMenu = () => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	return (
		<>
			<button className='lg:hidden'>
				<Icon
					icon='material-symbols-light:menu'
					height={60}
					className='text-white py-3'
					onClick={() => setOpenMenu(true)}
				/>
			</button>
			<div
				className={`fixed inset-0 z-50 duration-300 ${
					openMenu
						? 'pointer-events-auto bg-black/80 w-full h-full'
						: 'pointer-events-none'
				}`}
				onClick={e => {
					if (e.target !== e.currentTarget) return;
					setOpenMenu(false);
				}}
			>
				<div
					className={`fixed top-0 min-h-screen left-[-20rem] max-w-xs bg-white w-full text-xl duration-300 font-semibold overflow-x-auto ${
						openMenu ? 'translate-x-full' : ''
					}`}
				>
					<Icon
						icon='ic:round-close'
						height={28}
						className='ml-auto cursor-pointer m-3'
						onClick={() => setOpenMenu(false)}
					/>
					<ul className='p-3'>
						<li className='py-2 border-b-2 border-b-[#ccc] '>
							<Link
								href={'/'}
								className='hover:text-primary'
							>
								Trang chủ
							</Link>
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Lịch trình
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Tra cứu vé
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Tin tức
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Hóa đơn
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Liên hệ
						</li>
						<li className='py-2 border-b-2 border-b-[#ccc]'>
							Về chúng tôi
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
const Header = () => {
	const auth = getAuth();

	const user = auth.currentUser;

	return (
		<header className='min-h-[220px] h-full inset-x-0 bg-gradient-to-b from-orange-500 to-red-700'>
			<div className='max-w-7xl mx-auto px-4 flex items-center justify-between'>
				<MobileMenu />
				<Link
					href={'/'}
					className='hidden lg:block'
				>
					<Image
						src={logo}
						alt='logo'
						width={295}
						height={60}
						style={{ color: 'transparent' }}
					/>
				</Link>

				<div className='flex gap-2 items-center hover:cursor-pointer px-4'>
					<>
						{user ? (
							<Link href={'/login'}>
								<Image
									src={`${user.photoURL}`}
									height={32}
									width={32}
									alt='photo-url'
									className='rounded-full'
								/>
							</Link>
						) : (
							<Icon
								icon='mingcute:user-4-fill'
								height={32}
								className='text-white'
							/>
						)}
						<Link
							href={'/login'}
							className='py-1 px-4 bg-white text-black rounded-xl hidden lg:block'
						>
							{user ? user?.displayName : 'Đăng nhập/Đăng ký'}
						</Link>
					</>
				</div>
			</div>
		</header>
	);
};

export default Header;
