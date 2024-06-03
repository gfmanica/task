'use client';

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { UserTableCell } from './user-table-cell';
import { useState } from 'react';
import { TUser } from '../type';
import { useQuery } from '@/hook';

const columns = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'role',
    label: 'Papel',
  },
  {
    key: 'action',
    label: 'Ações',
  },
];

export function UserTable() {
  const [rows, setRows] = useState<TUser[]>([]);
  const { isQuerying, onQuery } = useQuery<TUser[]>({
    url: `/api/user`,
    onSuccess: (data) => setRows(data),
  });

  return (
    <Table isStriped>
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
                <UserTableCell
                  item={item}
                  columnKey={columnKey}
                  onQuery={onQuery}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
