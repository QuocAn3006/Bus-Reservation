import { projectAuth } from '@/firebase/clientApp';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

async function loginWithGoogle() {
	const googleProvider = new GoogleAuthProvider();
	await signInWithPopup(projectAuth, googleProvider)
		.then(res => {
			if (res.user.emailVerified) {
				return res;
			}
		})
		.catch(err => {
			console.log(err);
		});
}

export { loginWithGoogle };
