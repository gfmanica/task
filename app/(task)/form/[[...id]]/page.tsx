import { TaskForm } from './task-form';

export default function TaskFormPage({ params }: { params: { id: string[] } }) {
  const id = params?.id?.at(0);

  return (
    <>
      <div>
        <div className="text-3xl font-bold">
          {id ? 'Editar' : 'Cadastrar'} Atividade
        </div>
      </div>

      <TaskForm id={id} />
    </>
  );
}
