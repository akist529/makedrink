import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import ScrollLink from '@/components/links/ScrollLink/ScrollLink';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ScrollLink 
                    link='#drink' 
                    text='Go to Random Drink' />
            </PersistGate>
        </Provider>
    );
}

describe('Scroll Link', () => {
    it('renders correctly', () => {
        render(<Component />);
        const link = screen.getByRole('link');
        expect(link);
    });
});