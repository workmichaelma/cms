import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import LoginPage from 'pages/login';
import UserIndexPage from 'pages/user/index';
import UserProfilePage from 'pages/user/profile';
import LogIndexPage from 'pages/log/index';
import LogProfilePage from 'pages/log/profile';

export default function routes() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/user" element={<UserIndexPage menuItem={['SETTING', 'USER']} title="用戶管理" />} />
        <Route
          path="/user/profile/:_id"
          element={<UserProfilePage menuItem={['SETTING', 'USER']} title="用戶" collection="user" />}
        />

        <Route path="/log" element={<LogIndexPage menuItem={['SETTING', 'LOG']} title="系統紀錄" />} />
        <Route
          path="/log/profile/:_id"
          element={<LogProfilePage menuItem={['SETTING', 'LOG']} title="系統紀錄" collection="log" />}
        />
      </Routes>
    </LocalizationProvider>
  );
}
