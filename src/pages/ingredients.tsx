import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import Image from 'next/image'
import axios from 'axios'
import { Item } from '@/types/index'

export default function IngredientsPage(props: { ingredientsData: Item[] }) {
    const { ingredientsData } = props

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
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'liquor')} />
                <IngredientCatBtn category="Liqueurs" color="green" />
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'liqueur')} />
                <IngredientCatBtn category="Other" color="red" />
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'other')} />
            </div>
            <div>
                <div className={styles.category}>
                    <h2>Mixers</h2>
                    <Image alt="Mixers" src={require('/public/images/ui/shaker.webp')} height="64" />
                </div>
                <IngredientCatBtn category="Carbonated" color="yellow" />
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'carbonated')} />
                <IngredientCatBtn category="Juices" color="orange" />
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'juice')} />
                <IngredientCatBtn category="Other" color="blue" />
                <IngredientSection section={ingredientsData.filter((ingredient: Item) => ingredient['Type'] === 'other')} />
            </div>
        </div>
    )
}

export async function getStaticProps () {
    let res = await axios.get('http://15.204.244.7:8585/ingredients')
    let ingredientsData: Item[] = res.data
    ingredientsData.forEach(item => {
        item["Color"] = 'whiskey'
    })
    return {
        props: {
            ingredientsData
        }
    }
}