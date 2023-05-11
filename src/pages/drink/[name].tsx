import styles from '@/styles/Drink.module.scss'
import { useGetAllDrinkInfoQuery } from '@/store/api/api'
import { useRouter } from 'next/router';

export default function DrinkPage () {
    const allDrinkInfo = (useGetAllDrinkInfoQuery().data || []);
    const router = useRouter();
    const { name } = router.query;

    return (
        <div className={styles.Drink}>
            <h1>Hello, {name}!</h1>
        </div>
    );
}