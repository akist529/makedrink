import styles from './IngredientModal.module.scss'

export default function IngredientModal(props: any) {
    const { type } = props

    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <span>{type}</span>
            </div>
        </div>
    )
}