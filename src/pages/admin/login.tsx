// Page styles
import styles from '@/styles/Login.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import LoginCard from '@/components/ui/LoginPage/LoginCard/LoginCard';

const LoginPage: NextPage = () => {
    return (
        <div className={styles.LoginPage}>
            <LoginCard />
        </div>
    );
}

export default LoginPage;