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
    A?: Item[];
    B?: Item[];
    C?: Item[];
    D?: Item[];
    E?: Item[];
    F?: Item[];
    G?: Item[];
    H?: Item[];
    I?: Item[];
    J?: Item[];
    K?: Item[];
    L?: Item[];
    M?: Item[];
    N?: Item[];
    O?: Item[];
    P?: Item[];
    Q?: Item[];
    R?: Item[];
    S?: Item[];
    T?: Item[];
    U?: Item[];
    V?: Item[];
    W?: Item[];
    X?: Item[];
    Y?: Item[];
    Z?: Item[];
}

export interface Dictionary {
    liquor?: Type;
    liqueur?: Type;
    other?: Type;
    wine?: Type;
    carbonated?: Type;
    juice?: Type;
    mixer?: Type;
}