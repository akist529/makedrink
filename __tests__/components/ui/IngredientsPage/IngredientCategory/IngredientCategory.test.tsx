import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import IngredientCategory from '@/components/ui/IngredientsPage/IngredientCategory/IngredientCategory';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Clicked');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IngredientCategory 
                    category='liquor' 
                    color='red' 
                    clickEvent={handleClick} 
                    ingredients={[]} />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient Category', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('ingredient-category');
        expect(element);
    });
});