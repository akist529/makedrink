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
            name: "Whiskey",
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
            name: "Scotch Whiskey",
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
        },
        {
            name: "Bourbon",
            color: "#BA6F1E"
        },
        {
            name: "White Rum",
            color: "#bfc0ee"
        },
        {
            name: "Dark Rum",
            color: "#44362C"
        },
        {
            name: "Whipped Cream Vodka",
            color: "#bfc0ee"
        },
        {
            name: "Blended",
            color: "#BA6F1E"
        },
        {
            name: "Aged",
            color: "#44362C"
        },
        {
            name: "London Dry",
            color: "#d8e4bc"
        },
        {
            name: "Silver",
            color: "#F4D2AB"
        },
        {
            name: "Reposado",
            color: "#F4D2AB"
        },
        {
            name: "Apple Flavored Bourbon",
            color: "#BA6F1E"
        },
        {
            name: "Spiced Rum",
            color: "#44362C"
        },
        {
            name: "Blanco",
            color: "#F4D2AB"
        },
        {
            name: "Navy Rum",
            color: "#44362C"
        },
        {
            name: "Rye Whiskey",
            color: "#BA6F1E"
        },
        {
            name: "Irish Whiskey",
            color: "#BA6F1E"
        },
        {
            name: "Anejo Tequila",
            color: "#F4D2AB"
        },
        {
            name: "Vanilla Vodka",
            color: "#bfc0ee"
        }
    ]

    const liqueurs = [
        {
            name: "Almond Liqueur",
            color: "#EADDCA"
        },
        {
            name: "Banana",
            color: "#ffe135"
        },
        {
            name: "Cherry Liqueur",
            color: "#D2042D"
        },
        {
            name: "Chocolate Liqueur",
            color: "#7B3F00"
        },
        {
            name: "Coconut Liqueur",
            color: "#965a3e"
        },
        {
            name: "Coffee Liqueur",
            color: "#6F4E37"
        },
        {
            name: "Green Apple",
            color: "#8db600"
        },
        {
            name: "Herbal Liqueur",
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
            name: "Melon Liqueur",
            color: "#febaad"
        },
        {
            name: "Mint Liqueur",
            color: "#3EB489"
        },
        {
            name: "Orange Liqueur",
            color: "#FFA500"
        },
        {
            name: "Peach Liqueur",
            color: "#FFE5B4"
        },
        {
            name: "Plum",
            color: "#DDA0DD"
        },
        {
            name: "Raspberry Liqueur",
            color: "#E30B5C"
        },
        {
            name: "Sloe Berry Liqueur",
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
        },
        {
            name: "Blue Curacao",
            color: "#0000FF"
        },
        {
            name: "Cointreau",
            color: "#FFA500"
        },
        {
            name: "Chambord",
            color: "#E30B5C"
        },
        {
            name: "Amaretto",
            color: "#EADDCA"
        },
        {
            name: "Cherry Brandy",
            color: "#D2042D"
        },
        {
            name: "Grand Marnier",
            color: "#FFA500"
        },
        {
            name: "Benedictine",
            color: "#FFBF00"
        },
        {
            name: "Dark Creme De Cacao",
            color: "#5C4033"
        },
        {
            name: "Orange Curacao",
            color: "#FFA500"
        },
        {
            name: "Maraschino",
            color: "#D2042D"
        },
        {
            name: "Triple Sec",
            color: "#FFA500"
        },
        {
            name: "Midori",
            color: "#febaad"
        },
        {
            name: "Kahlua",
            color: "#6F4E37"
        },
        {
            name: "White Creme De Menthe",
            color: "#3EB489"
        },
        {
            name: "Galliano",
            color: "#FFBF00"
        },
        {
            name: "White Creme De Cacao",
            color: "#bfc0ee"
        },
        {
            name: "Green Creme De Menthe",
            color: "#3EB489"
        },
        {
            name: "Campari",
            color: "#FF0000"
        },
        {
            name: "Creme De Noyaux",
            color: "#EADDCA"
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
        },
        {
            name: "Orange Juice",
            color: "#FFA500"
        }
    ]

    const otherAlcohol = [
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
            name: "Dry Vermouth",
            color: "#FDFD96"
        },
        {
            name: "Sweet Vermouth",
            color: "#b11226"
        },
        {
            name: "Wine",
            color: "#722F37"
        },
        {
            name: "Sake",
            color: "#f9e8c0"
        },
        {
            name: "Angostura",
            color: "#FFA500"
        },
        {
            name: "Orange",
            color: "#FFA500"
        },
        {
            name: "Peychaud",
            color: "#FFA500"
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
            name: "Lemon-Lime Soda",
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

    const otherMixers = [
        {
            name: "Cream",
            color: "#FFFDD0"
        },
        {
            name: "Cream of Coconut",
            color: "#965a3e"
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
            name: "Water",
            color: "#bfc0ee"
        },
        {
            name: "Egg White",
            color: "#FFF5C3"
        },
        {
            name: "Heavy Cream",
            color: "#FFFDD0"
        },
        {
            name: "Vanilla Extract",
            color: "#F3E5AB"
        },
        {
            name: "Half & Half",
            color: "#FFFDD0"
        },
        {
            name: "Almond/Orgeat Syrup",
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
                <IngredientSection section={otherAlcohol} />
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
                <IngredientSection section={otherMixers} />
            </div>
        </div>
    )
}