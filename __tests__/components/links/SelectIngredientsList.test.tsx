import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import SelectIngredientsLink from '@/components/links/SelectIngredientsLink/SelectIngredientsLink';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SelectIngredientsLink />
            </PersistGate>
        </Provider>
    );
}

describe('Select Ingredients List', () => {
    it('renders correctly', () => {
        render(<Component />);
        const text = screen.getByText('Select Your Ingredients');
        expect(text);
    });
});