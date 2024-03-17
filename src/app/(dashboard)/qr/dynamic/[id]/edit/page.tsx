import { notFound } from 'next/navigation'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import QRForm from '@/components/QR/QRForm'
import axios from 'axios'
import { QR } from '@prisma/client'
import { API_QR } from '@/lib/constants'

const fetchQR = async (params: { id: string }): Promise<{ qr: QR }> => {
  const idQuery = params.id

  if (!idQuery) {
    return notFound()
  }

  const id = Number(idQuery)

  try {
    const res = await axios.get(`${API_QR}/${id}`)
    if (!res) {
      return notFound()
    }

    const qr: QR = res.data

    return {
      qr,
    }
  } catch (error) {
    return notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { qr } = await fetchQR(params)

  return (
    <Card>
      <CardHeader>Edit QR</CardHeader>
      <CardBody>
        <QRForm qr={qr} />
      </CardBody>
    </Card>
  )
}
