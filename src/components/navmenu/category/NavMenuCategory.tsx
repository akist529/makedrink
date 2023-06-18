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
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useMemo } from 'react';

export default function NavMenuCategory(props: { type: string }) {
    const { type } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const menuItems = useMemo(() => {
        const links: Item[] = [];
        
        Object.keys(storedIngredients[type]).forEach(key => {
            storedIngredients[type][key].forEach(item => {
                links.push(item);
            })
        })

        return links;
    }, [storedIngredients, type]);

    return (
        <li className={styles.NavMenuCategory}>
            <button>
                <span>{type}</span>
                <Image 
                    alt='Expand' 
                    src={require('/public/images/ui/expand_more.svg')} 
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