import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DrinkResult from '@/components/search/SearchFeed/DrinkResult/DrinkResult';

const mockDrink = ({
    Id: 0,
    Name: ''
});

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DrinkResult 
                    drink={mockDrink} 
                    link={`/drink/${mockDrink.Name}`} />
            </PersistGate>
        </Provider>
    );
}

describe('Drink Result', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    });
});