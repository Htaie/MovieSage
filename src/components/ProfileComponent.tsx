import { UsersFilmsPage } from '../pages/UserPages/UsersFilmsPage';
import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';
import { PROFILE_ROUTE } from '../shared/constants/constants';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return (
    <>
      {formType === PROFILE_ROUTE.RATED && <UsersFilmsPage formType={PROFILE_ROUTE.RATED} />}
      {formType === PROFILE_ROUTE.SETTINGS && <ProfileSettingPage />}
      {formType === PROFILE_ROUTE.PLAN && <UsersFilmsPage formType={PROFILE_ROUTE.PLAN} />}
    </>
  );
};
