// Redux components
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Type interfaces
import { Item, Drink, DrinkInfo } from '@/types/index'

export const barApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://15.204.244.7:8585"}),
    endpoints: (builder) => ({
        getAllIngredients: builder.query<Item[],void>({
            query: () => "/ingredients"
        }),
        getAllDrinks: builder.query<Drink[],void>({
            query: () => "/drinks"
        }),
        getDrinkInfo: builder.query<DrinkInfo,void>({
            query: (id) => `/drink/${id}`
        })
    })
})

export const { useGetAllIngredientsQuery, useGetAllDrinksQuery, useGetDrinkInfoQuery } = barApi