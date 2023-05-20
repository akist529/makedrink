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
        getAllDrinks: builder.query<any,void>({
            query: () => "/drinks"
        }),
        getDrinkInfo: builder.query<DrinkInfo,number>({
            query: (id) => `/drink/${id}`
        }),
        getMultipleDrinkInfo: builder.query<DrinkInfo[],number[]>({
            async queryFn(arg, queryApi, extraOptions, baseQuery) {
                const ids = arg;;
                const info: DrinkInfo[] = [];

                for (const id of ids) {
                    const drinkData = await baseQuery(`/drink/${id}`);

                    if (drinkData.error) {
                        console.log('multipleDrinksQuery', drinkData.error);
                    } else {
                        info.push(drinkData.data as DrinkInfo);
                    }
                }

                return ({
                    data: info
                })
            }
        }),
        getAllDrinkInfo: builder.query<DrinkInfo[],void>({
            async queryFn(arg, queryApi, extraOptions, baseQuery) {
                const allDrinkInfo: DrinkInfo[] = [];

                const allDrinksQuery = await baseQuery('/drinks');

                if (allDrinksQuery.error) {
                    console.log('allDrinksQuery', allDrinksQuery.error);
                } else {
                    const allDrinksData = allDrinksQuery.data as any;
                    const allDrinks: Drink[] = allDrinksData.Drinks as Drink[];
                    
                    for (const drink of allDrinks) {
                        const drinkInfoQuery = await baseQuery(`/drink/${drink.Id}`);
                        
                        if (drinkInfoQuery.error) {
                            console.log('drinkInfoQuery', drinkInfoQuery.error);
                        } else {
                            const drinkInfo = drinkInfoQuery.data as DrinkInfo;
                            allDrinkInfo.push(drinkInfo);
                        }
                    }
                }

                return ({
                    data: allDrinkInfo
                });
            }
        })
    })
})

export const { useGetAllIngredientsQuery, useGetAllDrinksQuery, useLazyGetDrinkInfoQuery, useGetMultipleDrinkInfoQuery, useLazyGetMultipleDrinkInfoQuery, useGetAllDrinkInfoQuery } = barApi