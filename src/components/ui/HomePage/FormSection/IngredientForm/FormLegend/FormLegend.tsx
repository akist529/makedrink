// Component styles
import styles from './FormLegend.module.scss';
// React components
import { useCallback } from 'react';

export default function FormLegend (props: { ingredientType: string, setFormOpen: Function }) {
    const { ingredientType, setFormOpen } = props;

    const toggleForm = useCallback((e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        e.preventDefault();
        setFormOpen((prevState: boolean) => !prevState);
    }, [setFormOpen]);

    return (
        <legend data-testid='form-legend' className={styles.FormLegend}>
            <button
                title='Close Form Field'
                onClick={toggleForm}
            >{ingredientType}</button>
        </legend>
    );
}