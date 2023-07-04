// Component styles
import styles from './Ingredient.module.scss';
// React components
import { useState, useEffect, useCallback, useMemo } from 'react';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice';
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice';
import { RootState } from '@/store/store';
// Local components
import IngredientCheckbox from '@/components/ui/IngredientsPage/Ingredient/IngredientCheckbox/IngredientCheckbox';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';

export default function Ingredient (props: { item: Item, section: Item[]}) {
    const { item, section } = props;
    const dispatch = useDispatch();

    // Redux components
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    // Local state
    const [img, setImg] = useState(`https://img.makedr.ink/i/${getSlug(item.Name)}.webp`);

    const displayName = useMemo(() => getItemName(item), [item]);

    const hasChildren = useMemo(() => {
        if (!item.AliasId) {
            const child = section.find((ingredient: Item) => ingredient.AliasId === item.Id);
            if (child) return true;
        } else return false;
    }, [item, section]);

    const itemInStore = useCallback((item: Item) => {
        const type = item.Type || '';
        const key = item.Name.charAt(0);

        if (storedIngredients.hasOwnProperty(type)
            && storedIngredients[type].hasOwnProperty(key)) {
            const path = storedIngredients[type][key];

            if (path.some((ingredient: Item) => ingredient.Id === item.Id)) {
                return true;
            }
        }

        return false;
    }, [storedIngredients]);

    const aliasInStore = useCallback((item: Item) => {
        const type = item.Type || '';

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                const path = storedIngredients[type][key];
                
                if (path.some((ingredient: Item) => ingredient.AliasId === item.Id)) {
                    return true;
                }
            }
        }

        return false;
    }, [storedIngredients])

    // React states
    const [isChecked, setIsChecked] = useState(() => {
        if (hasChildren) {
            return aliasInStore(item);
        } else {
            return itemInStore(item);
        }
    });

    function updateStore () {
        if (hasChildren) {
            dispatch(setModalIngredient(item));
            dispatch(toggleIngredientModal());
        } else {
            setIsChecked(prevState => !prevState);

            const key = item.Name.charAt(0);
            const ingredientInStore = (() => {
                const type = item.Type || '';

                if (storedIngredients.hasOwnProperty(type)
                    && storedIngredients[type].hasOwnProperty(key)
                    && storedIngredients[type][key].find((ingredient: Item) => ingredient.Name === item.Name)) {
                        return true;
                    }
    
                return false;
            })();

            if (ingredientInStore) {
                dispatch(removeIngredient(item));
            } else {
                dispatch(addIngredient(item));
            }
        }
    }

    // If parent ingredient, see if child ingredient is in store
    useEffect(() => {
        if (hasChildren) {
            if (aliasInStore(item) || itemInStore(item)) {
                setIsChecked(true);
            } else setIsChecked(false);
        } else {
            if (itemInStore(item)) {
                setIsChecked(true);
            } else setIsChecked(false);
        }
    }, [storedIngredients, aliasInStore, hasChildren, item, itemInStore]);

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={updateStore}>
            { hasChildren &&
                <Image 
                    className={styles.children} 
                    alt="Show Varieties" 
                    src={require('/public/images/ui/more_vert.svg')} 
                    width={8} 
                    height={50} 
                    style={{ width: 8, height: 50 }} /> }
                <div className={styles.icon}>
                    <Image 
                        alt={item.Name} 
                        src={img} 
                        width="0" 
                        height="50" 
                        onLoadingComplete={e => updateWidth(e)} 
                        onError={() => setImg('https://img.makedr.ink/i/cocktail.webp')} 
                        unoptimized />
                </div>
                <IngredientCheckbox 
                    item={item} 
                    isChecked={isChecked} />
                <span>{displayName}</span>
            </button>
        </li>
    );
}