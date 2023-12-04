import './App.css';
import { withApp } from 'store';
import { useAtom } from 'jotai';

import Routes from './routes';
import Document from './document';
import * as store from 'store';

function App({ domReady }) {
  const [pathname] = useAtom(store.pathname);

  if (!domReady) return null;
  if (pathname.startsWith('/login')) {
    return <Routes />;
  }

  return <Document />;
}

export default withApp(App);
