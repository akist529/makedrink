// Component styles
import styles from './EditDrinkButton.module.scss';
// Next components
import Link from 'next/link';

export default function EditDrinkButton (props: { drink: string }) {
    const { drink } = props;

    return (
        <Link href={`/admin/add-drink?drink=${drink}`} className={styles.EditDrinkButton}>
            <span>EDIT DRINK</span>
        </Link>
    );
}