import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';

const Component = () => {
    const mockDrink = ({
        "Name":"Rum and Tonic",
        "Recipe":[
            {
                "Name":"Dark Rum",
                "IsAlias":true,
                "Alias":"Rum",
                "Amount":2,
                "Unit":"ounce"
            },
            {
                "Name":"Tonic Water",
                "IsAlias":false,
                "Alias":"",
                "Amount":5,
                "Unit":"ounce"
            }
        ],
        "Directions":
        [
            "Fill your highball glass with ice",
            "Pour the rum directly into the glass",
            "Top off the glass with tonic water",
            "Lastly, garnish your cocktail with a lime wedge"
        ]
    });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DrinkCard 
                    drink={mockDrink} 
                    isRandom={true} 
                    ingredients={[]} />
            </PersistGate>
        </Provider>
    );
}

describe('Drink Card', () => {
    it('renders correctly', () => {
        render(<Component />);
        const element = screen.getByRole('article');
        expect(element);
    });
});