import { SearchParams } from '@/types/next'

import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { u } = searchParams
  if (!u) return new Response('Bad Request', { status: 400 })

  let uniqueID
  if (Array.isArray(u)) {
    [uniqueID] = u
  } else {
    uniqueID = u
  }

  const response = await prisma.qR.findFirst({
    where: {
      uniqueID,
    },
    select: {
      url: true,
    },
  })

  if (!response || !response.url) return new Response('Bad Request', { status: 400 })
  // TODO: handle isActive

  await prisma.qR.update({
    where: {
      uniqueID,
    },
    data: {
      scans: {
        increment: 1,
      },
    },
  })
  return (
    <div>{redirect(response.url)}</div>
  )
}
