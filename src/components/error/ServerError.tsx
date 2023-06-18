// Component styles
import styles from './ServerError.module.scss';

export default function ServerError () {
    return (
        <div className={styles.ServerError}>
            <strong>Error!</strong>
            <em>There is an issue with the server. Please try again later.</em>
        </div>
    );
}