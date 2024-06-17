'use client';

import { useSessionContext } from '@/provider/session-provider';
import {
  Button,
  Chip,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from '@nextui-org/react';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ExitModal } from './exit-modal';
import { roleColorMap } from '@/util/enum';
import { TUser } from '@/app/user/type';

type TMenuItem = {
  name: string;
  route?: string;
  click?: () => void;
  color: 'foreground' | 'danger';
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isInvalidRoute = ['/sign-in', '/sign-up', '/doc'].includes(pathname);
  const session = useSessionContext();
  const isAdministrator = session?.user?.role?.id === 'ADMINISTRATOR';

  const {
    isOpen: isOpenExit,
    onOpen: onOpenExit,
    onOpenChange: onOpenChangeExit,
  } = useDisclosure();

  if (isInvalidRoute) {
    return null;
  }

  const menuItems: TMenuItem[] = [
    {
      name: 'Atividades',
      route: '/',
      color: 'foreground',
    },
    {
      name: 'Sair',
      color: 'danger',
      click: onOpenExit,
    },
  ];

  if (isAdministrator) {
    menuItems.splice(1, 0, {
      name: 'Usuários',
      route: '/user',
      color: 'foreground',
    });
  }

  return (
    <>
      <ExitModal isOpen={isOpenExit} onOpenChange={onOpenChangeExit} />

      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />

          <NavbarItem>
            <Link
              color="foreground"
              href="/"
              className="font-bold text-inherit"
            >
              Atividades UTFPR
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Atividades
            </Link>
          </NavbarItem>

          {isAdministrator && (
            <NavbarItem>
              <Link color="foreground" href="/user">
                Usuários
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="gap-2">
            <div className="text-sm">{session?.user?.name}</div>

            <Chip
              color={
                roleColorMap[session?.user?.role?.id as TUser['role']['id']]
              }
              size="sm"
              variant="flat"
            >
              {session?.user?.role?.role}
            </Chip>
          </NavbarItem>

          <NavbarItem>
            <Button
              color="danger"
              variant="light"
              startContent={<LogOut size={20} />}
              onClick={onOpenExit}
            >
              Sair
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                size="lg"
                className="w-full"
                href={item.route}
                color={item.color}
                onClick={item.click}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
