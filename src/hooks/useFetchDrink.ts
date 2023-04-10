import { useGetDrinkInfoQuery } from '@/store/api/api'
import { useEffect } from 'react'

const useFetchDrink = (id: number) => {
    const { data, isLoading, error }= useGetDrinkInfoQuery(id)

    useEffect(() => {
        if (!isLoading) {
            return data
        }
    }, [isLoading])
}

export default useFetchDrink