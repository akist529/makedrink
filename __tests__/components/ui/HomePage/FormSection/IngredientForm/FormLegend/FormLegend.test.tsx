import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import FormLegend from '@/components/ui/HomePage/FormSection/IngredientForm/FormLegend/FormLegend';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Form opened / closed');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <FormLegend 
                    ingredientType='liquor' 
                    setFormOpen={handleClick} />
            </PersistGate>
        </Provider>
    );
}

describe('Ingredient Form Legend', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('form-legend');
        expect(element);
    });
});