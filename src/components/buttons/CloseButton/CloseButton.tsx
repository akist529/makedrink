// Component styles
import styles from './CloseButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function CloseButton(props: { onClick: React.MouseEventHandler<HTMLButtonElement>, text: string }) {
    const { onClick, text } = props;

    return (
        <button className={styles.CloseButton} onClick={onClick}>
            <Image 
                alt={text} 
                src={require('/public/images/ui/close.svg')} 
                width="0" 
                height="48" 
                title={text} 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}