import { Logout, Person } from '@mui/icons-material';
import { useAtom } from 'jotai';

import { user } from 'store';

export default function MenuItems() {
  const [_user] = useAtom(user);

  const { username } = _user || {};
  return (
    <div className="px-[18px] flex gap-2">
      <Person sx={{ transform: 'scale(0.8)' }} />
      <div className="grow break-all text-sm flex items-center">{username}</div>
      <div className="">
        <Logout sx={{ width: '16px' }} />
      </div>
    </div>
  );
}
