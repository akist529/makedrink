import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import SearchBar from '@/components/search/SearchBar/SearchBar';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SearchBar />
            </PersistGate>
        </Provider>
    );
}

describe('Search Bar', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('searchbar');
        expect(element);
    });
});