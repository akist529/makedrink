import styles from './ScrollButton.module.scss';
import Image from 'next/image';

export default function ScrollButton (props: { link: string }) {
    const { link } = props;

    return (
        <a href={link} className={styles.ScrollButton}>
            <button>
                <Image alt='Scroll' src={require('/public/images/ui/arrow_circle_down.svg')} width="64" height="64" />
            </button>
        </a>
    );
}