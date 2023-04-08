// Redux components
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Type interfaces
import { Item } from '@/types/index'

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://15.204.244.7:8585"}),
    endpoints: (builder) => ({
        getAllIngredients: builder.query<Item[],void>({
            query: () => "/ingredients"
        })
    })
})

export const { useGetAllIngredientsQuery } = ingredientsApi