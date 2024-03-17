import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { QR_TYPE } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const user = await getCurrentUser()
  if (!user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }
  let params = {}
  if (searchParams.has('type')) {
    params = { type: searchParams.get('type') as QR_TYPE }
  }

  const response = await prisma.qR.findMany({
    where: {
      userId: user.id,
      ...params,
    },
  })
  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }
  const data = await request.json()

  const uuid = uuidv4()
  await prisma.qR.create({
    data: {
      userId: user.id,
      label: data.label,
      type: data.type.toUpperCase(),
      uniqueID: uuid,
      url: data.url,
      scans: data.scans,
      is_active: data.is_active,
    },
  })

  return Response.json({ id: uuid }, { status: 201 })
}
