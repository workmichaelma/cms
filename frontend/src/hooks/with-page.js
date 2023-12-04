import { useSideMenu } from 'components/common/side-menu/hooks';
import { useTopNav } from 'components/common/top-nav/hooks';
import { useEffect } from 'react';

export const withPage = (WrappedComponent) => {
  return (props) => {
    const { menuItem, title } = props || {};
    const { setTopNav } = useTopNav();
    const { setSideMenuActiveItem } = useSideMenu();

    useEffect(() => {
      if (title) {
        setTopNav({ title });
      }
    }, []);

    useEffect(() => {
      if (menuItem) {
        setSideMenuActiveItem(menuItem);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};
