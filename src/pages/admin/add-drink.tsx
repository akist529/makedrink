// Page styles
import styles from '@/styles/AddDrink.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import AddDrinkCard from '@/components/ui/AddDrinkPage/AddDrinkCard/AddDrinkCard';

const AddDrinkPage: NextPage = () => {
    return (
        <div className={styles.AddDrinkPage}>
            <AddDrinkCard />
        </div>
    );
}

export default AddDrinkPage;