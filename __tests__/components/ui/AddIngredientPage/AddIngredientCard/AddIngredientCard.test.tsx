import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import AddIngredientCard from '@/components/ui/AddIngredientPage/AddIngredientCard/AddIngredientCard';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AddIngredientCard />
            </PersistGate>
        </Provider>
    );
}

describe('Add Ingredient Card', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('add-ingredient-card');
        expect(element);
    });
});