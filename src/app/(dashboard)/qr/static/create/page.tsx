import { Card, CardBody, CardHeader } from 'react-bootstrap'
import QRForm from '@/components/QR/QRForm'

export default function Page() {
  return (
    <Card>
      <CardHeader>Add new QR</CardHeader>
      <CardBody>
        <QRForm />
      </CardBody>
    </Card>
  )
}
