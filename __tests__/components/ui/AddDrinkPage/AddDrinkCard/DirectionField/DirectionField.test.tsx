import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DirectionField from '@/components/ui/AddDrinkPage/AddDrinkCard/DirectionField/DirectionField';
import { useCallback } from 'react';

const Component = () => {
    const handleClick = useCallback(() => {
        console.log("Direction removed");
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DirectionField 
                    i={0} 
                    removeDirection={handleClick} />
            </PersistGate>
        </Provider>
    );
}

describe('Direction Field', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    });
});