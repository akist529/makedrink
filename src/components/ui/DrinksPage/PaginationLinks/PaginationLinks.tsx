// Page styles
import styles from './PaginationLinks.module.scss';

export default function PaginationLinks (props: { pageNums: string[], setFirstDrink: Function, setLastDrink: Function }) {
    const { pageNums, setFirstDrink, setLastDrink } = props;

    function changePage (pages: string) {
        const firstNum = Number(pages.replaceAll(' ', '').split('-')[0]);
        const secondNum = Number(pages.replaceAll(' ', '').split('-')[1]);

        setFirstDrink(firstNum - 1);
        setLastDrink(secondNum - 1);
    }

    return (
        <nav className={styles.PaginationLinks}>
            <ul>
                { pageNums.map((pages: string, index: number) => {
                    return (
                        <li key={index}>
                            <button className={styles.pageBtn} onClick={() => changePage(pages)}>
                                <span>{pages}</span>
                            </button>
                        </li>
                    );
                }) }
            </ul>
        </nav>
    )
}