// Component styles
import styles from './DirectionField.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function DirectionField (props: { i: number, removeDirection: Function }) {
    const { i, removeDirection } = props;

    return (
        <div id={`dir-${i}-container`} className={styles.DirectionField}>
            <span>{i + 1}</span>
            <input type="text" id={`dir-${i}`} name={`dir-${i}`} />
            <button onClick={e => removeDirection(e, i)}>
                <Image 
                    alt="Remove Direction"
                    src={require('/public/images/ui/cancel.svg')} 
                    width="0" 
                    height="24" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
        </div>
    );
}