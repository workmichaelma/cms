import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import LoginPage from 'pages/login';
import UserIndexPage from 'pages/user/index';

export default function routes() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/user" element={<UserIndexPage menuItem={['SETTING', 'USER']} title="用戶管理" />} />
      </Routes>
    </LocalizationProvider>
  );
}
