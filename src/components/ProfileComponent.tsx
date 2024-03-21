import React from 'react';
import { RatedFilmsPage } from '../pages/UserPages/RatedFilmsPage';
import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';
import { PlannedListPage } from '../pages/UserPages/ProfilePlannedPage';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return (
    <div>
      {formType === 'ratedlist' && <RatedFilmsPage />}
      {formType === 'settings' && <ProfileSettingPage />}
      {formType === 'planned' && <PlannedListPage />}
    </div>
  );
};
