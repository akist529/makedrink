import styles from './IngredientModal.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { toggleIngredientModal } from '@/store/slices/ingredientModal.slice'

export default function IngredientModal() {
    const { ingredientModalOpen, modalIngredient } = useSelector((state: RootState) => state.ingredientModal)
    const dispatch = useDispatch()

    return (
        <>
            { ingredientModalOpen && <div className={styles.background}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <button onClick={() => dispatch(toggleIngredientModal())}>
                            <Image alt="Close Modal" src={require('/public/images/ui/close.svg')} />
                        </button>
                        <span>{modalIngredient['Name']}</span>
                        <Image alt={modalIngredient['Name']} src={require(`/public/images/ui/${modalIngredient['Name'].toLowerCase().split(' ').join('-').replace('/', '-')}.webp`)} />
                    </div>
                </div>
            </div> }
        </>
    )
}