import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import LandingSection from '@/components/ui/HomePage/LandingSection/LandingSection';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Drink type changed');
    }, []);

    const handleError = useCallback(() => {
        console.log('Drink error changed');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <LandingSection 
                    drinkType='cocktail' 
                    setDrinkType={handleClick} 
                    drinkError='error' 
                    setDrinkError={handleError} />
            </PersistGate>
        </Provider>
    );
}

describe('Landing Section', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('landing-section');
        expect(element);
    });
});