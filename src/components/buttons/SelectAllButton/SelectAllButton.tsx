import styles from './SelectAllButton.module.scss';
import Image from 'next/image';
import updateWidth from '@/helpers/updateWidth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo } from 'react';
import { Item } from '@/types/index';

export default function SelectAllButton (props: { clickEvent: Function, ingredients: Item[] }) {
    const { clickEvent, ingredients } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    
    const allIngredientsStored = useMemo(() => {
        return ingredients.every((item: Item) => {
            if (item.Type && storedIngredients.hasOwnProperty(item.Type)) {
                for (const key of Object.keys(storedIngredients[item.Type])) {
                    const storedItem = storedIngredients[item.Type][key].find((storedItem: Item) => item.Id === storedItem.Id);

                    if (storedItem) {
                        return true;
                    }
                }
            }
        });
    }, [ingredients, storedIngredients]);

    const ButtonStyle = useMemo(() => {
        if (allIngredientsStored) {
            return [styles.SelectAllButton, styles.active].join(' ');
        } else {
            return styles.SelectAllButton;
        }
    }, [allIngredientsStored]);

    return (
        <button className={ButtonStyle} onClick={e => clickEvent(e, ingredients)}>
            <Image 
                alt='Select All' 
                src={require('/public/images/ui/done_all.svg')} 
                width="0" 
                height="48" 
                title='Select All' 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}