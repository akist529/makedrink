import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DesktopNavMenu from '@/components/navmenu/desktop/DesktopNavMenu';

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
                <DesktopNavMenu />
            </PersistGate>
        </Provider>
    );
}

describe('Desktop Nav Menu', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('navigation');
        expect(element);
    })
})