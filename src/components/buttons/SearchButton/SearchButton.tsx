// Component styles
import styles from './SearchButton.module.scss';

export default function SearchButton (props: { clickEvent: React.MouseEventHandler<HTMLButtonElement>, style: Object }) {
    const { clickEvent, style } = props;

    return (
        <button
            className={styles.SearchButton}
            style={style}
            onClick={clickEvent}
        ></button>
    );
}