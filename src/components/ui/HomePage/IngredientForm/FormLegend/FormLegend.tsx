import styles from './FormLegend.module.scss';
import Image from 'next/image';

export default function FormLegend (props: { ingredientType: string, setFormOpen: Function }) {
    const { ingredientType, setFormOpen } = props;

    function toggleForm (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setFormOpen((prevState: boolean) => !prevState);
    }

    return (
        <legend className={styles.FormLegend}>
            <button onClick={toggleForm}>
                <span>{ingredientType}</span>
                <Image 
                    alt='Close Form Field' 
                    src={require('/public/images/ui/expand_more.svg')} />
            </button>
        </legend>
    );
}