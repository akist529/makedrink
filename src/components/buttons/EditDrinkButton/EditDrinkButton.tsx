import styles from './EditDrinkButton.module.scss';
import Link from 'next/link';
import { DrinkInfo } from '@/types/index';

export default function EditDrinkButton (props: { drink: string }) {
    const { drink } = props;

    return (
        <Link href={`/admin/add-drink?drink=${drink}`} className={styles.EditDrinkButton}>
            <span>EDIT DRINK</span>
        </Link>
    );
}