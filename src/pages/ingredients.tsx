import styles from '@/styles/Ingredients.module.scss'
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import Image from 'next/image'

export default function IngredientsPage() {
    const spirits = [
        {
            name: "Brandy",
            color: "#dcb68a"
        },
        {
            name: "Gin",
            color: "#d8e4bc"
        },
        {
            name: "Rum",
            color: "#9D702E"
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
            color: "#D7D6CE"
        },
        {
            name: "Scotch",
            color: "#CC8E69"
        },
        {
            name: "Rye Whiskey",
            color: "#CC8E69"
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
            color: "#bfc0ee"
        },
        {
            name: "Cognac",
            color: "#834333"
        }
    ]

    const liqueurs = [
        {
            name: "Almond",
            color: "#EADDCA"
        },
        {
            name: "Banana",
            color: "#ffe135"
        },
        {
            name: "Cherry",
            color: "#D2042D"
        },
        {
            name: "Chocolate",
            color: "#7B3F00"
        },
        {
            name: "Coconut",
            color: "#965a3e"
        },
        {
            name: "Coffee",
            color: "#6F4E37"
        },
        {
            name: "Green Apple",
            color: "#8db600"
        },
        {
            name: "Herbal",
            color: "#FFBF00"
        },
        {
            name: "Irish Cream",
            color: "#eed192"
        },
        {
            name: "Jagermeister",
            color: "#5C4033"
        },
        {
            name: "Lychee",
            color: "#dc5349"
        },
        {
            name: "Melon",
            color: "#febaad"
        },
        {
            name: "Mint",
            color: "#3EB489"
        },
        {
            name: "Orange",
            color: "#FFA500"
        },
        {
            name: "Peach",
            color: "#FFE5B4"
        },
        {
            name: "Plum",
            color: "#DDA0DD"
        },
        {
            name: "Raspberry",
            color: "#E30B5C"
        },
        {
            name: "Sloe-Berry",
            color: "#444065"
        },
        {
            name: "Southern Comfort",
            color: "#FFBF00"
        },
        {
            name: "Strawberry",
            color: "#fc5a8d"
        },
        {
            name: "Blackberry",
            color: "#32001B"
        },
        {
            name: "Lemon",
            color: "#FAFA33"
        }
    ]

    const juices = [
        {
            name: "Apple Juice",
            color: "#C7372F"
        },
        {
            name: "Cranberry Juice",
            color: "#D65589"
        },
        {
            name: "Grapefruit Juice",
            color: "#fd5956"
        },
        {
            name: "Lemon Juice",
            color: "#FAFA33"
        },
        {
            name: "Lime Juice",
            color: "#32CD32"
        },
        {
            name: "Pineapple Juice",
            color: "#FEEA63"
        }
    ]

    const other = [
        {
            name: "Beer",
            color: "#f28e1c"
        },
        {
            name: "Bitters",
            color: "#FFA500"
        },
        {
            name: "Champagne",
            color: "#F7E7CE"
        },
        {
            name: "Cream",
            color: "#FFFDD0"
        },
        {
            name: "Creme of Coconut",
            color: "#965a3e"
        },
        {
            name: "Dry Vermouth",
            color: "#FDFD96"
        },
        {
            name: "Grenadine",
            color: "#4c0b09"
        },
        {
            name: "Lemonade",
            color: "#f0e79d"
        },
        {
            name: "Mint Sprig",
            color: "#009C6E"
        },
        {
            name: "Simple Syrup",
            color: "#bfc0ee"
        },
        {
            name: "Sweet Vermouth",
            color: "#b11226"
        },
        {
            name: "Water",
            color: "#bfc0ee"
        },
        {
            name: "Wine",
            color: "#722F37"
        },
        {
            name: "Sake",
            color: "#f9e8c0"
        }
    ]

    const carbonated = [
        {
            name: "Cola",
            color: "#3c3024"
        },
        {
            name: "Ginger Ale",
            color: "#efd079"
        },
        {
            name: "Ginger Beer",
            color: "#c27f38"
        },
        {
            name: "Lemon-Lime",
            color: "#e3ff00"
        },
        {
            name: "Orange Soda",
            color: "#fa5b3d"
        },
        {
            name: "Soda Water",
            color: "#bfc0ee"
        },
        {
            name: "Tonic Water",
            color: "#bfc0ee"
        }
    ]

    return (
        <div className={styles.IngredientsPage}>
            <div>
                <h1>
                    <div>
                        { 'Select'.split('').map(letter => {
                            return (
                                <span key={letter}>{letter}</span>
                            )
                        }) }
                    </div>
                    <div>
                        { 'Ingredients'.split('').map(letter => {
                            return (
                                <span key={letter}>{letter}</span>
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
                <IngredientSection section={spirits} />
                <IngredientCatBtn category="Liqueurs" color="green" />
                <IngredientSection section={liqueurs} />
                <IngredientCatBtn category="Other" color="red" />
                <IngredientSection section={other} />
            </div>
            <div>
                <div className={styles.category}>
                    <h2>Mixers</h2>
                    <Image alt="Mixers" src={require('/public/images/ui/shaker.webp')} height="64" />
                </div>
                <IngredientCatBtn category="Carbonated" color="yellow" />
                <IngredientSection section={carbonated} />
                <IngredientCatBtn category="Juices" color="orange" />
                <IngredientSection section={juices} />
                <IngredientCatBtn category="Other" color="blue" />
            </div>
        </div>
    )
}