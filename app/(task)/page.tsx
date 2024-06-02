'use client';

import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import TaskTable from './task-table';
import { useRouter } from 'next/navigation';

export default function TaskPage() {
  const { push } = useRouter();
  return (
    <>
      <div className="flex justify-between align-middle">
        <div className="text-3xl font-bold">Atividades</div>

        <Button color="primary" variant="shadow" onClick={() => push('/form')}>
          <Plus /> Novo
        </Button>
      </div>

      <TaskTable />
    </>
  );
}
