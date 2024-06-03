'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { TUser } from './type';
import UserTableCell from './user-table-cell';

const rows: TUser[] = [
  {
    id: 1,
    name: 'Alice',
    role: {
      id: 'ADMINISTRATOR',
      name: 'Admin',
    },
  },
  {
    id: 2,
    name: 'Bob',
    role: {
      id: 'USER',
      name: 'User',
    },
  },
];

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

export default function UserTable() {
  return (
    <Table isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows} emptyContent="Sem registros">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <UserTableCell item={item} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
