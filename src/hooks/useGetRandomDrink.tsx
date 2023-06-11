import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function useGetRandomDrink () {
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const keyLength = Object.keys(possibleDrinks).length;
    const key = Object.keys(possibleDrinks)[Math.floor(Math.random() * keyLength)];
    const index = Math.floor(Math.random() * possibleDrinks[key].length);
    return possibleDrinks[key][index];
}