export interface Item {
    Id: number;
    Name: string;
    AliasId: number;
    Type: string;
}

export interface Ingredient {
    Name: string;
    IsAlias: boolean;
    Alias: string;
    Amount: number;
    Unit: string;
}

export interface DrinkInfo {
    Name: string;
    Recipe: Ingredient[];
    Directions: string[];
}

export interface Drink {
    Id: number;
    Name: string;
}

export interface Type {
    [index: string]: Item[];
}

export interface IngredientDict {
    [index: string]: Type;
}

export interface DrinkDict {
    [index: string]: DrinkInfo[];
}

export interface DrinkQuery {
    Drinks: Drink[];
}