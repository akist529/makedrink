import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import NavBar from '@/components/navbar/NavBar';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        pathname: '',
        // ... whatever else you you call on `router`
      };
    },
  }));

const Component = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavBar />
            </PersistGate>
        </Provider>
    );
}

describe('Nav Bar', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.findByRole('nav');
        expect(element);
    });
});