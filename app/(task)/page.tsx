'use client';

import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TaskTable } from './component';

export default function TaskPage() {
  const { push } = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="text-3xl font-bold">Atividades</div>

        <Button
          color="primary"
          variant="shadow"
          onClick={() => push('/form')}
          startContent={<Plus size={20} />}
        >
          Novo
        </Button>
      </div>

      <TaskTable />
    </>
  );
}
