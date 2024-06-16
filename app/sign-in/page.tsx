'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { SignInForm } from './component';

export default function SignInPage() {
  return (
    <div className="m-[-40px] flex flex-1 items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Card className="p-2">
        <CardHeader className="pb-0 text-3xl font-bold">Entrar</CardHeader>

        <CardBody className="w-80 sm:w-96">
          <SignInForm />
        </CardBody>
      </Card>
    </div>
  );
}
