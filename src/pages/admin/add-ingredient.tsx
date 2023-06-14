// Page styles
import styles from '@/styles/AddIngredient.module.scss';
// Next components
import type { NextPage } from 'next';
// Local components
import AddIngredientCard from '@/components/ui/AddIngredientPage/AddIngredientCard/AddIngredientCard';

const AddIngredientPage: NextPage = () => {
    return (
        <div className={styles.AddIngredientPage}>
            <AddIngredientCard />
        </div>
    );
}

export default AddIngredientPage;