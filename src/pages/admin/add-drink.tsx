// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
// Local components
import AddDrinkCard from '@/components/ui/AddDrinkPage/AddDrinkCard/AddDrinkCard';
import Footer from '@/components/footer/Footer';

const AddDrinkPage: NextPage = () => {
    return (
        <div className='page'>
            <Head>
                <title>Add New Drink - MakeDrink</title>
            </Head>
            <AddDrinkCard />
            <Footer />
        </div>
    );
}

export default AddDrinkPage;