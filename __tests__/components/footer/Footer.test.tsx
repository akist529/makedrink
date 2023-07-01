import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import Footer from '@/components/footer/Footer';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Footer />
            </PersistGate>
        </Provider>
    );
}

describe('Footer', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByText(/MakeDrink/i);
        expect(element);
    });
});