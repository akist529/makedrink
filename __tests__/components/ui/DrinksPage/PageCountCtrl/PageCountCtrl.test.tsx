import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PageCountCtrl />
            </PersistGate>
        </Provider>
    );
}

describe('Page Count Controls', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByTestId('page-count-ctrl');
        expect(element);
    });
});