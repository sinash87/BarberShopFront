import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { AccountTeamsContent } from '@/pages/account/members/teams';

import {
  AccountNotificationsPage,
  AccountTeamsPage,
  AccountUserProfilePage
} from '@/pages/account';

import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { ErrorsRouting } from '@/errors';
import { Demo6Layout } from '@/layouts/demo6';

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo6Layout />}>
          <Route path="/" element={<AccountTeamsContent />} />
          <Route path="/account/home/user-profile" element={<AccountUserProfilePage />} />
          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route path="/account/notifications" element={<AccountNotificationsPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
