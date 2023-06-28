// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
// Local components
import AddIngredientCard from '@/components/ui/AddIngredientPage/AddIngredientCard/AddIngredientCard';
import Footer from '@/components/footer/Footer';

const AddIngredientPage: NextPage = () => {
    return (
        <div className='page'>
            <Head>
                <title>Add New Ingredient - MakeDrink</title>
            </Head>
            <AddIngredientCard />
            <Footer />
        </div>
    );
}

export default AddIngredientPage;