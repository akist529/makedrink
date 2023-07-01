import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import IngredientCheckbox from '@/components/ui/IngredientsPage/Ingredient/IngredientCheckbox/IngredientCheckbox';

const Component = () => {
    const mockItem = ({
        Id: 1,
        Name: "Brandy",
        AliasId: 0,
        Type: "liquor"
    });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IngredientCheckbox 
                    item={mockItem} 
                    isChecked={true} />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient Checkbox', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('ingredient-checkbox');
        expect(element);
    });
});