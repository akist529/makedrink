import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import ParentForm from '@/components/ui/HomePage/FormSection/IngredientForm/ParentForm/ParentForm';

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
                <ParentForm 
                    ingredient={mockItem} />
            </PersistGate>
        </Provider>
    );
}

describe('Parent Ingredient Form', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.findByRole('listitem');
        expect(element);
    });
});