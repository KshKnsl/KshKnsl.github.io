import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const isPreviewMode = request.cookies.has("preview-mode")

  if (isPreviewMode) {
    response.headers.set("x-preview-mode", "true")
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

