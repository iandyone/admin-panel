import { useSession } from 'next-auth/react'

import { PERMISSIONS_BY_ROLE_MAP } from '@/configs';
import { EPermissions } from '@/constants';


export const usePermissions = () => {
  const session = useSession();
  const role = session.data?.user.role;

  const checkPermission = (permission: EPermissions) => role ? PERMISSIONS_BY_ROLE_MAP[role].has(permission) : false;

  return { role, checkPermission }
}
