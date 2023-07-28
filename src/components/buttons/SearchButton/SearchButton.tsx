// Component styles
import styles from './SearchButton.module.scss';

export default function SearchButton (props: { onClick: React.MouseEventHandler<HTMLButtonElement>, style: Object }) {
    const { onClick, style } = props;

    return (
        <button
            className={styles.SearchButton}
            style={style}
            onClick={onClick}
        ></button>
    );
}