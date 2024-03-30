'use client'

import {
  Card, CardBody, CardHeader, Spinner,
} from 'react-bootstrap'
import QRForm from '@/components/QR/QRForm'
import { QR } from '@prisma/client'
import { API_QR } from '@/lib/constants'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data, error, isLoading } = useSWR<QR>(
    { url: `${API_QR}/${id}` },
    fetcher,
  )

  return (
    <Card id={`${data?.id}`}>
      <CardHeader id="headline-section">Edit QR</CardHeader>
      <CardBody>
        {isLoading ? <Spinner id="spinner-section" /> : <QRForm qr={data} />}
        {error ? (
          <div className="error_data" id="error-section">There was an error retreiving data</div>
        ) : null}
      </CardBody>
    </Card>
  )
}
