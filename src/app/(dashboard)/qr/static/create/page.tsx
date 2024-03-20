import { Card, CardBody, CardHeader } from 'react-bootstrap'
import QRForm from '@/components/QR/QRForm'
import { QR_TYPE } from '@prisma/client'

export default function Page() {
  return (
    <Card>
      <CardHeader>Add new static QR</CardHeader>
      <CardBody>
        <QRForm qr={{ type: QR_TYPE.STATIC }} />
      </CardBody>
    </Card>
  )
}
