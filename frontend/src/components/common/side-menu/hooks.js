import { atom, useAtom } from 'jotai';

export const sideMenuOpen = atom(true);

export const sideMenuActiveItem = atom(null);

export const useSideMenu = () => {
  const [_sideMenuOpen, setSideMenuOpen] = useAtom(sideMenuOpen);
  const [_sideMenuActiveItem, setSideMenuActiveItem] = useAtom(sideMenuActiveItem);
  return {
    open: _sideMenuOpen,
    activeItem: _sideMenuActiveItem,
    setSideMenuActiveItem: (items) => {
      setSideMenuActiveItem(items);
    },
    setSideMenuOpen: (open) => {
      setSideMenuOpen(open);
    }
  };
};
