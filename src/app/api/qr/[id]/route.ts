import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser()
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { id } = params
  const response = await prisma.qR.findFirst({
    where: {
      id,
    },
  })
  return NextResponse.json(response)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser()
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { id } = params
  await prisma.qR.delete({
    where: {
      uniqueID: id,
      userId: user.id,
    },
  })
  return new Response(null, { status: 204 })
}
