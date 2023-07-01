import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { useCallback } from 'react';
import MakeDrinkLink from '@/components/links/MakeDrinkLink/MakeDrinkLink';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Link clicked');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MakeDrinkLink 
                    onClick={handleClick} />
            </PersistGate>
        </Provider>
    );
}

describe('Make Drink Link', () => {
    it('renders correctly', () => {
        render(<Component />);
        const text = screen.getByText('Make A Drink!');
        expect(text);
    });
});