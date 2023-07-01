import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { useCallback } from 'react';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SearchButton 
                    onClick={handleClick} 
                    style={{color: 'red'}} />
            </PersistGate>
        </Provider>
    );
}

describe('Search Button', () => {
    it('renders correctly', () => {
        render(<Component />);
        const button = screen.getByRole('button');
        expect(button);
    });
});