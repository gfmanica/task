'use client';

import { useMutate, useQuery } from '@/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Textarea,
} from '@nextui-org/react';
import { I18nProvider } from '@react-aria/i18n';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const TaskScheme = z.object({
  id: z.number().nullish(),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  link: z.string().url({ message: 'Link inválido' }).nullable(),
  expirationDate: z.date({ message: 'Data de expiração é obrigatória' }),
  status: z.object(
    {
      id: z.string(),
      status: z.string(),
    },
    { message: 'Status é obrigatório' },
  ),
});

type TTask = z.infer<typeof TaskScheme>;

const status = [
  { id: 'WAITING', status: 'Aguardando' },
  { id: 'IN_PROGRESS', status: 'Em andamento' },
  { id: 'DONE', status: 'Concluído' },
  { id: 'CANCELED', status: 'Cancelado' },
];

export function TaskForm({ id }: { id?: string }) {
  const { isMutating, onMutate } = useMutate<TTask>({
    url: '/api/user',
    idName: 'id',
    replaceRoute: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(TaskScheme),
  });

  const { isQuerying } = useQuery<TTask>({
    url: `/api/user/${id}`,
    enabled: Boolean(id),
    onSuccess: (data) => reset(data),
  });

  const disabled = isQuerying || isMutating;

  return (
    <form onSubmit={handleSubmit(onMutate)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          {...register('name')}
          className="flex-2"
          variant="bordered"
          label="Nome"
          isDisabled={disabled}
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
        />

        <I18nProvider locale="pt-BR">
          <DatePicker
            {...register('expirationDate')}
            className="flex-1"
            variant="bordered"
            label="Data de expiração"
            isDisabled={disabled}
            isInvalid={Boolean(errors.expirationDate)}
            errorMessage={errors.expirationDate?.message}
            onChange={(date) => {
              setValue('expirationDate', date.toDate('GMT-0') as Date);
            }}
          />
        </I18nProvider>

        <Autocomplete
          defaultItems={status}
          isClearable={false}
          label="Status"
          variant="bordered"
          className="max-w-xs"
          isDisabled={disabled}
          selectedKey={watch('status')?.id}
          onSelectionChange={(id) => {
            const newValue = status.find((item) => item.id === id);

            if (newValue) {
              setValue('status', newValue);
            }
          }}
          isInvalid={Boolean(errors.status)}
          errorMessage={errors.status?.message}
        >
          {(status) => (
            <AutocompleteItem key={status.id}>{status.status}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <Input
        {...register('link')}
        variant="bordered"
        label="Link do artefato"
        isDisabled={disabled}
        isInvalid={Boolean(errors.link)}
        errorMessage={errors.link?.message}
      />

      <Textarea
        {...register('description')}
        variant="bordered"
        label="Descrição"
        isDisabled={disabled}
        isInvalid={Boolean(errors.description)}
        errorMessage={errors.description?.message}
      />

      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={disabled}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
