import { useFetch } from './useFetch';

type TDelete<TData> = {
  url: string;
  onSuccess?: (data: TData) => void;
};

export function useDelete<TData>({
  url,
  onSuccess = () => {},
}: TDelete<TData>) {
  const { onFetch, isFetching: isDeleting } = useFetch<TData>();

  const onDelete = (): void => {
    onFetch({ url, method: 'DELETE' }).then((res) => onSuccess(res));
  };

  return { onDelete, isDeleting };
}
