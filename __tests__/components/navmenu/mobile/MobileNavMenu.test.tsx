import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import MobileNavMenu from '@/components/navmenu/mobile/MobileNavMenu';

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
                <MobileNavMenu />
            </PersistGate>
        </Provider>
    );
}

describe('Mobile Nav Menu', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('navigation');
        expect(element);
    })
})