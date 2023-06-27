// Component styles
import styles from './ScrollButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function ScrollButton (props: { link: string, text: string }) {
    const { link, text } = props;

    return (
        <a className={styles.ScrollButton} href={link}>
            <Image 
                alt={text} 
                src={require('/public/images/ui/arrow_circle_down.svg')} 
                width="0" 
                height="64" 
                title={text} 
                onLoadingComplete={e => updateWidth(e)} />
        </a>
    );
}