type TypeSidebarItem = {
  id: string;
  name: string;
  to: string;
};

export const listSidebar: TypeSidebarItem[] = [
  {
    id: "name-dashboard",
    name: "Name of Dashboard",
    to: "name",
  },
  {
    id: "welcome-screen",
    name: "Welcome Screen",
    to: "screen",
  },
  {
    id: "text-dashboard",
    name: "Text on Welcome Screen",
    to: "text",
  },
  {
    id: "logo-partner",
    name: "Logo your partner",
    to: "logo-partner",
  },
  {
    id: "password",
    name: "Password",
    to: "password",
  },
];
