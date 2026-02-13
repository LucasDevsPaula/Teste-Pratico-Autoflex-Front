
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function Header() {
  return (
    <Navbar fluid>
      <NavbarBrand href="http://localhost:5173/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Produ Control</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/products">
          Produtos
        </NavbarLink>
        <NavbarLink href="/rawMaterials">Insumos</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
