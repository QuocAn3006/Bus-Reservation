import { convertPrice } from '@/utils';

const EmailTemplate = (name: string, selectedSeats: string[]) => {
	return (
		<div className='flex flex-col gap-2'>
			<p>Hi ${name},</p>
			<p>
				Lời đầu tiên, Dịch vụ Bus Reservation xin cảm ơn bạn đã tin
				tưởng và đặt vé tại hệ thống chúng tôi
			</p>
			<p>Chúng tôi đã nhận đầy đủ thông tin vé của bạn như sau: </p>
			<div className='w-full rounded-xl border border-[#DDE2E8] px-4 py-3 text-[15px]'>
				<p className='icon-orange flex items-center justify-center gap-4 text-xl font-semibold text-black'>
					Thông tin vé xe
				</p>

				<div className='mt-4 flex justify-between'>
					<span className='text-gray w-20'>Tuyến xe</span>
					<span className='text-right font-semibold'>
						<span className='text-primary mr-1'>Đà Nẵng</span>-
						<span className='text-primary ml-1'>Hồ Chí Minh</span>
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

			<p>
				Sau khi kiểm tra thông tin đầy đủ, bạn hãy đưa email này cho
				kiểm soát vé và thanh toán trước lúc khởi hành nhé
			</p>

			<p>Cảm ơn vì đã tin tưởng và xử dụng hệ thống của chũng tôi</p>

			<p>Trân trọng</p>
		</div>
	);
};

export default EmailTemplate;
