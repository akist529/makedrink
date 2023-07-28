// Component styles
import styles from './MakeDrinkLink.module.scss';

export default function MakeDrinkLink (props: { onClick?: React.MouseEventHandler<HTMLElement> }) {
    const { onClick } = props;
    return (
        <div className={styles.MakeDrinkLink} title="Make A Drink" onClick={onClick}>
            <span>Make A Drink!</span>
        </div>
    );
}