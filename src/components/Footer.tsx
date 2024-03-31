'use client';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className='w-full bg-[#FFF7F5]  text-[15px] block'>
			<div className='p-4 sm:pt-12 max-w-7xl mx-auto '>
				<div className='flex flex-wrap gap-14 font-normal text-black'>
					<div className='max-w-[34rem] flex flex-col'>
						<div className='flex w-full max-w-md justify-between'>
							<div>
								<p className='text-green font-medium uppercase'>
									TRUNG TÂM TỔNG ĐÀI & CSKH
								</p>
								<p className='text-3xl font-medium text-primary'>
									1900 6067
								</p>
							</div>
						</div>

						<span className='text-[#00613d] mt-5 font-medium uppercase'>
							Công ty cổ phần xe khách Phương Trang - FUTA Bus
							Lines
						</span>

						<span className='mt-2 sm:mt-1'>
							<span className='mr-1 min-w-fit'>Địa chỉ:</span>
							<span>
								Số 01 Tô Hiến Thành, Phường 3, Thành phố Đà Lạt,
								Tỉnh Lâm Đồng, Việt Nam.
							</span>
						</span>

						<span className='mt-2 sm:mt-1'>
							<span className='mr-1 min-w-fit'>Email:</span>
							<span className='text-primary'>
								tranan498@gmail.com
							</span>
						</span>

						<span className='mt-2 sm:mt-1'>
							<span className='mr-1 min-w-fit'>Điện thoại:</span>
							<span className='text-primary'>0702669637</span>
						</span>
					</div>

					<div className='hidden max-w-lg flex-col gap-4 sm:flex sm:flex-row'>
						<div className='flex flex-col'>
							<div className='text-[#00613d] h-4 font-medium'>
								FUTA Bus Lines{' '}
							</div>
							<div className='mt-1 flex max-w-md flex-col'>
								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Về chúng tôi</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Lịch trình</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Tuyển dụng</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Tin tức & Sự kiện</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Mạng lưới và văn phòng</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col'>
							<div className='text-[#00613d] h-4 font-medium'>
								Hỗ trợ
							</div>
							<div className='mt-1 flex max-w-md flex-col'>
								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Tra cứu thông tin đặt vé</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Điều khoản và sử dụng</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Câu hỏi thường gặp</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Hướng dẫn đặt vé trên web</p>
								</div>

								<div className='min-w-[140px] max-w-[200px] mt-3 flex items-center'>
									<div className='border-rad mr-3 h-2 w-2 rounded-full bg-gray-300'></div>
									<p>Hướng dẫn nạp tiền trên app</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
