import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { UserLayout } from 'src/components/pageLayout';
import { USER_ROLE } from 'src/utils/constant';
import SessionUtils from 'src/utils/sessionUtils';
import CoreMemberView from './CoreMemberView';

const UserContent = () => {
  const [isCoreMember, setIsCoreMember] = useState<boolean>(true);

  useEffect(() => {
    const role = SessionUtils.getRole();

    setIsCoreMember(_.includes([USER_ROLE.MEMBER], role));
  }, []);

  return (
    <UserLayout>
      {isCoreMember ? <CoreMemberView /> : <CoreMemberView />}
    </UserLayout>
  );
};

export default UserContent;
