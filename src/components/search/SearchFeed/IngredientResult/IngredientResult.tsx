import styles from './IngredientResult.module.scss';
import { Item } from '@/types/index';
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import findItemInStore from '@/helpers/findItemInStore';
import getItemName from '@/helpers/getItemName';
import Image from 'next/image';
import getSlug from '@/helpers/getSlug';
import updateWidth from '@/helpers/updateWidth';

export default function SearchResult (props: { ingredient: Item }) {
    const { ingredient } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const inStore = (() => {
        if (findItemInStore(storedIngredients, ingredient.Name)) {
            return true;
        } else {
            return false;
        }
    })();
    const displayName = getItemName(ingredient);
    const slug = getSlug(ingredient.Name);

    return (
        <div className={styles.IngredientResult}>
            <span>{displayName}</span>
            <Image 
                alt={displayName} 
                src={require(`/public/images/ui/${slug}.webp`)} 
                width="0" 
                height="24" 
                onLoadingComplete={e => updateWidth(e)} />
            <IngredientCheckbox 
                item={ingredient} 
                isChecked={inStore} />
        </div>
    );
}