// Page styles
import styles from '@/styles/Error.module.scss';
// Next components
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
// Local components
import MakeDrinkLink from '@/components/links/MakeDrinkLink/MakeDrinkLink';
import Footer from '@/components/footer/Footer';

const ErrorPage: NextPage = () => {
    return (
        <div className={['page', styles.ErrorPage].join(' ')}>
            <Head>
                <title>404: Page Not Found - MakeDrink</title>
            </Head>
            <h1>Maybe you&apos;ve had enough...</h1>
            <hr/>
            <h2>The URL that you tried to access does not exist.</h2>
            <Link href='/'>
                <MakeDrinkLink />
            </Link>
            <Footer />
        </div>
    )
}

export default ErrorPage;