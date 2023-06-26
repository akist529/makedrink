// Page styles
import styles from '@/styles/Login.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import LoginCard from '@/components/ui/LoginPage/LoginCard/LoginCard';
import Footer from '@/components/footer/Footer';

const LoginPage: NextPage = () => {
    return (
        <div className='page'>
            <LoginCard />
            <Footer />
        </div>
    );
}

export default LoginPage;