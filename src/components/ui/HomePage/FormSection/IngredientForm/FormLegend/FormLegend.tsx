// Component styles
import styles from './FormLegend.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
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
            <button onClick={toggleForm}>
                <span>{ingredientType}</span>
                <Image 
                    alt='Close Form Field' 
                    src={require('/public/images/ui/expand_more.svg')} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
        </legend>
    );
}