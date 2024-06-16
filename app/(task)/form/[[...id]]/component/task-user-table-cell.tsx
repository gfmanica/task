'use client';

import { TTaskUser } from '@/app/(task)/type';
import { TUser } from '@/app/user/type';
import { roleColorMap } from '@/util/enum';
import { Chip, getKeyValue } from '@nextui-org/react';

type TUserTableCell = {
  item: TTaskUser;
  columnKey: string | number;
};

export function TaskUserTableCell({ item, columnKey }: TUserTableCell) {
  switch (columnKey) {
    case 'role': {
      return (
        <Chip
          color={roleColorMap[item.role.id as TUser['role']['id']]}
          size="sm"
          variant="flat"
        >
          {item.role.role}
        </Chip>
      );
    }

    default: {
      return getKeyValue(item, columnKey);
    }
  }
}
