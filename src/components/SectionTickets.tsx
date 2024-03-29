import { ticket } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type props = {
	date: string;
	fromProvinces: string;
	toProvinces: string;
	time: string;
};

const SectionTickets = (ticket: props) => {
	return (
		<section className={`max-w-7xl mx-auto mt-80 lg:mt-40 w-full`}>
			<div className='flex flex-col p-6 '>
				<h1 className='hidden text-2xl font-medium text-green'>
					Thông tin tím kiếm
				</h1>

				<div
					className='mb-2 flex flex-col border border-[#DDE2E8] bg-white pt-3 md:pt-6 2lg:mb-6 rounded-2xl'
					style={{
						boxShadow:
							'0 4px 4px rgba(239,82,34,.3), 0 -2px 8px rgba(239,82,34,.3), inset 0 0 0 1px #ef5222'
					}}
				>
					<div className='px-3 md:px-6'>
						<div className='flex items-center justify-between gap-4 w-full'>
							<span className='text-xl font-medium'>
								{ticket.time}
							</span>
							<div className='flex w-full items-center'>
								<Icon
									icon='octicon:dot-24'
									height={22}
									className='text-primary font-bold'
								/>
								<span className='flex-1 border-b-2 border-dotted'></span>
								<span className='text-gray text-center leading-4'>
									14 giờ
									<br />
									<span className='text-[13px]'>
										(Asian/Ho Chi Minh)
									</span>
								</span>
								<span className='flex-1 border-b-2 border-dotted'></span>
								<Icon
									icon='fa6-solid:location-dot'
									height={22}
									className='text-primary font-bold'
								/>
							</div>
							<span className='text-xl font-medium'>21:30</span>
						</div>

						<div className='mt-3 flex justify-between text-[13px] font-normal'>
							<div className='flex-1'>
								<span className='text-[15px] font-medium'>
									{`Bến Xe ${ticket.fromProvinces}`}
								</span>
							</div>
							<div className='flex-1 text-right'>
								<span className='text-[15px] font-medium'>
									{`Bến Xe ${ticket.toProvinces}`}
								</span>
							</div>
						</div>

						<div
							className='my-3 2lg:my-4 w-full h-[0.5px]'
							style={{ background: 'rgba(0, 0, 0, 0.1)' }}
						></div>

						<div className='w-full flex justify-between items-center mb-2 pb-3 md:pb-6 2lg:mt-6'>
							<div className='text-gray flex items-center gap-2 text-base font-semibold'>
								<span className='text-primary'>340.000đ</span>
								<div className='h-[6px] w-[6px] rounded-full bg-[#C8CCD3]'></div>
								<span>Giường</span>
							</div>
							<Link
								href={'/seatbook'}
								className='bg-primary text-white px-[20px] rounded-[20px] h-[32px] flex items-center'
							>
								Chọn chuyến
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionTickets;
