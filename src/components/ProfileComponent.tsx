import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';
import { PROFILE_ROUTE } from '../shared/constants/constants';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return <div>{formType === PROFILE_ROUTE.SETTINGS && <ProfileSettingPage />}</div>;
};
