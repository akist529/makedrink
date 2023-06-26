// Page styles
import styles from '@/styles/AddDrink.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import AddDrinkCard from '@/components/ui/AddDrinkPage/AddDrinkCard/AddDrinkCard';
import Footer from '@/components/footer/Footer';

const AddDrinkPage: NextPage = () => {
    return (
        <div className='page'>
            <AddDrinkCard />
            <Footer />
        </div>
    );
}

export default AddDrinkPage;