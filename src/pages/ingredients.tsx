import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import Image from 'next/image'

export default function IngredientsPage() {
    const spirits = [
        {
            name: "Brandy",
            color: "#87413f"
        },
        {
            name: "Gin",
            color: "#d8e4bc"
        },
        {
            name: "Rum",
            color: "#796989"
        },
        {
            name: "Tequila",
            color: "#F4D2AB"
        },
        {
            name: "Vodka",
            color: "#bfc0ee"
        },
        {
            name: "Bourbon",
            color: "#BA6F1E"
        },
        {
            name: "Absinthe",
            color: "#76b583"
        },
        {
            name: "Arak",
            color: "#bfc0ee"
        },
        {
            name: "Baijiu",
            color: "#bfc0ee"
        },
        {
            name: "Cocuy",
            color: "#FFBF00"
        },
        {
            name: "Guaro",
            color: "#bfc0ee"
        },
        {
            name: "Moonshine",
            color: "D7D6CE"
        },
        {
            name: "Scotch",
            color: "CC8E69"
        },
        {
            name: "Rye Whiskey",
            color: "38573D"
        },
        {
            name: "Cynar",
            color: "#5C4033"
        },
        {
            name: "Soju",
            color: "#bfc0ee"
        },
        {
            name: "Akvavit",
            color: "#FDFD96"
        },
        {
            name: "Trakal",
            color: "bfc0ee"
        }
    ]

    const liqueurs = ["Almond", "Banana", "Cherry", "Chocolate", "Coconut", "Coffee", "Cognac", "Green Apple", "Herbal", "Irish Cream", "Jagermeister", "Lychee", "Melon", "Mint", "Orange", "Peach", "Plum", "Raspberry", "Sloe-Berry", "Southern Comfort", "Strawberry", "Blackberry", "Lemon"]
    const juices = ["Apple Juice", "Cranberry Juice", "Grapefruit Juice", "Lemon Juice", "Lime Juice", "Pineapple Juice"]
    const other = ["Beer", "Bitters", "Champagne", "Cream", "Creme of Coconut", "Dry Vermouth", "Grenadine", "Lemonade", "Mint Sprig", "Simple Syrup", "Sweet Vermouth", "Water", "Wine", "Sake"]
    const carbonated = ["Cola", "Ginger Ale", "Ginger Beer", "Lemon-Lime", "Orange Soda", "Soda Water", "Tonic Water"]

    return (
        <div className={styles.IngredientsPage}>
            <div>
                <h1>
                    <span>Select</span>
                    <span>Ingredients</span>
                    <Image alt='Select Ingredients' src={require('/public/images/ui/arrow_left.svg')} width='128' height='128' />
                </h1>
            </div>
            <div className={styles.alcohol}>
                <h2>Alcohol</h2>
                <IngredientCatBtn category="Spirits" color="pink" />
                <IngredientSection section={spirits} />
                <IngredientCatBtn category="Liqueurs" color="green" />
                <IngredientSection section={liqueurs} />
                <IngredientCatBtn category="Other" color="red" />
                <IngredientSection section={other} />
            </div>
            <div className={styles.mixers}>
                <h2>Mixers</h2>
                <IngredientCatBtn category="Carbonated" color="yellow" />
                <IngredientSection section={carbonated} />
                <IngredientCatBtn category="Juices" color="orange" />
                <IngredientSection section={juices} />
                <IngredientCatBtn category="Other" color="blue" />
            </div>
        </div>
    )
}