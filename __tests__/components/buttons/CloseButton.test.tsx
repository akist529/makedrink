import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { useCallback } from 'react';
import CloseButton from '@/components/buttons/CloseButton/CloseButton';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CloseButton onClick={handleClick} text='' />
            </PersistGate>
        </Provider>
    );
}

describe('Close Button', () => {
    it ('renders correctly', () => {
        render(<Component />);
        const button = screen.getByRole('button');
        expect(button);
    });
});