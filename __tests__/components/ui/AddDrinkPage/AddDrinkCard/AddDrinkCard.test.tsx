import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import AddDrinkCard from '@/components/ui/AddDrinkPage/AddDrinkCard/AddDrinkCard';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AddDrinkCard />
            </PersistGate>
        </Provider>
    );
}

describe('Add Drink Card', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('add-drink-card');
        expect(element);
    });
});