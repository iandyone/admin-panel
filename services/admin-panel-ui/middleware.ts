import { NextRequest, NextResponse } from 'next/server';

import { auth } from './configs';
import { ERoutes } from './constants';
import { EUserRoles } from './types';

const { ORDERS } = ERoutes;

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (session?.user.role.toLocaleLowerCase() === EUserRoles.DELIVERY) {
    return NextResponse.redirect(new URL(`/${ORDERS}`, request.nextUrl.origin))
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*']
}
