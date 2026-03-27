import { NextResponse } from 'next/server';

export function getNextResponse(response: Response) {
  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') ?? 'application/json',
    },
  })
};
