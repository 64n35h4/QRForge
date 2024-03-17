import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { QR_TYPE } from '@prisma/client'

export async function GET() {
  const user = await getCurrentUser()
  if (!user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }
  const QRTypes = {
    [QR_TYPE.STATIC]: 0,
    [QR_TYPE.DYNAMIC]: 0,
  }
  const response = await prisma.qR.findMany({
    where: {
      userId: user.id,
    },
  })

  response.forEach((resp) => {
    QRTypes[resp.type!] += 1
  })
  return NextResponse.json(QRTypes)
}
