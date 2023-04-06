import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import Image from 'next/image'
import { Item } from '@/types/index'
import { useGetAllIngredientsQuery } from '@/store/api/api'

export default function IngredientsPage() {
    const { data, isLoading, error } = useGetAllIngredientsQuery()

    return (
        <>
            { data && <div className={styles.IngredientsPage}>
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
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === 'liquor')}
                    />
                    <IngredientCatBtn category="Liqueurs" color="green" />
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === 'liqueur')}
                    />
                    <IngredientCatBtn category="Other" color="red" />
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === ('other') || ingredient['Type'] === ('wine'))}
                    />
                </div>
                <div>
                    <div className={styles.category}>
                        <h2>Mixers</h2>
                        <Image alt="Mixers" src={require('/public/images/ui/shaker.webp')} height="64" />
                    </div>
                    <IngredientCatBtn category="Carbonated" color="yellow" />
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === 'carbonated')}
                    />
                    <IngredientCatBtn category="Juices" color="orange" />
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === 'juice')}
                    />
                    <IngredientCatBtn category="Other" color="blue" />
                    <IngredientSection
                        section={(data as Item[]).filter((ingredient: Item) => ingredient['Type'] === 'mixer')}
                    />
                </div>
            </div> }
            { isLoading && <h1>Loading...</h1> }
            { error && <h1>Error!</h1> }
        </>
    )
}

/*
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
*/