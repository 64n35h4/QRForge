/* eslint-disable no-param-reassign */
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_SECRET_ID || '',
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.picture = token.picture as string
      }
      return session
    },
    async jwt({ token, user }) {
      let dbUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
          return token
        }
        dbUser = await prisma.user.create({
          data: {
            email: token.email!,
            username: token.name!,
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.username,
        email: dbUser.email,
        picture: token.picture,
      }
    },
  },
}
