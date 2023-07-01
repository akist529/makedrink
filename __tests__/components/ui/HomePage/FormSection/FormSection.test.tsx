import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import FormSection from '@/components/ui/HomePage/FormSection/FormSection';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <FormSection 
                    drinkType='cocktail' />
            </PersistGate>
        </Provider>
    );
}

describe('Form Section', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('form-section');
        expect(element);
    });
});