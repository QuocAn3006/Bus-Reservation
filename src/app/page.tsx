'use client';
import Section from '@/components/slides/Section';
import Search from '@/components/Search';
import { imageSlide, imageNews } from '@/constants/index';
import { useEffect, useState } from 'react';
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import { projectFireStore } from '@/firebase/clientApp';
import { Spin } from 'antd';
import Image from 'next/image';

export default function Home() {
	const [dataUpdate, setDataUpdate] = useState<boolean>(false);
	useEffect(() => {
		const checkAndUpdateDate = async () => {
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');
			const formattedDate = `${year}-${month}-${day}`;

			const q = query(
				collection(projectFireStore, 'tickets'),
				where('date', '==', formattedDate)
			);

			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				// Không có vé cho ngày hiện tại trong cơ sở dữ liệu, cần cập nhật
				setDataUpdate(true);
				await updateDate(formattedDate);
			} else {
				setDataUpdate(true);
			}
		};

		checkAndUpdateDate();
	}, []);

	const updateDate = async (dateToUpdate: string) => {
		const q = query(collection(projectFireStore, 'tickets'));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async item => {
			const ticketRef = doc(projectFireStore, 'tickets', item.id);
			const data = item.data().data;

			await updateDoc(ticketRef, {
				data: { ...data, date: dateToUpdate }
			});
		});
	};
	if (!dataUpdate) {
		<Spin
			delay={400}
			spinning={dataUpdate}
		></Spin>;
	} else {
		return (
			<>
				<Search />

				<Section
					title='Khuyến mãi nổi bật'
					imgSlide={imageSlide}
				/>
				<Section
					title='Tin tức mới'
					imgSlide={imageNews}
				/>

				<section className='max-w-7xl mx-auto text-center flex flex-col sm:p-10'>
					<span className='text-green font-semibold text-2xl uppercase'>
						Chất lượng là danh dự
					</span>
					<span className='text-base mt-2 text-[#4a4a4a]'>
						Được khách hàng tin tưởng và lựa chọn
					</span>
					<div className='mt-8 sm:grid sm:grid-cols-2 sm:gap-16'>
						<div>
							<div className='mb-6 flex items-center'>
								<div>
									<Image
										src={
											'https://storage.googleapis.com/futa-busline-cms-dev/Group_662c4422ba/Group_662c4422ba.svg'
										}
										width={96}
										height={96}
										loading='lazy'
										alt='image'
									/>
								</div>
								<div className='ml-4 flex flex-col text-left'>
									<span className='text-2xl font-semibold text-black lg:text-3xl'>
										Hơn 20 triệu
										<span className='ml-3 text-base'>
											Lượt khách
										</span>
									</span>
									<span className='text-[#637280]'>
										Phục vụ hơn 20 triệu lượt khách bình
										quân 1 năm trên toàn quốc
									</span>
								</div>
							</div>

							<div className='mb-6 flex items-center'>
								<div>
									<Image
										src={
											'https://storage.googleapis.com/futa-busline-cms-dev/Store_55c0da8bd7/Store_55c0da8bd7.svg'
										}
										width={96}
										height={96}
										loading='lazy'
										alt='image'
									/>
								</div>
								<div className='ml-4 flex flex-col text-left'>
									<span className='text-2xl font-semibold text-black lg:text-3xl'>
										Hơn 350
										<span className='ml-3 text-base'>
											Phòng khách - Bưu cục
										</span>
									</span>
									<span className='text-[#637280]'>
										Có hơn 350 phòng vé, trạm trung chuyển,
										bến xe,... trên toàn hệ thống
									</span>
								</div>
							</div>

							<div className='mb-6 flex items-center'>
								<div>
									<Image
										src={
											'https://storage.googleapis.com/futa-busline-cms-dev/Group_2_75b5ed1dfd/Group_2_75b5ed1dfd.svg'
										}
										width={96}
										height={96}
										loading='lazy'
										alt='image'
									/>
								</div>
								<div className='ml-4 flex flex-col text-left'>
									<span className='text-2xl font-semibold text-black lg:text-3xl'>
										Hơn 1,000
										<span className='ml-3 text-base'>
											Chuyến xe
										</span>
									</span>
									<span className='text-[#637280]'>
										Phục vụ hơn 1,000 chuyến xe đường dài và
										liên tỉnh mỗi ngày
									</span>
								</div>
							</div>
						</div>

						<div className='relative hidden object-contain sm:block'>
							<Image
								src={
									'https://storage.googleapis.com/futa-busline-cms-dev/image_f922bef1bb/image_f922bef1bb.svg'
								}
								className='transition-all duration-200 relative hidden object-contain sm:block'
								alt='image'
								loading='lazy'
								width={532}
								height={369}
								style={{
									position: 'absolute',
									height: '100%',
									width: '100%',
									inset: '0px',
									color: 'transparent'
								}}
							/>
						</div>
					</div>
				</section>
			</>
		);
	}
}
