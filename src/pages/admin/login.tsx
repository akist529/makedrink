// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
// Local components
import LoginCard from '@/components/ui/LoginPage/LoginCard/LoginCard';
import Footer from '@/components/footer/Footer';

const LoginPage: NextPage = () => {
    return (
        <div className='page'>
            <Head>
                <title>Log In - MakeDrink</title>
            </Head>
            <LoginCard />
            <Footer />
        </div>
    );
}

export default LoginPage;