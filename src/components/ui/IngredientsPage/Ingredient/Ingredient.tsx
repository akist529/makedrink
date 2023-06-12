// Component styles
import styles from './Ingredient.module.scss';
// React components
import { useState, useEffect } from 'react';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllIngredientsQuery } from '@/store/api/api';
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice';
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice';
import { RootState } from '@/store/store';
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox';
// Type interfaces
import { Item, IngredientDict } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function Ingredient (props: { item: Item, section: Item[]}) {
    // Import props
    const { item, section } = props;
    // Redux components
    const storedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();
    const ingredientImagePath = require(`/public/images/ui/${slug(item)}.webp`);
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`);
    const allIngredients: Item[] = (useGetAllIngredientsQuery().data || []);
    // React states
    const [isChecked, setIsChecked] = useState(itemInStore(item));

    const hasChildren = (() => {
        if (!item.AliasId) {
            for (const ingredient of section) {
                if (ingredient.AliasId === item.Id) {
                    return true;
                }
            }
        } return false;
    })();

    function itemInStore (item: Item) {
        const letter: string = item.Name.charAt(0);
        const type: string = item.Type;

        if (storedIngredients.hasOwnProperty(type)
            && storedIngredients[type].hasOwnProperty(letter)) {
            const path = storedIngredients[type][letter];

            if (path.some((ingredient: Item) => ingredient.Id === item.Id)) {
                return true;
            }
        }

        return false;
    }

    function aliasInStore(item: Item) {
        const type: string = item.Type;

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                const path = storedIngredients[type][key];
                
                if (path.some((ingredient: Item) => ingredient.AliasId === item.Id)) {
                    return true;
                }
            }
        }

        return false;
    }

    function addIngredientToStore () {
        dispatch(addIngredient(item));

        // Add parent ingredient to store if applicable
        if (item.AliasId) {
            for (const ingredient of allIngredients) {
                if (ingredient.Id === item.AliasId) {
                    dispatch(addIngredient(ingredient));
                    break;
                }
            }
        }
    }

    function handleClick () {
        if (hasChildren) {
            dispatch(setModalIngredient(item));
            dispatch(toggleIngredientModal());
        } else {
            setIsChecked(prevState => !prevState);

            const letter = item.Name.charAt(0);
            const ingredientInStore = (() => {
                const type = item.Type;

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
                addIngredientToStore();
            }
        }
    }

    function slug (item: Item) {
        return `${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`;
    }

    // If parent ingredient, see if child ingredient is in store
    useEffect(() => {
        if (hasChildren) {
            if (aliasInStore(item)) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [storedIngredients]);

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={handleClick}>
                { hasChildren &&
                    <Image 
                        className={styles.children} 
                        alt="Show Varieties" 
                        src={childrenImagePath} 
                        width="0" 
                        height="64" 
                        onLoadingComplete={e => updateWidth(e)} /> }
                <div className={styles.icon}>
                    <Image 
                        alt={item.Name} 
                        src={ingredientImagePath} 
                        width="0" 
                        height="32" 
                        onLoadingComplete={e => updateWidth(e)} />
                </div>
                <IngredientCheckbox 
                    item={item} 
                    isChecked={isChecked} />
            </button>
            <span>{item.Name}</span>
        </li>
    );
}