'use client';

import { TTask, TaskScheme } from '@/app/(task)/type';
import { useMutate, useQuery } from '@/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from '@nextui-org/react';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

const status = [
  { id: 'WAITING', status: 'Aguardando' },
  { id: 'IN_PROGRESS', status: 'Em andamento' },
  { id: 'DONE', status: 'Concluído' },
  { id: 'CANCELED', status: 'Cancelado' },
];

export function TaskForm({ id }: { id?: string }) {
  const { isMutating, onMutate } = useMutate<TTask>({
    url: '/api/task',
    idName: 'id',
    replaceRoute: true,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(TaskScheme),
  });

  const { isQuerying } = useQuery<TTask>({
    url: `/api/task/${id}`,
    enabled: Boolean(id),
    onSuccess: (data) => reset(data),
  });

  const disabled = isQuerying || isMutating;

  return (
    <form onSubmit={handleSubmit(onMutate)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              className="flex-2"
              variant="bordered"
              label="Nome"
              isDisabled={disabled}
              isInvalid={Boolean(errors.name)}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              defaultItems={status}
              isClearable={false}
              label="Status"
              variant="bordered"
              className="w-full"
              isDisabled={disabled}
              selectedKey={value?.id}
              onSelectionChange={(id) => {
                const newValue = status.find((item) => item.id === id);

                if (newValue) {
                  onChange(newValue);
                }
              }}
              isInvalid={Boolean(errors.status)}
              errorMessage={errors.status?.message}
            >
              {(status) => (
                <AutocompleteItem key={status.id}>
                  {status.status}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              defaultItems={status}
              isClearable={false}
              label="Status"
              variant="bordered"
              className="w-full"
              isDisabled={disabled}
              selectedKey={value?.id}
              onSelectionChange={(id) => {
                const newValue = status.find((item) => item.id === id);

                if (newValue) {
                  onChange(newValue);
                }
              }}
              isInvalid={Boolean(errors.status)}
              errorMessage={errors.status?.message}
            >
              {(status) => (
                <AutocompleteItem key={status.id}>
                  {status.status}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />
      </div>

      <Controller
        control={control}
        name="link"
        render={({ field }) => (
          <Input
            {...field}
            variant="bordered"
            label="Link do artefato"
            isDisabled={disabled}
            isInvalid={Boolean(errors.link)}
            errorMessage={errors.link?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            variant="bordered"
            label="Descrição"
            isDisabled={disabled}
            isInvalid={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
        )}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          color="primary"
          variant="shadow"
          isLoading={disabled}
          startContent={<Save size={20} />}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
