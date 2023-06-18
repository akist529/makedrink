import { IngredientDict, Item } from '@/types/index';

export default function useFindItemAlias (data: IngredientDict, item: Item) {
    if (Object.keys(item).includes('Type')) {
        const type = item.Type || '';

        for (const key of Object.keys(data[type])) {
            return data[type][key].find((storedItem: Item) => (storedItem.Id === item.AliasId));
        }
    }
}