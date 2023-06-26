// Page styles
import styles from '@/styles/AddIngredient.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import AddIngredientCard from '@/components/ui/AddIngredientPage/AddIngredientCard/AddIngredientCard';
import Footer from '@/components/footer/Footer';

const AddIngredientPage: NextPage = () => {
    return (
        <div className='page'>
            <AddIngredientCard />
            <Footer />
        </div>
    );
}

export default AddIngredientPage;