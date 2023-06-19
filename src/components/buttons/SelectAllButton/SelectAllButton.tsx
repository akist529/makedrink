import styles from './SelectAllButton.module.scss';

export default function SelectAllButton (props: { clickEvent: Function }) {
    const { clickEvent } = props;

    return (
        <button className={styles.SelectAllButton} onClick={e => clickEvent(e)}>
            <span>Select All</span>
        </button>
    );
}