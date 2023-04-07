// Component styles
import styles from './IngredientModal.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleIngredientModal } from '@/store/slices/ingredientModal.slice'
import { useGetAllIngredientsQuery } from '@/store/api/api'
// Local components
import Ingredient from '@/components/ui/Ingredient/Ingredient'
// Type interfaces
import { Item } from '@/types/index'

export default function IngredientModal() {
    const { ingredientModalOpen, modalIngredient } = useSelector((state: RootState) => state.ingredientModal)
    const dispatch = useDispatch()
    const { data, isLoading, error } = useGetAllIngredientsQuery()

    return (
        <>
            { ingredientModalOpen && data && <div className={styles.background}>
                <div className={styles.modal}>
                    <button onClick={() => dispatch(toggleIngredientModal())}>
                        <Image alt="Close Modal" src={require('/public/images/ui/close.svg')} />
                    </button>
                    <div className={styles.header}>
                        <span>{modalIngredient['Name']}</span>
                        <Image alt={modalIngredient['Name']} src={require(`/public/images/ui/${modalIngredient['Name'].toLowerCase().split(' ').join('-').replace('/', '-')}.webp`)} />
                    </div>
                    <div className={styles.childList}>
                        { data.filter((ingredient: Item) => ingredient['AliasId'] === modalIngredient['Id'])
                            .map(ingredient => <Ingredient item={ingredient} section={[]} key={ingredient['Id']} />) }
                    </div>
                </div>
            </div> }
            { isLoading && <h1>Loading...</h1> }
            { error && <h1>Error!</h1> }
        </>
    )
}