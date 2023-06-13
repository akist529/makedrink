// Component styles
import styles from './NavMenuCategory.module.scss';
// Redux components
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
// Next components
import Image from 'next/image';
import Link from 'next/link';
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';
// Type interfaces
import { IngredientDict, Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';

export default function NavMenuCategory(props: { type: string }) {
    const { type } = props;
    const storedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.stored);
    const imagePath = require('/public/images/ui/expand_more.svg');

    const menuItems = (() => {
        const links: Item[] = [];
        
        Object.keys(storedIngredients[type]).forEach(key => {
            storedIngredients[type][key].forEach(item => {
                links.push(item);
            })
        })

        return links;
    })();

    return (
        <li className={styles.NavMenuCategory}>
            <button>
                <span>{type}</span>
                <Image 
                    alt='Expand' 
                    src={imagePath} 
                    width="0" 
                    height="40" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
            <ul>
                { menuItems.map((item: Item, index: number) => {
                    return (
                        <li key={index}>
                            <Link href={`/${getSlug(item.Name)}`}>
                                <NavMenuItem 
                                    item={item.Name} 
                                    slug={getSlug(item.Name)}
                                    img='cocktail.webp' />
                            </Link>
                        </li>
                    );
                }) }
            </ul>
        </li>
    );
}