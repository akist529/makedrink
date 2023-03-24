import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'

export default function IngredientsPage() {
    const spirits = ["Brandy", "Gin", "Rum", "Tequila", "Vodka", "Bourbon", "Absinthe", "Arak", "Baijiu", "Cocuy", "Guaro", "Moonshine", "Scotch", "Rye Whiskey", "Cynar", "Soju", "Akvavit", "Trakal"]
    const liqueurs = ["Almond", "Banana", "Cherry", "Chocolate", "Coconut", "Coffee", "Cognac", "Green Apple", "Herbal", "Irish Cream", "Jagermeister", "Lychee", "Melon", "Mint", "Orange", "Peach", "Plum", "Raspberry", "Sloe-Berry", "Southern Comfort", "Strawberry", "Blackberry", "Lemon"]
    const juices = ["Apple Juice", "Cranberry Juice", "Grapefruit Juice", "Lemon Juice", "Lime Juice", "Pineapple Juice"]
    const other = ["Beer", "Bitters", "Champagne", "Cream", "Creme of Coconut", "Dry Vermouth", "Grenadine", "Lemonade", "Mint Sprig", "Simple Syrup", "Sweet Vermouth", "Water", "Wine", "Sake"]
    const carbonated = ["Cola", "Ginger Ale", "Ginger Beer", "Lemon-Lime", "Orange Soda", "Soda Water", "Tonic Water"]

    return (
        <div className={styles.IngredientsPage}>
            <h1>Pick Your Ingredients</h1>
            <div className="alcohol">
                <h2>Alcohol</h2>
                <IngredientCatBtn category="Spirits" />
                <IngredientSection section={spirits} />
                <IngredientCatBtn category="Liqueurs" />
                <IngredientSection section={liqueurs} />
                <IngredientCatBtn category="Other" />
                <IngredientSection section={other} />
            </div>
            <div className="mixers">
                <h2>Mixers</h2>
                <IngredientCatBtn category="Carbonated" />
                <IngredientSection section={carbonated} />
                <IngredientCatBtn category="Juices" />
                <IngredientSection section={juices} />
                <IngredientCatBtn category="Other" />
            </div>
        </div>
    )
}