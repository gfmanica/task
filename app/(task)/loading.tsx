import { CircularProgress } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center align-middle">
      <CircularProgress aria-label="Loading..." />
    </div>
  );
}
