// Component styles
import styles from './SearchButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function SearchButton (props: { onClick: React.MouseEventHandler<HTMLButtonElement>, style: Object }) {
    const { onClick, style } = props;

    return (
        <button className={styles.SearchButton} style={style} onClick={onClick}>
            <Image 
                alt='Search' 
                src={require('/public/images/ui/search.svg')} 
                width="0" 
                height="40" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}