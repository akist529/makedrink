import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import SubCard from '@/components/ui/DrinkCard/SubCard/SubCard';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SubCard />
            </PersistGate>
        </Provider>
    );
}

describe('Sub Card', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('sub-card');
        expect(element);
    });
});