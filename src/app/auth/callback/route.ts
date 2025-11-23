import { NextResponse } from 'next/server';
import routes from '@/src/lib/routes';

export async function GET() {
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}${routes.dashboard}`
  );
}
