import logo from './logo.svg';
import './App.css';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useAtom, useAtomValue } from 'jotai';

import Loading from 'components/loading';
import SideMenu from 'components/common/side-menu';
import Toggle from 'components/common/side-menu/toggle';
import TopNav from 'components/common/top-nav';
import Routes from './routes';
import { useSideMenu } from 'components/common/side-menu/hooks';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const App = () => {
  // const theme = useTheme();
  const { open: sideMenuOpen } = useSideMenu();

  // if (loading) return null;
  return (
    <Box sx={{ display: 'flex', color: 'white' }}>
      <AppBar
        position="fixed"
        open={sideMenuOpen}
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          borderBottom: '2px solid #eeeeee'
        }}
      >
        <TopNav />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflow: 'visible'
          }
        }}
        variant="persistent"
        anchor="left"
        open={sideMenuOpen}
      >
        <div className="min-h-screen border-r-2">
          <SideMenu />
        </div>
      </Drawer>
      <Main open={sideMenuOpen}>
        <div className="min-h-screen relative text-zinc-900 text-sm flex w-full">
          {/* <Alert /> */}
          <div className="mt-16 p-4 w-full">
            <Loading>
              <Routes />
            </Loading>
          </div>
          {!sideMenuOpen && (
            <div className="absolute left-0 bottom-4">
              <Toggle />
            </div>
          )}
        </div>
      </Main>
    </Box>
  );
};

export default App;
