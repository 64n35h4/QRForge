'use client'

import React from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import QRList from '@/components/QR/QRList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter, usePathname } from 'next/navigation'
import useSWR from 'swr'
import { QR_TYPE, QR } from '@prisma/client'
import { ACTIONTYPES, API_QR } from '@/lib/constants'
import { fetcher } from '@/lib/utils'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR<Array<QR>>(
    { url: API_QR, params: { type: QR_TYPE.STATIC } },
    fetcher,
  )

  // TODO: handle Error
  return (
    <Card>
      <Card.Header>Static QRs</Card.Header>
      <Card.Body>
        <div className="mb-3 text-end">
          <Button variant="success" onClick={() => router.push(`${pathname}/create`)}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Add new
          </Button>
        </div>
        {isLoading
          ? <Spinner />
          : (
            <QRList
              data={data || []}
              showQR
              showLabel
              showURL
              actions={[ACTIONTYPES.DELETE, ACTIONTYPES.DOWNLOAD]}
            />
          )}
      </Card.Body>
    </Card>
  )
}
