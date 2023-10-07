// Component styles
import styles from './CloseButton.module.scss';

export default function CloseButton(props: { onClick: React.MouseEventHandler<HTMLButtonElement>, text: string }) {
    const { onClick, text } = props;

    return (
        <button title={text} className={styles.CloseButton} onClick={onClick}>
            <span className={styles.icon}></span>
        </button>
    );
}