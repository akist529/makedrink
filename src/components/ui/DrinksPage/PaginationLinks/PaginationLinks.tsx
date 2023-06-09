// Page styles
import styles from './PaginationLinks.module.scss';
// React components
import { useEffect } from 'react';
// Next components
import Image from 'next/image';
// Type imports
import { Drink, DrinkInfo } from '@/types/index';

export default function PaginationLinks (props: { activePage: number, setActivePage: Function, numOfPages: number, loadState: boolean }) {
    const { activePage, setActivePage, numOfPages, loadState } = props;

    function changePage (index: number) {
        if (!loadState) {
            setActivePage(index);
        }
    }

    function setPageLeft () {
        if (!loadState) {
            setActivePage((prevState: number) => (prevState + numOfPages - 1) % numOfPages);
        }
    }

    function setPageRight () {
        if (!loadState) {
            setActivePage((prevState: number) => (prevState + numOfPages + 1) % numOfPages);
        }
    }

    return (
        <nav className={styles.PaginationLinks}>
            <button className={styles.PaginateBtn} onClick={setPageLeft}>
                <Image alt='Left' src={require('/public/images/ui/chevron_left.svg')} />
            </button>
            <ul>
                { (() => {
                    const arr = [];

                    for (let i = 0; i < numOfPages; i++) {
                        arr.push(
                            <li key={i}>
                                <button className={(activePage === i) ? styles.activeBtn : ''} onClick={() => changePage(i)}>
                                    <span>{i + 1}</span>
                                </button>
                            </li>
                        );
                    }

                    return arr;
                })() }
            </ul>
            <button className={styles.PaginateBtn} onClick={setPageRight}>
                <Image alt='Right' src={require('/public/images/ui/chevron_right.svg')} />
            </button>
        </nav>
    );
}