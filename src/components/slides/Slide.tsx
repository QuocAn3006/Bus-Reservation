/* eslint-disable react/jsx-no-undef */
'use client';
import Slider from 'react-slick';
import Image from 'next/image';
import { Slide, Settings } from '@/types';
interface Props {
	imgSlide: Slide[];
}
const Slide: React.FC<Props> = props => {
	const { imgSlide } = props;
	const setting: Settings = {
		dots: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 1,
		infinite: false,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1
				}
			}
		]
	};

	return (
		<Slider
			{...setting}
			className='m-auto'
		>
			{imgSlide.map((item, idx) => (
				<div
					className='w-[98%] max-w-[396px] overflow-hidden sm:ml-0'
					key={idx}
				>
					<div className='h-48 w-[96%] cursor-pointer flex overflow-hidden rounded-xl mx-auto'>
						<div className='w-full h-full object-fill relative'>
							<Image
								fill={true}
								src={item.slide}
								alt='slide'
								className='w-full h-full object-fill transition-all duration-200 relative'
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
					{item.name && (
						<div className='w-full'>
							<p className='mx-4 my-3 h-[38px] text-left leading-5 line-clamp-2 overflow-hidden'>
								{item.name}
							</p>
						</div>
					)}
				</div>
			))}
		</Slider>
	);
};

export default Slide;
