import { atom, useAtom } from 'jotai';
export const loading = atom({
  isLoading: false,
  isBlockedScreen: false
});

export const useLoading = () => {
  const [setting, setSetting] = useAtom(loading);

  return {
    ...setting,
    setLoading: ({ isLoading, blockScreen = false }) => {
      setSetting((v) => ({
        ...v,
        isLoading,
        isBlockedScreen: blockScreen
      }));
    }
  };
};
