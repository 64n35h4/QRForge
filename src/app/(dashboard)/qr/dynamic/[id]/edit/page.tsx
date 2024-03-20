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
  // const { qr } = await fetchQR(params)
  const { id } = params
  const { data, error, isLoading } = useSWR<QR>(
    { url: `${API_QR}/${id}` },
    fetcher,
  )

  return (
    <Card id={`${data?.id}`}>
      <CardHeader>Edit QR</CardHeader>
      <CardBody>
        {isLoading ? <Spinner /> : <QRForm qr={data} />}
      </CardBody>
    </Card>
  )
}
