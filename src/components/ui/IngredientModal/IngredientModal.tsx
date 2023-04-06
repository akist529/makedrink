import styles from './IngredientModal.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function IngredientModal() {
    const { ingredientModalOpen, modalIngredientID } = useSelector((state: RootState) => state.ingredientModal)

    return (
        <>
            { ingredientModalOpen && <div className={styles.background}>
                <div className={styles.modal}>
                    <span>{modalIngredientID}</span>
                </div>
            </div> }
        </>
    )
}