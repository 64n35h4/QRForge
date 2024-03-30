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

  const { data, error, isLoading } = useSWR<Array<QR>>(
    { url: API_QR, params: { type: QR_TYPE.STATIC } },
    fetcher,
  )

  // TODO: handle Error
  return (
    <Card>
      <Card.Header id="card-headline">Static QRs</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="w-75">
            The QR codes on this page are static,
            the value is encoded directly on the QR code and CANNOT be changed later.
          </div>
          <div>
            <Button id="add-new-button" variant="success" onClick={() => router.push(`${pathname}/create`)}>
              <FontAwesomeIcon icon={faPlus} fixedWidth />
              Add new
            </Button>
          </div>
        </div>
        {isLoading
          ? <Spinner id="loading-spinner" />
          : (
            <QRList
              data={data || []}
              showQR
              showLabel
              showURL
              actions={[ACTIONTYPES.DELETE, ACTIONTYPES.DOWNLOAD]}
            />
          )}
        {error ? (
          <div className="error_data" id="error-section">There was an error retreiving data</div>
        ) : null}
      </Card.Body>
    </Card>
  )
}
