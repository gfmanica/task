'use client';

import { useState } from 'react';
import { TTask } from '../../type';
import { useQuery } from '@/hook';
import Loading from '@/component/loading';
import { Chip } from '@nextui-org/react';
import { statusColorMap } from '@/util/enum';

export default function TaskViewPage({ params }: { params: { id: string[] } }) {
  const id = params?.id?.at(0);

  const [task, setTask] = useState<TTask | null>(null);

  const { isQuerying } = useQuery<TTask>({
    url: `/api/task/${id}`,
    enabled: Boolean(id),
    onSuccess: (data) => setTask(data),
  });

  if (isQuerying) {
    return <Loading />;
  } else if (!task) {
    return <p>Atividade não encontrada</p>;
  }

  return (
    <>
      <h1 className="break-words text-3xl font-bold">{task.name}</h1>

      <Chip
        color={statusColorMap[task.status.id as keyof typeof statusColorMap]}
        size="sm"
        variant="flat"
      >
        {task.status.status}
      </Chip>

      <div className="flex flex-col">
        <b className="text-xl">Link </b>

        <a className="break-words underline" href={task.link}>
          {task.link}
        </a>
      </div>

      <div className="flex flex-col">
        <b className="text-xl">Descrição </b>

        <p className="whitespace-pre-line break-words text-justify">
          {task.description}
        </p>
      </div>
    </>
  );
}
