// Page styles
import styles from '@/styles/Error.module.scss';
// Next components
import type { NextPage } from 'next';
import Link from 'next/link';
// Local components
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
import Footer from '@/components/footer/Footer';

const ErrorPage: NextPage = () => {
    return (
        <div className={['page', styles.ErrorPage].join(' ')}>
            <h1>Maybe you&apos;ve had enough...</h1>
            <hr/>
            <h2>The URL that you tried to access does not exist.</h2>
            <Link href='/'>
                <nav>
                    <MakeDrinkButton />
                </nav>
            </Link>
            <Footer />
        </div>
    )
}

export default ErrorPage;