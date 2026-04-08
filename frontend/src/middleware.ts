import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('baksho-logged-in')?.value === 'true'
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/checkout') || 
    request.nextUrl.pathname.startsWith('/dashboard')

  // If trying to access protected route and NOT logged in, redirect to auth
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // If already logged in and trying to go to auth, redirect home
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/checkout/:path*', '/dashboard/:path*', '/auth'],
}
