import React from 'react';
import { RatedFilmsPage } from '../pages/UserPages/RatedFilmsPage';
import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return (
    <div>
      {formType === 'ratedlist' && <RatedFilmsPage />}
      {formType === 'settings' && <ProfileSettingPage />}
    </div>
  );
};
