'use client';

import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';

type TMenuItem = {
  name: string;
  route?: string;
  color: 'foreground' | 'danger';
};

const menuItems: TMenuItem[] = [
  {
    name: 'Atividades',
    route: '/',
    color: 'foreground',
  },
  {
    name: 'Usuários',
    route: '/user',
    color: 'foreground',
  },
  {
    name: 'Sair',
    color: 'danger',
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />

        <NavbarItem>
          <Link color="foreground" href="/" className="font-bold text-inherit">
            Atividades UTFPR
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Atividades
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/user">
            Usuários
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="danger" variant="light">
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
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
