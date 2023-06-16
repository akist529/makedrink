// Component styles
import styles from './PageCountCtrl.module.scss';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { setDrinksPerPage } from '@/store/slices/drinks.slice';
import { RootState } from '@/store/store';

export default function PageCountCtrl () {
    const drinksPerPage = useSelector((state: RootState) => state.drinks.drinksPerPage);
    const dispatch = useDispatch();

    return (
        <div className={styles.PageCountCtrl}>
            <span>Results per Page</span>
            <button className={(drinksPerPage === 10) ? styles.active : ""} onClick={() => dispatch(setDrinksPerPage(10))}>
                <span>10</span>
            </button>
            <button className={(drinksPerPage === 20) ? styles.active : ""} onClick={() => dispatch(setDrinksPerPage(20))}>
                <span>20</span>
            </button>
            <button className={(drinksPerPage === 30) ? styles.active : ""} onClick={() => dispatch(setDrinksPerPage(30))}>
                <span>30</span>
            </button>
        </div>
    );
}