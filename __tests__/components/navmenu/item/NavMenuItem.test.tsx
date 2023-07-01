import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        pathname: ''
      };
    },
  }));

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavMenuItem 
                    item='Make A Drink' 
                    img='liquor.svg' 
                    link='/' />
            </PersistGate>
        </Provider>
    );
}

describe('Nav Menu Item', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('listitem');
        expect(element);
    })
})