'use client'

import React from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import QRList from '@/components/QR/QRList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter, usePathname } from 'next/navigation'
import useSWR from 'swr'
import { QR_TYPE, QR } from '@prisma/client'
import { ACTIONTYPES, API_QR, DYNAMIC_HEADLINE_TEXT } from '@/lib/constants'
import { fetcher } from '@/lib/utils'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()

  const { data, error, isLoading } = useSWR<Array<QR>>(
    { url: API_QR, params: { type: QR_TYPE.DYNAMIC } },
    fetcher,
  )

  console.log({ data, error, isLoading })
  return (
    <Card>
      <Card.Header id="card-headline">{DYNAMIC_HEADLINE_TEXT}</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="w-75">
            The QR codes on this page are dynamic,
            all data pass via this site and you can print the QR code
            and change the redirection at a later date.
          </div>
          <div>
            <Button id="add-new-button" variant="success" onClick={() => router.push(`${pathname}/create`)}>
              <FontAwesomeIcon icon={faPlus} fixedWidth />
              Add New
            </Button>
          </div>
        </div>
        {isLoading
          ? <Spinner id="loading-spinner" />
          : (
            <QRList
              data={data || []}
              showScans
              showURL
              showActive
              showLabel
              showQR
              actions={[ACTIONTYPES.DOWNLOAD, ACTIONTYPES.EDIT, ACTIONTYPES.DELETE]}
            />
          )}
        {error ? (
          <div className="error_data" id="error-section">There was an error retreiving data</div>
        ) : null}
      </Card.Body>
    </Card>
  )
}
