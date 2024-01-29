export { default } from "next-auth/middleware";

export const config = { 
  matcher: [ // aqui iran las paginas que necesitan que este le usuario ahutorizado para poder entrar
    "/profile/:path*",
    "/dashboard/:path*",
    "/api/users/:path*"
  ]
}