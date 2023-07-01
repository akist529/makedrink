import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import SearchFeed from '@/components/search/SearchFeed/SearchFeed';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SearchFeed />
            </PersistGate>
        </Provider>
    );
}

describe('Search Feed', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('navigation');
        expect(element);
    });
});