// Component styles
import styles from './IngredientModal.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleIngredientModal } from '@/store/slices/ingredientModal.slice';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import ServerError from '@/components/error/ServerError';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';

export default function IngredientModal() {
    // Redux selectors
    const ingredientModalOpen = useSelector((state: RootState) => state.ingredientModal.open);
    const modalIngredient = useSelector((state: RootState) => state.ingredientModal.ingredient);
    // Redux API data
    const { data, isLoading, error } = useGetAllIngredientsQuery();

    const dispatch = useDispatch();

    return (
        <>
        { ingredientModalOpen && data && modalIngredient &&
            <div className={styles.background}>
                <div className={styles.modal}>
                    <button onClick={() => dispatch(toggleIngredientModal())}>
                        <Image 
                            alt="Close Modal" 
                            src={require('/public/images/ui/close.svg')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                    </button>
                    <div className={styles.header}>
                        <span>{modalIngredient.Name}</span>
                        <Image 
                            alt={modalIngredient.Name} 
                            src={require(`/public/images/ui/${getSlug(modalIngredient.Name)}.webp`)} 
                            width="0" 
                            height="48" 
                            onLoadingComplete={e => updateWidth(e)} />
                    </div>
                    <ul className={styles.childList}>
                        { data.filter((ingredient: Item) => ingredient.AliasId === modalIngredient.Id)
                            .map((ingredient: Item) => <Ingredient key={ingredient.Id} item={ingredient} section={[]} />) }
                        <Ingredient item={modalIngredient} section={[]} />
                    </ul>
                </div>
            </div> }
        { ingredientModalOpen && isLoading && !error && 
            <LoadingAnimation /> }
        { ingredientModalOpen && error &&
            <ServerError /> }
        </>
    );
}