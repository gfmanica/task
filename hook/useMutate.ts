'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useFetch } from './useFetch';

type TMutate<TData> = {
  url: string;
  replaceRoute?: boolean;
  idName?: keyof TData;
  onSuccess?: (data: TData) => void;
};

export function useMutate<TData>({
  url,
  replaceRoute,
  idName,
  onSuccess = () => {},
}: TMutate<TData>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { onFetch, isFetching: isMutating } = useFetch<TData>();

  const onMutate = (data: TData): void => {
    const id = idName ? data[idName] : null;
    const fetchUrl = id ? `${url}/${id}` : url;
    const method = id ? 'PUT' : 'POST';

    onFetch({
      url: fetchUrl,
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // Caso está criando um novo registro e
      // queira redirecionar e
      // possui o nome do campo de id, redireciona
      if (method === 'POST' && replaceRoute && idName) {
        replace(`${pathname}/${res[idName]}`);
      }

      onSuccess(res);
    });
  };

  return { onMutate, isMutating };
}
