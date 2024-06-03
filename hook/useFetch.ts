'use client';

import { TResponse } from '@/type';
import { useState } from 'react';
import { toast } from 'sonner';

type TFetch<TData> = {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
  showToast?: boolean;
};

export function useFetch<TData>() {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const onFetch = ({
    url,
    method,
    body,
    headers,
    showToast = true,
  }: TFetch<TData>): Promise<TData> => {
    setIsFetching(true);

    return new Promise((resolve, reject) => {
      fetch(url, { method, body, headers })
        .then((response) =>
          response.json().then((responseData: TResponse<TData>) => {
            const { data, message } = responseData;

            if (response.ok) {
              if (showToast && message) toast.success(message);

              resolve(data);
            } else {
              if (showToast && message) toast.error(message);

              reject();
            }
          }),
        )
        .catch(() => {
          const message = 'Falha ao realizar a requisição';

          if (showToast) toast.error(message);

          reject();
        })
        .finally(() => setIsFetching(false));
    });
  };

  return { onFetch, isFetching };
}
