import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import RecipeItem from '@/components/ui/DrinkCard/RecipeItem/RecipeItem';

const Component = () => {
    const mockItem = ({
        Id: 1,
        Name: "Brandy",
        AliasId: 0,
        Type: "liquor"
    });

    const mockIngredient = ({
        Name: "Cognac",
        IsAlias: true,
        Alias: "Brandy",
        Amount: 0.5,
        Unit: "ounce"
    });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RecipeItem 
                    ingredient={mockItem} 
                    isSub={true} 
                    preferred={mockIngredient} />
            </PersistGate>
        </Provider>
    );
}

describe('Recipe Item', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    });
});