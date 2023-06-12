import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setRandomDrink } from '@/store/slices/drinks.slice';

export default function useGetRandomDrink () {
    const dispatch = useDispatch();
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const keyLength = Object.keys(possibleDrinks).length;
    const key = Object.keys(possibleDrinks)[Math.floor(Math.random() * keyLength)];
    const index = Math.floor(Math.random() * possibleDrinks[key].length);
    dispatch(setRandomDrink(possibleDrinks[key][index]));
}