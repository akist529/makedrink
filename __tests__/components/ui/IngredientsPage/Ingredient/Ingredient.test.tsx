import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';

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
                <Ingredient 
                    item={mockItem} 
                    section={[]} />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    });
});