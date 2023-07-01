import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BurgerButton />
            </PersistGate>
        </Provider>
    );
}

describe('Burger Button', () => {
    it ('renders correctly', () => {
        render(<Component />);
        const button = screen.getByRole('button');
        expect(button);
    });
});