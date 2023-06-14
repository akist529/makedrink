import { Item } from '@/types/index';

export default function getItemName (item: Item) {
    switch (item.Name) {
        case 'Maraschino':
            return 'Maraschino Liqueur';
        case 'Angostura':
            return 'Angostura Bitters';
        case 'Blended':
            return 'Blended Whiskey';
        case 'Aged':
            return 'Aged Rum';
        case 'London Dry':
            return 'London Dry Gin';
        case 'Silver':
            return 'Silver Tequila';
        case 'Reposado':
            return 'Reposado Tequila';
        case 'Orange':
            return 'Orange Bitters';
        case 'Kahlua':
            return 'Kahlua Coffee Liqueur';
        case 'Blanco':
            return 'Blanco Tequila';
        case 'Galliano':
            return 'Galliano Herbal Liqueur';
        case 'Peychaud':
            return 'Peychaud Bitters';
        case 'Benedictine':
            return 'Benedictine Herbal Liqueur';
        case 'Bourbon':
            return 'Bourbon Whiskey';
        case 'Apple Flavored Bourbon':
            return 'Apple Flavored Bourbon Whiskey';
        case 'Amaretto':
            return 'Amaretto Almond Liqueur';
        case 'Midori':
            return 'Midori Melon Liqueur';
        case 'Chambord':
            return 'Chambord Raspberry Liqueur';
        default:
            return item.Name;
    }
}