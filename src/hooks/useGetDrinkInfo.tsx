import { useGetDrinkInfoQuery } from '@/store/api/api';

export default function useGetDrinkInfo (props: { id: number }) {
    const { id } = props;

    const data = useGetDrinkInfoQuery().data || null;

    return data;
}