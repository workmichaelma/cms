import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAtom } from 'jotai';
import { map } from 'lodash';

import { useSideMenu } from './hooks';
import { redirect } from 'lib/location';

const Bar = ({ item, onClick, open, activeItem }) => {
  const hasChild = item?.children;
  const selected = activeItem === item.key;
  return (
    <ListItemButton
      selected={hasChild && open ? false : selected}
      onClick={() => onClick(item?.url)}
      sx={{
        px: !hasChild && !item.isRoot ? '18px' : '10px',
        my: '2px',
        py: '7px'
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 'auto',
          paddingRight: '8px',
          fontSize: '8px',
          transform: 'scale(0.8)'
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.name} sx={{ '.MuiTypography-root': { fontSize: '13px' } }} />
      {hasChild ? open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" /> : null}
    </ListItemButton>
  );
};

export default function Item({ item }) {
  const { activeItem = [] } = useSideMenu();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (activeItem?.length) {
      const childrenKeys = map(item?.children, (item) => item.key);
      setOpen(activeItem[0] === item.key || childrenKeys.includes(activeItem[1]));
    }
  }, [activeItem, item]);

  const handleClick = (url) => {
    if (url) {
      redirect(url);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="py-1">
      <Bar onClick={handleClick} item={item} open={open} activeItem={activeItem?.[0]} />
      {item?.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <Bar
                key={child.name}
                activeItem={activeItem?.[1]}
                onClick={handleClick}
                item={{
                  icon: item.icon,
                  ...child
                }}
              />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
}
