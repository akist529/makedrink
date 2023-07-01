import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import SearchInput from '@/components/search/SearchInput/SearchInput';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SearchInput />
            </PersistGate>
        </Provider>
    );
}

describe('Search Input', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('searchinput');
        expect(element);
    });
});