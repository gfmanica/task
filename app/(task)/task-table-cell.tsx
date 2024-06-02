import { TTask } from './type';

import {
  Button,
  Chip,
  Tooltip,
  getKeyValue,
} from '@nextui-org/react';

import { Eye, Trash, UserRoundPlus } from 'lucide-react';

const statusColorMap = {
  WAITING: 'warning',
  IN_PROGRESS: 'primary',
  DONE: 'success',
  CANCELED: 'danger',
} as const;

const statusLabelMap = {
  WAITING: 'Aguardando',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluído',
  CANCELED: 'Cancelado',
} as const;

export default function TaskTableCell({
  item,
  columnKey,
}: {
  item: TTask;
  columnKey: string | number;
}) {
  switch (columnKey) {
    case 'expirationDate': {
      return item.expirationDate.toLocaleDateString();
    }

    case 'status': {
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[item.status]}
          size="sm"
          variant="flat"
        >
          {statusLabelMap[item.status]}
        </Chip>
      );
    }

    case 'action': {
      return (
        <div className="flex gap-2">
          <Tooltip content="Visualizar">
            <Button variant="light" color="primary" size="sm" isIconOnly>
              <Eye size={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Atribuir a um usuário">
            <Button variant="light" color="primary" size="sm" isIconOnly>
              <UserRoundPlus size={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Excluir">
            <Button variant="light" color="danger" size="sm" isIconOnly>
              <Trash size={20} />
            </Button>
          </Tooltip>
        </div>
      );
    }

    default: {
      return getKeyValue(item, columnKey);
    }
  }
}
