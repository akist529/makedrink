import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DrinkTypes from '@/components/ui/HomePage/DrinkTypes/DrinkTypes';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Drink type changed');
    }, []);

    const handleError = useCallback(() => {
        console.log('Error message displayed');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DrinkTypes 
                    drinkType='cocktail' 
                    setDrinkType={handleClick} 
                    drinkError='error' 
                    setDrinkError={handleError} />
            </PersistGate>
        </Provider>
    );
}

describe('Drink Type Buttons', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('navigation');
        expect(element);
    });
});