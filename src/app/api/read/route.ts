'use server'

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const u = request.nextUrl.searchParams.get('u')
  if (!u) return new Response('Bad Request', { status: 400 })

  const response = await prisma.qR.findFirst({
    where: {
      uniqueID: u,
    },
    select: {
      url: true,
      is_active: true,
    },
  })
  if (!response?.is_active) return new Response('The selected ID is not active', { status: 200 })
  if (!response || !response.url) return new Response('Bad Request', { status: 400 })

  await prisma.qR.update({
    where: {
      uniqueID: u,
    },
    data: {
      scans: {
        increment: 1,
      },
    },
  })
  return Response.redirect(response.url.startsWith('http') ? response.url : `https://${response.url}`)
}
