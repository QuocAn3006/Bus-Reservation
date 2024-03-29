import { useEffect, useState } from 'react';

export const useDebounce = (value: string) => {
	const [valueDebounce, setValueDebounce] = useState<string>('');
	useEffect(() => {
		const handle = setTimeout(() => {
			setValueDebounce(value);
		}, 400);

		return () => {
			clearTimeout(handle);
		};
	}, [value]);

	return valueDebounce;
};
