// Component styles
import styles from './NavMenuItem.module.scss';
// Next components
import Image from 'next/image';

export default function NavMenuItem(props: { item: string, img: string }) {
    const { item, img } = props;
    const imagePath = require(`/public/images/ui/${img}`);

    return (
        <button className={styles.NavMenuItem}>
            <span>{item}</span>
            <Image 
                alt={item} 
                src={imagePath} 
                width='48' 
                height='48' />
        </button>
    );
}