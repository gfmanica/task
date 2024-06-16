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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useQuery } from '@/hook';
import { TTask, TTaskUser } from '@/app/(task)/type';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TaskUserTableCell } from '../form/[[...id]]/component/task-user-table-cell';

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
  users: TTaskUser[];
  setUsers: Dispatch<SetStateAction<TTaskUser[]>>;
  isOpen: boolean;
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

export function TaskUserModalTable({
  setUsers,
  users,
  isOpen,
}: TTaskUserTable) {
  const [rows, setRows] = useState<TTaskUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set([]));
  const { isQuerying } = useQuery<TTaskUser[]>({
    url: `/api/user`,
    onSuccess: (data) => setRows(data),
  });

  useEffect(() => {
    if (users?.length) {
      setSelectedUsers(getSetUserId(users));
    }
  }, [isOpen]);

  return (
    <Table
      isStriped
      selectionMode="multiple"
      selectedKeys={selectedUsers}
      onSelectionChange={(keys) => {
        const users =
          keys === 'all' ? rows : getSelectedUsers(Array.from(keys), rows);

        setSelectedUsers(keys);

        setUsers(users);
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={rows}
        isLoading={isQuerying}
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
