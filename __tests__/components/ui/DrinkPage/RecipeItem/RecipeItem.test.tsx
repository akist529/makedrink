import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import RecipeItem from '@/components/ui/DrinkPage/RecipeItem/RecipeItem';

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
                <RecipeItem 
                    ingredient={mockItem} 
                    missing={true} 
                    unit='oz' 
                    amount={2} 
                    prefers='Cognac' />
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