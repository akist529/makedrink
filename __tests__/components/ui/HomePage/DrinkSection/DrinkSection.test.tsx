import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DrinkSection from '@/components/ui/HomePage/DrinkSection/DrinkSection';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DrinkSection />
            </PersistGate>
        </Provider>
    );
}

describe('Drink Section', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('drink-section');
        expect(element);
    });
});