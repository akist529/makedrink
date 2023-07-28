// Component styles
import styles from './DirectionField.module.scss';

export default function DirectionField (props: { i: number, removeDirection: Function, value: string }) {
    const { i, removeDirection, value } = props;

    return (
        <li id={`dir-${i}-container`} className={styles.DirectionField}>
            <span>{i + 1}</span>
            <textarea id={`dir-${i}`} name={`dir-${i}`} placeholder={value ? value : ''}></textarea>
            <button
                title='Remove Direction'
                onClick={e => removeDirection(e, i)}
            ></button>
        </li>
    );
}