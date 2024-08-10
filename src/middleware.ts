import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
const protectedRoutes=['/User/undefined',
    '/blogs/all-blogs/all','/blogs/upload']
export async function middleware(request: NextRequest) {
    const token=await getToken({req:request});
    // console.log("coming here")
    // console.log(request.nextUrl.pathname)
    if(!token && 
       protectedRoutes.includes(request.nextUrl.pathname)
    ){
        return NextResponse.redirect(new URL('/Sign-In', request.url))
    }
}
export const config = {
  matcher: ['/blogs/all-blogs/:path*','/User/[username]','/blogs/upload'],
}
