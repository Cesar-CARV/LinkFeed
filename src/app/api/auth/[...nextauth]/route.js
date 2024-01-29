import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/libs/db';
import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials", // definimos por que tipo vamos a ahutorizar a los usuarios
      credentials: { // creamos un formulario proviconal
        email: {label: "Email", type: "text", placeholder: "Email"},
        password: {label: "Password", type: "password", placeholder: "*******"},
      }, // esta funcion se llama cuando utilizamos el hook signIn de next-auth/react
      async authorize(credentials, req) {
        // Buscar el usuario en la base de datos y comprobar si existe
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // chachear los errores | usuario no encontrado | usuario encontrado | constraseña incorrecta
        if (!userFound) throw new Error("User not found");
        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
        if (!matchPassword) throw new Error("Wrong password");

        // retorna lo necesario para crear el token de seguridad
        return {
          id: userFound.id,
          name: userFound.userName,
          email: userFound.email
        };
      }
    })
  ],
  pages: {
    // esto es para redireccionar a mi propio login
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };