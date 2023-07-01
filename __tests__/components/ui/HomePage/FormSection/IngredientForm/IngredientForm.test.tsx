import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import IngredientForm from '@/components/ui/HomePage/FormSection/IngredientForm/IngredientForm';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IngredientForm 
                    ingredientType='liquor' />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient Form', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('ingredient-form');
        expect(element);
    });
});