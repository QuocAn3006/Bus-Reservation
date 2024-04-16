'use client';
import { Popover, Input, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { provincesJson, ticket } from '@/types';
import { provinces } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { projectAuth, projectFireStore } from '@/firebase/clientApp';
import SectionTickets from './SectionTickets';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
const Search = () => {
	const [searchProvinces, setSearchProvinces] = useState<string>('');
	const [provincesValue, setProvincesValue] = useState<provincesJson>();
	const [selectedFromProvinces, setSelectedFromProvinces] =
		useState<string>('');
	const [selectedToProvinces, setSelectedToProvinces] = useState<string>('');
	const [datePick, setDatePick] = useState<string>('');
	const [timFind, setTimeFind] = useState<string>('');
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [ticketsResult, setTicketsResult] = useState<ticket[]>([]);
	const [isFindedTicket, setIsFindedTicket] = useState<boolean>(false);
	const [openPopover1, setOpenPopover1] = useState<boolean>(false);
	const [openPopover2, setOpenPopover2] = useState<boolean>(false);
	const today = new Date().toISOString().split('T')[0];
	const [displayedProvinces, setDisplayedProvinces] = useState<any[]>([]);
	const searchDebounce = useDebounce(searchProvinces);
	const provincesParse = JSON.stringify(provinces);
	const user = projectAuth.currentUser;
	const router = useRouter();

	useEffect(() => {
		setProvincesValue(JSON.parse(provincesParse));
	}, []);

	const handleSelectedProvinces = (name: string) => {
		if (openPopover1) {
			setSelectedFromProvinces(name);
			setSearchProvinces('');
			setOpenPopover1(false);
		} else if (openPopover2) {
			setSelectedToProvinces(name);
			setOpenPopover2(false);
		}
	};

	const handleChangeProvinces = () => {
		const temp = selectedFromProvinces;
		setSelectedToProvinces(temp);
		setSelectedFromProvinces(selectedToProvinces);
	};

	useEffect(() => {
		if (searchDebounce) {
			const filterData: any = provincesValue?.data.data.filter(
				(item: any) =>
					item.name
						.toLowerCase()
						.includes(searchDebounce.toLowerCase())
			);
			setDisplayedProvinces(filterData);
		} else {
			setDisplayedProvinces(provincesValue?.data.data || []);
		}
	}, [searchDebounce, provincesValue]);

	const content = (
		<div className='w-screen lg:w-[300px] flex flex-col'>
			<div className='w-full py-2 lg:w-auto'>
				<div className='flex flex-col px-4 my-4'>
					<span>Điểm đi</span>
					<Input
						value={searchProvinces}
						onChange={e => setSearchProvinces(e.target.value)}
						className='h-10 rounded-md border border-primary '
						style={{
							background: 'rgba(239,82,34,.05)'
						}}
					/>
				</div>

				<span className='pl-4 text-base font-medium uppercase'>
					Tỉnh/Thành phố
				</span>
				<div className='mt-2 max-h-[300px] overflow-y-auto border-b-4 lg:max-h-[250px]'>
					{displayedProvinces?.map((item, idx) => (
						<div
							key={idx}
							className='flex cursor-pointer border-b border-neutral-200 px-4 py-3
						hover:bg-[#FEF6F3] '
							onClick={() => {
								handleSelectedProvinces(item?.name);
							}}
						>
							{item.name}
						</div>
					))}

					{displayedProvinces.length === 0 && (
						<div className='border-b border-neutral-200 px-4 py-3'>
							Không tồn tại thành phố này
						</div>
					)}
				</div>
			</div>
		</div>
	);

	const fetchData = async () => {
		const data = await getDocs(collection(projectFireStore, 'tickets'));
		data.forEach(tickets => setTicketsResult([tickets.data().data]));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const compareData = (
		data: ticket[],
		date: string,
		fromProvince: string,
		toProvince: string
	) => {
		const findTicket = data.find(
			item =>
				item.date === date &&
				item.fromProvince === fromProvince &&
				item.toProvince === toProvince
		);

		if (findTicket) {
			return { ...findTicket, time: findTicket.time };
		} else {
			return null;
		}
	};

	const handleFindTicket = () => {
		try {
			const foundTicket = compareData(
				ticketsResult,
				datePick,
				selectedFromProvinces,
				selectedToProvinces
			);
			if (!user) {
				router.push('/login');
				message.warning('Bạn phải đăng nhập trước');
			} else {
				if (foundTicket) {
					setTimeFind(foundTicket.time);
					setIsFindedTicket(true);
				} else {
					setIsFindedTicket(false);
					setOpenModal(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='relative flex flex-col justify-center max-w-7xl mx-auto z-30'>
				<div className='absolute top-[-60px] left-6 right-6'>
					<div className='p-6 border-2 bg-white border-[#f5977a] rounded-2xl '>
						<div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mb-6'>
							<div className='relative flex justify-center lg:gap-4 gap-2'>
								<div className='flex-1'>
									<label htmlFor=''>Điểm đi</label>
									<Popover
										trigger={'click'}
										content={content}
										placement='bottom'
										open={openPopover1}
										onOpenChange={() =>
											setOpenPopover1(true)
										}
									>
										<div className='h-16 border rounded-lg border-[#dde2e8] py-3 px-5 mt-2 flex w-full cursor-pointer items-start lg:items-center text-base'>
											<span className='max-w-[140px] lg:max-w-[220px]'>
												{selectedFromProvinces ||
													'Chọn điểm đi'}
											</span>
										</div>
									</Popover>
								</div>

								<div
									onClick={handleChangeProvinces}
									className='transition-all active:rotate-180 text-primary border rounded-full w-8 h-8 border-[#ccc] absolute z-10 bottom-5 bg-white flex items-center justify-center hover:transition-all hover:rotate-180'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='21'
										height='21'
										viewBox='0 0 24 24'
									>
										<path
											fill='currentColor'
											d='M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0'
										/>
									</svg>
								</div>

								<div className='flex-1 text-right lg:text-left'>
									<label htmlFor=''>Điểm đến</label>
									<Popover
										trigger={'click'}
										content={content}
										placement='bottom'
										open={openPopover2}
										onOpenChange={() =>
											setOpenPopover2(true)
										}
									>
										<div className='h-16 border rounded-lg border-[#dde2e8] py-3 px-5 mt-2 flex w-full cursor-pointer items-start lg:items-center text-base'>
											<span className='max-w-[140px] lg:max-w-[220px]'>
												{selectedToProvinces ||
													'Chọn điểm đến'}
											</span>
										</div>
									</Popover>
								</div>
							</div>

							<div className='w-full h-[0.5px] bg-[#ccc] lg:hidden my-3'></div>

							<div className='flex'>
								<div className='mr-4 flex flex-1 flex-col'>
									<label>Ngày đi</label>

									<div className='h-16 border rounded-lg border-[#dde2e8] py-3 px-5 mt-2 flex w-full items-start lg:items-center text-base cursor-pointer '>
										<input
											type='date'
											id='datepick'
											className='w-full cursor-pointer outline-none border-none'
											min={today}
											value={datePick}
											onChange={e =>
												setDatePick(e.target.value)
											}
										/>
									</div>
								</div>
								<div className='flex flex-1 flex-col'>
									<label htmlFor=''>Số vé</label>
									<div className='h-16 border rounded-lg border-[#dde2e8] py-3 px-5 mt-2 flex w-full cursor-pointer items-start lg:items-center text-base'>
										<select className='w-full outline-none h-full'>
											<option value='1'>1</option>
											<option value='2'>2</option>
											<option value='3'>3</option>
											<option value='4'>4</option>
											<option value='5'>5</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div className='relative flex justify-center'>
							<button
								onClick={handleFindTicket}
								className='absolute h-12 rounded-full px-20 bg-orange-600 text-white'
							>
								Tìm chuyến xe
							</button>
						</div>
					</div>
				</div>
			</div>

			{isFindedTicket && (
				<SectionTickets
					fromProvinces={selectedFromProvinces}
					toProvinces={selectedToProvinces}
					time={timFind}
					date={datePick}
				/>
			)}

			<Modal
				title='Thông báo hệ thống'
				open={openModal}
				onCancel={() => setOpenModal(false)}
				footer={null}
			>
				<p className='mb-2'>
					Hiện tại hệ thống chỉ phục vụ vé chuyến{' '}
					<span className='text-primary font-semibold'>Đà Nẵng </span>
					đến{' '}
					<span className='text-primary font-semibold'>
						Hồ Chí Minh
					</span>
				</p>
				<p className='mb-2'>
					Chỉ cho phép người dùng tìm vé{' '}
					<span className='font-semibold text-primary'>
						trong ngày
					</span>
				</p>
				<p className='mb-2'>
					Nếu bạn gặp vấn đề vui lòng đọc thông tin bên trên để có
					trải nghiệm tốt nhât
				</p>

				<p className='mb-2 font-bold'>
					Vui lòng F5 để thực hiện lại. Xin lỗi vì sự bất tiện này
				</p>
			</Modal>
			{!isFindedTicket && <div className='mb-56' />}
		</>
	);
};

export default Search;
