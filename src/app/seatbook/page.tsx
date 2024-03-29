'use client';
import { seats } from '@/constants';
import { projectFireStore } from '@/firebase/clientApp';
import { Seats } from '@/types';
import { message } from 'antd';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { sendEmail } from '@/hooks/useSendEmail';
import { convertPrice } from '@/utils';

const SeatBook = () => {
	const [seatDetails, setSeatDetails] = useState<Seats>(seats?.seats || {});
	const auth = getAuth();
	const user = auth.currentUser;
	const [name, setName] = useState<string>(user?.displayName || '');
	const [phone, setPhone] = useState<string>('');
	const [email, setEmail] = useState<string>(user?.email || '');

	const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
		if (seatDetails) {
			if (seatValue === 1 || seatValue === 3) {
				return;
			} else if (seatValue === 0) {
				seatDetails[key][rowIndex] = 2;
			} else {
				seatDetails[key][rowIndex] = 0;
			}
		}
		setSeatDetails({ ...seatDetails });
	};

	const computeSelectedSeat = () => {
		let selectedSeats: string[] = [];
		for (let key in seatDetails) {
			seatDetails[key].forEach((seatValue, seatIndex) => {
				if (seatValue === 2) {
					selectedSeats.push(`${key}${seatIndex + 1}`);
				}
			});
		}
		return selectedSeats;
	};

	let selectedSeats: string[] = computeSelectedSeat();

	const RenderSeatDetails = ({
		selectedSeats
	}: {
		selectedSeats: string[];
	}) => {
		return <span>{selectedSeats.join(', ')}</span>;
	};
	const getColorForSeats = (seatValue: number) => {
		let dynamicClass;
		if (seatValue === 0) {
			// Not booked
			dynamicClass = 'bg-[#DEF3FF]';
		} else if (seatValue === 1) {
			// booked
			dynamicClass = 'bg-[#D5D9DD]';
		} else {
			// Seat Selected
			dynamicClass = 'bg-primary';
		}
		return `${dynamicClass}`;
	};

	const RenderSeats = () => {
		let seatArray = [];
		for (let key in seatDetails) {
			let colValue = seatDetails[key].map((seatValue, rowIndex) => (
				<span
					key={`${key}.${rowIndex}`}
					className='m-2'
				>
					{rowIndex === 0 && (
						<span className='font-bold mr-5 text-primary'>
							{key}
						</span>
					)}
					<span
						className={`${getColorForSeats(
							seatValue
						)} py-[7px] px-[11px] font-bold cursor-pointer rounded`}
						style={{
							boxShadow:
								'0 2px 4px 0 rgb(0 0 0 / 11%), 0 2px 4px 0 rgb(0 0 0 / 14%)'
						}}
						onClick={() => onSeatClick(seatValue, rowIndex, key)}
					>
						{rowIndex + 1}
					</span>
					{seatDetails &&
						rowIndex === seatDetails[key].length - 1 && (
							<>
								<br />
								<br />
							</>
						)}
				</span>
			));
			seatArray.push(colValue);
		}
		return <div>{seatArray}</div>;
	};

	const formValid = () => {
		if (!name || !phone || (!email && selectedSeats.length > 0)) {
			message.error('Vui lòng nhập đầy đủ thông tin mua vé');
		}
	};

	const updateBookedSeats = () => {
		const bookedSeats = JSON.parse(
			localStorage.getItem('selectedSeats') || '[]'
		);

		for (const key in seatDetails) {
			for (
				let rowIndex = 0;
				rowIndex < seatDetails[key].length;
				rowIndex++
			) {
				const seatCode = `${key}${rowIndex + 1}`;
				const seatValue = seatDetails[key][rowIndex];

				if (bookedSeats.includes(seatCode)) {
					// Đánh dấu ghế đã đặt trong mảng seatDetails
					seatDetails[key][rowIndex] = 1;
				}
			}
		}

		// Cập nhật lại trạng thái ghế
		setSeatDetails({ ...seatDetails });
	};
	const handleBuyTicket = async () => {
		const emailContent = `
			<div className='flex flex-col gap-2'>
				<p>Hi ${name},</p>
				<p>Lời đầu tiên, Dịch vụ Bus Reservation xin cảm ơn bạn đã tin tưởng và đặt vé tại hệ thống chúng tôi</p>
				<p>Chúng tôi đã nhận đầy đủ thông tin vé của bạn như sau: </p>
				<div className='w-full rounded-xl border border-[#DDE2E8] px-4 py-3 text-[15px]'>
						<p className='icon-orange flex items-center justify-center gap-4 text-xl font-semibold text-black'>
							Thông tin vé xe
						</p>

						<div className='mt-4 flex justify-between'>
							<span className='text-gray w-20'>Tuyến xe</span>
							<span className='text-right font-semibold'>
								<span className='text-primary mr-1'>
									Đà Nẵng
								</span>
								-
								<span className='text-primary ml-1'>
									Hồ Chí Minh
								</span>
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Thời gian</span>
							<span className='text-black'>
								<span className='text-[#00613D] font-semibold mr-1'>
									07:00
								</span>
								-
								<span className='text-[#00613D] font-semibold ml-1'>
									21:00
								</span>
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Số lượng ghế</span>
							<span className='text-[#00613D]'>
								${selectedSeats.length}
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Số ghế</span>
							<span>${selectedSeats.join(',')}</span>
							
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Tổng tiền</span>
							<span className='text-[#00613D] font-semibold '>
								${convertPrice(selectedSeats.length * 340000) || 0}
								<sup>đ</sup>
							</span>
						</div>
					</div>

					<p>Sau khi kiểm tra thông tin đầy đủ, bạn hãy đưa email này cho kiểm soát vé và thanh toán trước lúc khởi hành nhé</p>

					<p>Cảm ơn vì đã tin tưởng và xử dụng hệ thống của chũng tôi</p>

					<p>Trân trọng</p>
			</div>
		`;
		try {
			formValid();
			const order = {
				fullName: name,
				phone: phone,
				email: email,
				seats: selectedSeats,
				total: selectedSeats.length * 340000
			};
			await addDoc(collection(projectFireStore, 'orders'), order);
			message.success('Bạn đã đặt vé thành công');
			localStorage.setItem(
				'selectedSeats',
				JSON.stringify(selectedSeats)
			);
			updateBookedSeats();
			await fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					email: email,
					selectedSeats: selectedSeats
				})
			});
		} catch (error) {
			message.error('Đặt vé không thành công');
		}
	};

	return (
		<div className='max-w-7xl mx-auto pb-8 sm:block'>
			<div className='flex w-full flex-col gap-6 bg-white pt-0 sm:flex-row sm:pt-8'>
				<div className='flex flex-col'>
					<div className='flex w-full flex-col rounded-xl border'>
						<div className='flex justify-center items-center'>
							<div className='flex-1'>
								<div className='flex items-center justify-center pt-5 text-xl font-medium text-black'>
									<p className=''>Chọn ghế</p>
								</div>

								<div className='mt-6 mb-4 justify-evenly flex items-center text-center font-medium gap-16'>
									<div className='flex'>
										{seatDetails && <RenderSeats />}
									</div>

									<div className='ml-4 mt-5 flex flex-col gap-4 text-[13px] font-normal'>
										<span className='mr-8 flex items-center'>
											<div className='mr-2 h-4 w-4 rounded bg-[#D5D9DD] border-[#C0C6CC]'></div>
											Đã bán
										</span>

										<span className='mr-8 flex items-center'>
											<div className='mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#96C5E7]'></div>
											Còn trống
										</span>

										<span className='flex items-center'>
											<div className='mr-2 h-4 w-4 rounded bg-primary border-[#F8BEAB]'></div>
											Đang chọn
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className='divide py-[2px]'></div>

						<div className='flex w-full flex-col gap-6 px-6 py-4 text-[15px] sm:flex-row'>
							<div className='flex flex-1 flex-col'>
								<p className='text-xl font-medium text-black'>
									Thông tin khách hàng
								</p>
								<form
									action=''
									className='mt-6'
								>
									<div className='flex w-full flex-col'>
										<div className='flex flex-col mb-6'>
											<label>Họ và tên</label>

											<div className='min-h-[32px] flex items-center max-w-full'>
												<span className='border border-solid rounded-lg border-[#dde2e8] h-11 p-2 mt-1 w-full'>
													<input
														type='text'
														name=''
														id=''
														placeholder='Họ và tên'
														className='outline-none ml-2'
														value={name}
														onChange={e =>
															setName(
																e.target.value
															)
														}
														defaultValue={`${name}`}
													/>
												</span>
											</div>
											<p className='text-red-500'></p>
										</div>

										<div className='flex flex-col mb-6'>
											<label>Số điện thoại</label>

											<div className='min-h-[32px] flex items-center max-w-full'>
												<span className='border border-solid rounded-lg border-[#dde2e8] h-11 p-2 mt-1 w-full'>
													<input
														type='text'
														name=''
														id=''
														placeholder='Số Điện Thoại'
														className='outline-none ml-2'
														value={phone}
														onChange={e =>
															setPhone(
																e.target.value
															)
														}
													/>
												</span>
											</div>
											<p className='text-red-500'></p>
										</div>

										<div className='flex flex-col mb-6'>
											<label>Email</label>

											<div className='min-h-[32px] flex items-center max-w-full'>
												<span className='border border-solid rounded-lg border-[#dde2e8] h-11 p-2 mt-1 w-full'>
													<input
														type='text'
														name=''
														id=''
														placeholder='Email'
														className='outline-none ml-2'
														value={email}
														onChange={e =>
															setEmail(
																e.target.value
															)
														}
														defaultValue={`${email}`}
													/>
												</span>
											</div>
											<p className='text-red-500'></p>
										</div>
									</div>
								</form>
							</div>

							<div className='content-editor flex h-full flex-1 flex-col text-justify text-sm'>
								<p className='mb-6 text-center text-base font-medium text-orange'>
									ĐIỀU KHOẢN VÀ LƯU Ý
								</p>
								<div>
									<p>
										(*)
										<span>
											Quý khách vui lòng có mặt tại bến
											xuất phát của xe trước ít nhất 30
											phút giờ xe khởi hành, mang theo
											thông báo đã thanh toán vé thành
											công có chứa mã vé được gửi từ hệ
											thống FUTA BUS LINE.
										</span>
										Vui lòng liên hệ Trung tâm tổng đài
										<div className='text-[#ef5222]'>
											1900 6067
										</div>
										để được hỗ trợ.
									</p>

									<p>
										(*) Nếu quý khách có nhu cầu trung
										chuyển, vui lòng liên hệ Tổng đài trung
										chuyển
										<div className='text-[#ef5222]'>
											1900 6067
										</div>
										trước khi đặt vé. Chúng tôi không
										đón/trung chuyển tại những điểm xe trung
										chuyển không thể tới được.
									</p>
								</div>
							</div>
						</div>

						<div className='divide py-[2px]'></div>

						<div className='flex items-center p-6'>
							<div className='flex flex-auto items-center justify-end'>
								<button className='text-[#ef5222] h-[32px] text-sm cursor-pointer rounded-[32px] border border-solid border-[#c0c6cc] px-[20px] flex items-center justify-center mr-2'>
									Hủy
								</button>
								<button
									onClick={handleBuyTicket}
									className='text-white h-[32px] text-sm cursor-pointer rounded-[32px] bg-[#f2754e] px-[20px] flex items-center justify-center'
								>
									Thanh toán
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='mx-auto flex min-w-[345px] flex-col gap-6'>
					<div className='w-full rounded-xl border border-[#DDE2E8] px-4 py-3 text-[15px]'>
						<p className='icon-orange flex items-center justify-center gap-4 text-xl font-semibold text-black'>
							Thông tin vé xe
						</p>

						<div className='mt-4 flex justify-between'>
							<span className='text-gray w-20'>Tuyến xe</span>
							<span className='text-right font-semibold'>
								<span className='text-primary mr-1'>
									Đà Nẵng
								</span>
								-
								<span className='text-primary ml-1'>
									Hồ Chí Minh
								</span>
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Thời gian</span>
							<span className='text-black'>
								<span className='text-[#00613D] font-semibold mr-1'>
									07:00
								</span>
								-
								<span className='text-[#00613D] font-semibold ml-1'>
									21:00
								</span>
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Số lượng ghế</span>
							<span className='text-[#00613D]'>
								{selectedSeats.length || 0}
							</span>
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Số ghế</span>
							{selectedSeats.length > 0 ? (
								<RenderSeatDetails
									selectedSeats={selectedSeats}
								/>
							) : (
								'Trống'
							)}
						</div>

						<div className='mt-1 flex items-center justify-between'>
							<span className='text-gray w-28'>Tổng tiền</span>
							<span className='text-[#00613D] font-semibold '>
								{convertPrice(selectedSeats.length * 340000) ||
									0}
								<sup>đ</sup>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SeatBook;
