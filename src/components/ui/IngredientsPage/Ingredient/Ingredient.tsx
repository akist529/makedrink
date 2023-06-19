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
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';

export default function Ingredient (props: { item: Item, section: Item[]}) {
    // Import props
    const { item, section } = props;
    // Redux components
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();
    const displayName = useMemo(() => getItemName(item), [item]);

    const hasChildren = useMemo(() => {
        if (!item.AliasId) {
            for (const ingredient of section) {
                if (ingredient.AliasId === item.Id) {
                    return true;
                }
            }
        } return false;
    }, [item, section]);

    const itemInStore = useCallback((item: Item) => {
        const letter: string = item.Name.charAt(0);
        const type: string = item.Type || '';

        if (storedIngredients.hasOwnProperty(type)
            && storedIngredients[type].hasOwnProperty(letter)) {
            const path = storedIngredients[type][letter];

            if (path.some((ingredient: Item) => ingredient.Id === item.Id)) {
                return true;
            }
        }

        return false;
    }, [storedIngredients]);

    const aliasInStore = useCallback((item: Item) => {
        const type: string = item.Type || '';

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

    function handleClick () {
        if (hasChildren) {
            dispatch(setModalIngredient(item));
            dispatch(toggleIngredientModal());
        } else {
            setIsChecked(prevState => !prevState);

            const letter = item.Name.charAt(0);
            const ingredientInStore = (() => {
                const type = item.Type || '';

                if (storedIngredients.hasOwnProperty(type)
                    && storedIngredients[type].hasOwnProperty(letter)
                    && storedIngredients[type][letter].find((ingredient: Item) => ingredient.Name === item.Name)) {
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
            } else {
                setIsChecked(false);
            }
        } else {
            if (itemInStore(item)) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [storedIngredients, aliasInStore, hasChildren, item, itemInStore]);

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={handleClick}>
                { hasChildren &&
                    <Image 
                        className={styles.children} 
                        alt="Show Varieties" 
                        src={require('/public/images/ui/more_vert.svg')} 
                        width="0" 
                        height="64" 
                        onLoadingComplete={e => updateWidth(e)} /> }
                <div className={styles.icon}>
                    <Image 
                        alt={item.Name} 
                        src={require(`/public/images/ui/${getSlug(item.Name)}.webp`)} 
                        width="0" 
                        height="48" 
                        onLoadingComplete={e => updateWidth(e)} />
                </div>
                <IngredientCheckbox 
                    item={item} 
                    isChecked={isChecked} />
            </button>
            <span>{displayName}</span>
        </li>
    );
}