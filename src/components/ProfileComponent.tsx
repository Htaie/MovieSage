import { UsersFilmsPage } from '../pages/UserPages/UsersFilmsPage';
import { ProfileSettingPage } from '../pages/UserPages/ProfileSettingPage';
import { LISTS } from '../shared/constants/constants';

export const ProfileComponent = ({ formType }: { formType: string }) => {
  return (
    <div>
      {formType === LISTS.RATED && <UsersFilmsPage formType={LISTS.RATED} />}
      {formType === 'settings' && <ProfileSettingPage />}
      {formType === LISTS.PLAN && <UsersFilmsPage formType={LISTS.PLAN} />}
    </div>
  );
};
