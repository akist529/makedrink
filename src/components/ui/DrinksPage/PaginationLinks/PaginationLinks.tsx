// Page styles
import styles from './PaginationLinks.module.scss';
// Next components
import Image from 'next/image';

export default function PaginationLinks (props: { pageNums: string[], setFirstDrink: Function, setLastDrink: Function, activePage: number, setActivePage: Function }) {
    const { pageNums, setFirstDrink, setLastDrink, activePage, setActivePage } = props;

    function changePage (pages: string, index: number) {
        const firstNum = Number(pages.replaceAll(' ', '').split('-')[0]);
        const secondNum = Number(pages.replaceAll(' ', '').split('-')[1]);

        setFirstDrink(firstNum - 1);
        setLastDrink(secondNum - 1);
        setActivePage(index);
    }

    function setPageLeft () {
        setActivePage((prevState: number) => (prevState + 11 - 1) % 11);
    }

    function setPageRight () {
        setActivePage((prevState: number) => (prevState + 11 + 1) % 11);
    }

    return (
        <nav className={styles.PaginationLinks}>
            <button className={styles.PaginateBtn} onClick={setPageLeft}>
                <Image alt='Left' src={require('/public/images/ui/chevron_left.svg')} />
            </button>
            <ul>
                { pageNums.map((pages: string, index: number) => {
                    return (
                        <li key={index}>
                            <button className={(activePage === index) ? styles.activeBtn : ''} onClick={() => changePage(pages, index)}>
                                <span>{index + 1}</span>
                            </button>
                        </li>
                    );
                }) }
            </ul>
            <button className={styles.PaginateBtn} onClick={setPageRight}>
                <Image alt='Right' src={require('/public/images/ui/chevron_right.svg')} />
            </button>
        </nav>
    );
}