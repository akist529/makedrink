import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Page changed');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaginationLinks 
                    activePage={1} 
                    setActivePage={handleClick} 
                    numOfPages={10} 
                    loadState={false} />
            </PersistGate>
        </Provider>
    );
}

describe('Pagination Links', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('navigation');
        expect(element);
    });
});