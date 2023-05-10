// Component styles
import styles from './RandomDrink.module.scss'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// Next components
import Link from 'next/link'
import Image from 'next/image'

export default function RandomDrink (props: { randomDrink: any }) {
    const { randomDrink } = props;
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);

    return (
        <div>
            <span>{Object.keys(possibleDrinks).length} drink{Object.keys(possibleDrinks).length > 1 && 's'} found!</span>
            <div className={styles.RandomDrink}>
                <span>{randomDrink['Name']}</span>
                <span>DRINK IMAGE</span>
                { randomDrink['Recipe'].map((ingredient: any, index: number) => {
                    return <span key={index}>{ingredient['Name']}</span>
                }) }
                <Link href={`/drink/${randomDrink.Name.toLowerCase().replaceAll(' ', '-')}`}>
                    <button>
                        <span>GO TO DRINK</span>
                        <Image alt="Go to Drink" src={require('/public/images/ui/local_bar.svg')} width="16" height="16" />
                    </button>
                </Link>
            </div>
        </div>
    )
}