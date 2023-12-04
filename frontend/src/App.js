import './App.css';
import { withApp } from 'store';
import { useAtom } from 'jotai';

import Routes from './routes';
import Document from './document';
import * as store from 'store';

function App() {
  const [pathname] = useAtom(store.pathname);

  if (pathname.startsWith('/login')) {
    return <Routes />;
  }

  return <Document />;
}

export default withApp(App);
