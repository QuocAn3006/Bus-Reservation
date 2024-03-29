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
			</>
		);
	}
}
