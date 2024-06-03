import { TaskForm } from './component';

export default function TaskFormPage({ params }: { params: { id: string[] } }) {
  const id = params?.id?.at(0);

  return (
    <>
      <div className="text-3xl font-bold">
        {id ? 'Editar' : 'Cadastrar'} atividade
      </div>

      <TaskForm id={id} />
    </>
  );
}
