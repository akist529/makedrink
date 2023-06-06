import styles from './SubCard.module.scss';
import Image from 'next/image';
import { useEffect } from 'react';

export default function SubCard (props: { screenX: number, screenY: number, showSubCard: boolean, setShowSubCard: Function }) {
    const { screenX, screenY, showSubCard, setShowSubCard } = props;
    const imagePath = require('/public/images/ui/close.svg');

    useEffect(() => {
        const element = document.querySelector<HTMLElement>(`.${styles.SubCard}`);

        if (element) {
            element.style.left = `${screenX}`;
            element.style.top = `${screenY}`;
        }
    }, [screenX, screenY]);

    return (
        <div className={styles.SubCard} style={{ left: `${screenX}`, top: `${screenY}` }}>
            <span>The original ingredient is </span>
            <button onClick={() => setShowSubCard(false)}>
                <Image 
                    alt="Close Modal" 
                    src={imagePath} />
            </button>
        </div>
    );
}