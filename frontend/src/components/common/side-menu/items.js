import { List } from '@mui/material';
import Item from './item';
import { items } from './setting';

export default function MenuItems() {
  return (
    <List
      sx={{
        '.MuiListItemButton-root': {
          borderRadius: '4px'
        },
        '.MuiListItemButton-root.Mui-selected': {
          backgroundColor: '#e9f2ff',
          color: '#0C66E4'
        },
        '.MuiListItemButton-root.Mui-selected .MuiSvgIcon-root': {
          fill: '#0C66E4'
        },
        '.MuiListItemButton-root:hover': {
          backgroundColor: '#e9f2ff',
          color: '#0C66E4'
        },
        '.MuiListItemButton-root:hover .MuiSvgIcon-root': {
          fill: '#0C66E4'
        }
      }}
    >
      <div className="px-2">
        {items.map((item) => (
          <Item item={item} key={item.name} />
        ))}
      </div>
    </List>
  );
}
