'use client';
import Image from 'next/image';
import { loginWithGoogle } from '@/hooks/useLogin';
import { useRouter } from 'next-nprogress-bar';
import { Icon } from '@iconify/react/dist/iconify.js';

const Login = () => {
	const router = useRouter();
	const handleLoginWithGoogle = async () => {
		await loginWithGoogle();
		router.push('/');
	};

	return (
		<div className='relative max-w-7xl mx-auto w-full '>
			<div className='absolute top-[-60px] left-6 right-6 z-50 bg-white '>
				<div className='flex border-2'>
					<div className='flex-1 flex-col hidden lg:flex p-10 '>
						<h1 className='text-green text-4xl uppercase font-extrabold'>
							Phương trang
						</h1>
						<h3 className='text-primary text-2xl font-semibold'>
							Cùng bạn trên mọi nẻo đường
						</h3>
						<div className='mt-4'>
							<div className='aspect-[3/2] max-w-[600px] w-full relative object-cover'>
								<Image
									fill={true}
									src={'/logo_login.svg'}
									alt='logo-login'
								/>
							</div>
						</div>
					</div>

					<div className='w-full text-primary sm:w-[480px] flex justify-center items-center flex-col '>
						<h1 className='text-3xl font-bold'>
							Đăng nhập tài khoản
						</h1>

						<div className='p-10 flex flex-col items-center justify-center'>
							<div
								onClick={handleLoginWithGoogle}
								className='w-[350px] flex gap-2 items-center justify-center h-full cursor-pointer border border-[#ccc] p-3 rounded-2xl hover:text-white hover:bg-primary text-center duration-200'
							>
								<h3 className='text-black font-semibold'>
									Đăng nhập bằng google
								</h3>
								<Icon icon='devicon:google' />
							</div>

							<span className='mt-5 text-black font-semibold'>
								Đăng nhập bằng tài khoản khác
							</span>

							<div className='mt-5 flex gap-4 items-center cursor-pointer'>
								<Icon
									icon='logos:facebook'
									height={50}
								/>
								<Icon
									icon='uiw:github'
									height={50}
									className='text-black'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
