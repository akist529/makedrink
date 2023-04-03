import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import Image from 'next/image'
import ingredientsData from '@/data/IngredientsData'

export default function IngredientsPage() {
    return (
        <div className={styles.IngredientsPage}>
            <div>
                <h1>
                    <div>
                        { 'Select'.split('').map((letter, index) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        }) }
                    </div>
                    <div>
                        { 'Ingredients'.split('').map((letter, index) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        }) }
                    </div>
                    <Image alt='Select Ingredients' src={require('/public/images/ui/local_bar.svg')} width='64' height='64' />
                </h1>
            </div>
            <div>
                <div className={styles.category}>
                    <h2>Alcohol</h2>
                    <Image alt="Alcohol" src={require('/public/images/ui/drunk.webp')} width="64" />
                </div>
                <IngredientCatBtn category="Spirits" color="pink" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Spirit')} />
                <IngredientCatBtn category="Liqueurs" color="green" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Liqueur')} />
                <IngredientCatBtn category="Other" color="red" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Other Alcohol')} />
            </div>
            <div>
                <div className={styles.category}>
                    <h2>Mixers</h2>
                    <Image alt="Mixers" src={require('/public/images/ui/shaker.webp')} height="64" />
                </div>
                <IngredientCatBtn category="Carbonated" color="yellow" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Carbonated')} />
                <IngredientCatBtn category="Juices" color="orange" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Juice')} />
                <IngredientCatBtn category="Other" color="blue" />
                <IngredientSection section={ingredientsData.filter(ingredient => ingredient['Type'] === 'Other Mixer')} />
            </div>
        </div>
    )
}