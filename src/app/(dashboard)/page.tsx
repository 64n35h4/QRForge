'use client'

import { Card, CardBody } from 'react-bootstrap'
import Placeholder from 'react-bootstrap/Placeholder'
import React from 'react'
import { API_STATS } from '@/lib/constants'
import { fetcher } from '@/lib/utils'
import { QR_TYPE } from '@prisma/client'
import useSWR from 'swr'

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR({ url: API_STATS }, fetcher)

  // TODO: Handle Error
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-6">
        <Card bg="primary" text="white" className="mb-4">
          <CardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {isLoading ? <Placeholder className="w-100" /> : data[QR_TYPE.DYNAMIC]}
              </div>
              <div>Dynamic QRs</div>
            </div>
          </CardBody>
          <div className="mt-3 mx-3" style={{ height: '70px' }} />
        </Card>
      </div>

      <div className="col-sm-12 col-lg-6">
        <Card bg="info" text="white" className="mb-4">
          <CardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {isLoading ? <Placeholder className="w-100" /> : data[QR_TYPE.STATIC]}
              </div>
              <div>Static QRs</div>
            </div>
          </CardBody>
          <div className="mt-3 mx-3" style={{ height: '70px' }} />
        </Card>
      </div>
    </div>
  )
}
