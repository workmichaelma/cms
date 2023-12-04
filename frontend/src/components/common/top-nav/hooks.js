import { atom, useSetAtom } from 'jotai';

export const topnav = atom({
  title: '',
  save: null,
  canSave: false,
  element: null
});

export const useTopNav = () => {
  const setTopNav = useSetAtom(topnav);
  return {
    setTopNav: (options) => {
      setTopNav((v) => ({
        ...v,
        ...options
      }));
    }
  };
};
