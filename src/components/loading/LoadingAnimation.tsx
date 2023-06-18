// Component styles
import styles from './LoadingAnimation.module.scss';
// Next components
import Image from 'next/image';
// React components
import { useState, useEffect, useMemo } from 'react';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function LoadingAnimation () {
    const text = useMemo(() => ['Loading', '.', '.', '.'], []);
    const [timer, setTimer] = useState(0);
    
    useEffect(() => {
        if (timer > 3) {
            setTimeout(() => setTimer(0), 500);
        } else {
            setTimeout(() => setTimer(prevState => prevState + 1), 500);
        }
    }, [timer]);

    return (
        <div className={styles.LoadingAnimation}>
            <h1>
                {text[0]}
                { timer > 0 && text[1] }
                { timer > 1 && text[2] }
                { timer > 2 && text[3] }
            </h1>
            <Image 
                alt='Loading' 
                src={require('/public/images/ui/shaker.webp')} 
                width="0" 
                height="128" 
                onLoadingComplete={e => updateWidth(e)} />
        </div>
    );
}