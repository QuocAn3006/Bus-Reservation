export interface Slide {
	name?: string | undefined;
	slide: string;
}
export interface Settings {
	dots: boolean;
	speed: number;
	slidesToShow: number;
	slidesToScroll: number;
	initialSlide: number;
	autoplay: boolean;
	infinite: boolean;
	autoplaySpeed: number;
	responsive: Array<{
		breakpoint: number;
		settings: {
			slidesToShow: number;
			slidesToScroll: number;
			initialSlide?: number;
			infinite?: boolean;
			dots?: boolean;
		};
	}>;
}

export type Provinces = {
	_id: string;
	name: string;
	slug: string;
	type: string;
	name_with_type: string;
	code: string;
	isDeleted: boolean;
};

export type provincesJson = {
	exitcode: string;
	data: {
		nItems?: number;
		nPages?: number;
		data: Provinces[];
	};
};

export type ticket = {
	fromProvince: string;
	toProvince: string;
	date: string;
	time: string;
};

export type Seats = {
	[key: string]: number[];
};
