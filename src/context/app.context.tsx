'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ProgressBar
				height='3px'
				color='#fff'
				options={{ showSpinner: false }}
				shallowRouting
			/>
			{children}
		</>
	);
};

export default AppContextProvider;
