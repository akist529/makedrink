// Component styles
import styles from './NavMenuItem.module.scss';
// Next components
import Image from 'next/image';

export default function NavMenuItem(props: { item: string }) {
    const {item} = props;
    const slug = item.toLowerCase().split(' ').join('-').replaceAll('/', '-');
    const imagePath = require(`/public/images/ui/${slug}.webp`);

    return (
        <button className={styles.NavMenuItem}>
            <span>{item}</span>
            <Image alt={item} src={imagePath} width='48' height='48' />
        </button>
    );
}