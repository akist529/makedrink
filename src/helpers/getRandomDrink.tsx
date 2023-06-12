// Type interfaces
import { DrinkDict, DrinkInfo } from '@/types/index';

export default function getRandomDrink (possibleDrinks: DrinkDict, randomDrink: DrinkInfo) {
    const keyLength = Object.keys(possibleDrinks).length;

    if (!keyLength) {
        return null;
    }

    const key = Object.keys(possibleDrinks)[Math.floor(Math.random() * keyLength)];
    const index = Math.floor(Math.random() * possibleDrinks[key].length);
    const drink = possibleDrinks[key][index];

    if (drink !== randomDrink) {
        return drink;
    } else {
        getRandomDrink(possibleDrinks, randomDrink);
    }
}