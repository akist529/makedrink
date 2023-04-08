export interface Item {
    Id: number
    Name: string
    AliasId: number
    Type: string
}

export interface Ingredient {
    Name: string
    IsAlias: boolean
    Alias: string
    Amount: number
    Unit: string
}

export interface Recipe {
    Name: string
    Recipe: Ingredient[]
    Directions: string[]
}

export interface Drink {
    Id: number
    Name: string
    Recipe: Recipe[]
}