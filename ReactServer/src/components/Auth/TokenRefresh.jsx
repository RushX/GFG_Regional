import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
const checkAuth=(async()=>{
if (user) {
  const accessToken = await user.getIdToken();
    localStorage.setItem('accessToken', accessToken)
} })

export default checkAuth;