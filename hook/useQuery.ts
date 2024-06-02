'use client';

import { useFetch } from './useFetch';
import { useEffect, useState } from 'react';

type TQuery<TData> = {
  url: string;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
};

export function useQuery<TData>({
  url,
  enabled = true,
  onSuccess = () => {},
}: TQuery<TData>) {
  const { onFetch, isFetching: isQuerying } = useFetch<TData>();

  const onQuery = (): void => {
    onFetch({ url, showToast: false }).then((res) => onSuccess(res));
  };

  useEffect(() => {
    if (enabled) onQuery();
  }, [enabled]);

  return { onQuery, isQuerying };
}
