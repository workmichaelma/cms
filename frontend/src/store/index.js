import { atom, useAtom, useSetAtom } from 'jotai';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'query-string';
import { useFetch } from 'lib/fetch';
import { useEffect } from 'react';

export const user = atom(null);

export const domReady = atom(false);
export const pathname = atom(null);
export const queryString = atom(null);
export const urlParams = atom(null);

const useUser = () => {
  const setUserData = useSetAtom(user);
  const { fetch, result } = useFetch();

  useEffect(() => {
    fetch('GET', '/api/collection/user/current-user');
  }, []);

  useEffect(() => {
    if (result) {
      setUserData(result);
    }
  }, [result]);
};

export const withApp = (WrappedComponent) => {
  return (props) => {
    useUser();
    const [userData] = useAtom(user);
    const [isDomReady, setIsDomReady] = useAtom(domReady);
    const setPathname = useSetAtom(pathname);
    const setQueryString = useSetAtom(queryString);
    const setUrlParams = useSetAtom(urlParams);

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
      if (location?.pathname) {
        setPathname(location.pathname);
      }

      if (location?.search) {
        setQueryString(qs.parse(location.search));
      }

      if (params) {
        setUrlParams(params);
      }

      setIsDomReady(true);
    }, []);

    return <WrappedComponent {...props} userData={userData} domReady={isDomReady} />;
  };
};
