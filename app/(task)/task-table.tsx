'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { TTask } from './type';
import TaskTableCell from './task-table-cell';

const rows: TTask[] = [
  {
    id: 1,
    name: 'Task 1',
    expirationDate: new Date(),
    status: 'WAITING',
  },
  {
    id: 2,
    name: 'Task 2',
    expirationDate: new Date(),
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    name: 'Task 3',
    expirationDate: new Date(),
    status: 'DONE',
  },
  {
    id: 4,
    name: 'Task 4',
    expirationDate: new Date(),
    status: 'CANCELED',
  },
];

const columns = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'expirationDate',
    label: 'Data de expiração',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'action',
    label: 'Ações',
  },
];

export default function TaskTable() {
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
                <TaskTableCell item={item} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
