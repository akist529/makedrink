// Page styles
import styles from './DrinkCard.module.scss';
// React components
import { useState } from 'react';
// Next components
import Image from 'next/image';
import Link from 'next/link';
// Type interfaces
import { DrinkInfo, Ingredient } from '@/types/index';

export default function DrinkCard (props: { drink: DrinkInfo }) {
    const { drink } = props;

    return (
        <article className={styles.DrinkCard}>
            <h2>{drink.Name}</h2>
            <h3>Ingredients</h3>
            <ul className={styles.ingredients}>
                { drink.Recipe.map((item: Ingredient, index: number) => {
                    return (
                        <li key={index}>
                            <span>{item.Name}</span>
                            <Image 
                                alt={item.Name} 
                                src={require(`/public/images/ui/${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} 
                                height="24" />
                        </li>
                    );
                }) }
            </ul>
            <Image alt={drink.Name} src={require('/public/images/ui/cocktail-placeholder.jpg')} height="128" />
            <Link href={`/drink/${drink.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`}>
                <button className={styles.goBtn}>
                    <span>GO TO DRINK</span>
                    <Image alt="Go to Drink" src={require('/public/images/ui/keyboard_double_arrow_right.svg')} width="32" height="32" />
                </button>
            </Link>
        </article>
    );
}