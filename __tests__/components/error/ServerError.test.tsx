import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import ServerError from '@/components/error/ServerError';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ServerError />
            </PersistGate>
        </Provider>
    );
}

describe('Server Error', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByText('Error!');
        expect(element);
    });
});