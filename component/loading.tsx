import { CircularProgress } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <CircularProgress aria-label="Loading..." />
    </div>
  );
}
