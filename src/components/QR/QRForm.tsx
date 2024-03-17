'use client'

import {
  Button, Form,
} from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import axios from 'axios'
import { QR_TYPE, QR } from '@prisma/client'
import { API_QR } from '@/lib/constants'

export default function QRForm({ qr }: { qr?: QR }) {
  const router = useRouter()

  const defaultValues = (): QR => {
    if (qr) {
      return {
        label: qr.label,
        userId: qr.userId,
        scans: qr.scans,
        is_active: qr.is_active,
        type: qr.type,
        url: qr.url,
        uniqueID: qr.uniqueID,
      } as QR
    }

    return {
      label: '',
      userId: '',
      scans: 0,
      is_active: true,
      type: QR_TYPE.DYNAMIC,
      url: '',
      uniqueID: '',
    } as QR
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QR>({
    defaultValues: defaultValues(),
  })

  const [submitting, setSubmitting] = useState(false)

  const onSubmit: SubmitHandler<QR> = async (data) => {
    setSubmitting(true)

    const res = await axios.post(API_QR, data)

    // TODO: handle toasts
    setSubmitting(false)

    if (res) {
      router.back()
    }
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >

      {qr && (
        <div
          className="position-relative mx-auto"
          style={{
            width: '150px',
            height: '150px',
          }}
        />
      )}

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          {...register('label', { required: 'This field is required' })}
          isInvalid={!!errors.label}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          {...register('url', { required: 'This field is required' })}
          isInvalid={!!errors.url}
        />
      </Form.Group>

      <Button className="me-3" type="submit" variant="success" disabled={submitting}>Submit</Button>
      <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
    </Form>
  )
}
