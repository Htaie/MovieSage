import React from 'react';
import { UsersFilmsPage } from '../pages/UserPages/UsersFilmsPage';
import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';
import { PlannedListPage } from '../pages/UserPages/ProfilePlannedPage';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return (
    <div>
      {formType === 'ratedlist' && <UsersFilmsPage formType='ratedlist' />}
      {formType === 'settings' && <ProfileSettingPage />}
      {formType === 'planned' && <UsersFilmsPage formType='planned' />}
    </div>
  );
};
