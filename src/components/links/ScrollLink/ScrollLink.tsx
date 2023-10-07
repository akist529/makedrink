// Component styles
import styles from './ScrollLink.module.scss';

export default function ScrollLink (props: { link: string, text: string }) {
    const { link, text } = props;

    return (
        <a title={text} className={styles.ScrollLink} href={link}>
        </a>
    );
}