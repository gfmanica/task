import { TUser } from './type';

import { Button, Chip, Tooltip, getKeyValue } from '@nextui-org/react';

import { Eye, Trash, UserRoundCog, UserRoundPlus } from 'lucide-react';

const roleColorMap = {
  ADMINISTRATOR: 'primary',
  USER: 'success',
} as const;

export default function UserTableCell({
  item,
  columnKey,
}: {
  item: TUser;
  columnKey: string | number;
}) {
  switch (columnKey) {
    case 'role': {
      return (
        <Chip color={roleColorMap[item.role.id]} size="sm" variant="flat">
          {item.role.name}
        </Chip>
      );
    }

    case 'action': {
      return (
        <div className="flex gap-2">
          <Tooltip content="Editar papel">
            <Button variant="light" color="primary" size="sm" isIconOnly>
              <UserRoundCog size={20} />
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
