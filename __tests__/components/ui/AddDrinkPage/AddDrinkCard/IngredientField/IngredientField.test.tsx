import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { useCallback } from 'react';
import IngredientField from '@/components/ui/AddDrinkPage/AddDrinkCard/IngredientField/IngredientField';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log("Direction removed");
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IngredientField 
                    i={0} 
                    ingredients={[]} 
                    removeIngredient={handleClick} />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient Field', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    });
});