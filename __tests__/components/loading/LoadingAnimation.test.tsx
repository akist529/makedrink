import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import LoadingAnimation from '@/components/loading/LoadingAnimation';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <LoadingAnimation />
            </PersistGate>
        </Provider>
    );
}

describe('Loading Animation', () => {
    it('renders correctly', () => {
        render(<Component />);
        const text = screen.getByAltText('Loading');
        expect(text);
    });
});