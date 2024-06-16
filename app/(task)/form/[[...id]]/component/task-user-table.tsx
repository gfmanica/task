'use client';

import {
  CircularProgress,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@/hook';
import { TTask, TTaskUser } from '@/app/(task)/type';
import { TaskUserTableCell } from './task-user-table-cell';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

const columns = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'role',
    label: 'Papel',
  },
];

type TTaskUserTable = {
  setValue: UseFormSetValue<TTask>;
  watch: UseFormWatch<TTask>;
  isLoadingForm: boolean;
};

const getSelectedUsers = (
  ids: (string | number)[],
  rows: TTaskUser[],
): TTaskUser[] => {
  return ids.map((id) =>
    rows.find((item) => item.id === Number(id)),
  ) as TTaskUser[];
};

const getSetUserId = (users: TTaskUser[]): Set<string> => {
  return new Set(users.map((user) => String(user.id)));
};

export function TaskUserTable({
  setValue,
  watch,
  isLoadingForm,
}: TTaskUserTable) {
  const [rows, setRows] = useState<TTaskUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set([]));
  const { isQuerying } = useQuery<TTaskUser[]>({
    url: `/api/user`,
    onSuccess: (data) => setRows(data),
  });
  const isLoading = isQuerying || isLoadingForm;

  useEffect(() => {
    const users = watch('users');

    if (users?.length) {
      setSelectedUsers(getSetUserId(users));
    }
  }, [isLoadingForm]);

  return (
    <Table
      isStriped
      selectionMode="multiple"
      selectedKeys={selectedUsers}
      onSelectionChange={(keys) => {
        const users =
          keys === 'all' ? rows : getSelectedUsers(Array.from(keys), rows);

        setSelectedUsers(keys);

        setValue('users', users);
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={<CircularProgress />}
        emptyContent="Sem registros"
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <TaskUserTableCell item={item} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
