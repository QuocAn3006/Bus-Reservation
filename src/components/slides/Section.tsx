'use client';
import Slide from './Slide';
interface SlideItem {
	name?: string | undefined;
	slide: string;
}
interface Props {
	title: string;
	imgSlide: Array<SlideItem>;
}

const Section: React.FC<Props> = props => {
	const { title, imgSlide } = props;
	return (
		<section className=' max-w-7xl mx-auto text-center flex flex-col sm:p-10'>
			<span className='text-green font-semibold text-2xl uppercase'>
				{title}
			</span>

			<div className='w-full mt-4'>
				<Slide imgSlide={imgSlide} />
			</div>
		</section>
	);
};

export default Section;
