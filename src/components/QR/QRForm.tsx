'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import { QR_TYPE, QR } from '@prisma/client'
import { API_QR } from '@/lib/constants'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { ColorPicker } from 'primereact/colorpicker'

import QRGen from '@/lib/qr'
import { isValidUrl } from '@/lib/utils'

export default function QRForm({ qr }: { qr?: Partial<QR> }) {
  const router = useRouter()

  const formik = useFormik<Partial<QR>>({
    enableReinitialize: true,
    initialValues: {
      label: qr?.label ?? '',
      scans: qr?.scans ?? 0,
      is_active: qr?.is_active ?? true,
      type: qr?.type ?? QR_TYPE.DYNAMIC,
      url: qr?.url ?? '',
      uniqueID: qr?.uniqueID ?? '',
      bgColor: qr?.bgColor || '#ffffff',
      fgColor: qr?.fgColor || '#000000',
    },
    validate: (data) => {
      const errors = {} as QR

      if (!data.url) {
        errors.url = 'Required'
      } else if (!isValidUrl(data.url)) {
        errors.url = 'Invalid URL'
      }

      return errors
    },
    onSubmit: (data) => {
      console.log({ data, API_QR })
      if (data.uniqueID) {
        axios.put(`${API_QR}/${data.uniqueID}`, data).then(() => {
          router.back()
          formik.resetForm()
        })
      } else {
        axios.post(API_QR, data).then(() => {
          router.back()
          formik.resetForm()
        })
      }
    },
  })

  const isFormFieldInvalid = (name: string) => !!(formik.errors[name as keyof QR])

  const getFormErrorMessage = (name: string) => (isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name as keyof QR]}</small> : <small className="p-error">&nbsp;</small>)

  return (
    <div className="container-fluid d-flex">
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 w-100">
        <div className="row">
          <div className="col">
            <div className="row g-0">
              <span className="p-float-label mt-4">
                <InputText
                  id="label"
                  data-testid="Label"
                  name="label"
                  onBlur={(e) => {
                    formik.setFieldValue('label', e.target.value)
                  }}
                  value={formik.values.label || ''}
                  onChange={(e) => {
                    formik.setFieldValue('label', e.target.value)
                  }}
                  className={classNames({ 'p-invalid': isFormFieldInvalid('label') }, 'w-100')}
                />
                <label htmlFor="input_label">Label</label>
              </span>
            </div>
            <div className="row g-0">
              <span className="p-float-label mt-4">
                <InputText
                  id="url"
                  data-testid="Url"
                  name="url"
                  value={formik.values.url || ''}
                  onBlur={(e) => {
                    formik.setFieldValue('url', e.target.value)
                  }}
                  onChange={(e) => {
                    formik.setFieldValue('url', e.target.value)
                  }}
                  className={classNames({ 'p-invalid': isFormFieldInvalid('url') }, 'w-100')}
                />
                <label htmlFor="input_url">URL</label>
              </span>
              {getFormErrorMessage('url')}
            </div>
            <div className="row">
              <div className="col-9"> Active </div>
              <span className="col-3">
                <InputSwitch
                  id="is_active"
                  data-testid="is_active"
                  name="is_active"
                  inputId="is_active"
                  checked={formik.values.is_active || false}
                  className={classNames({ 'p-invalid': isFormFieldInvalid('is_active') })}
                  onChange={(e) => {
                    formik.setFieldValue('is_active', e.value)
                  }}
                />
              </span>
            </div>
            <div className="row">
              <div className="col-10"> Background Color </div>
              <span className="col-2">
                <ColorPicker
                  id="bgColor"
                  data-testid="bgColor"
                  name="bgColor"
                  value={formik.values.bgColor ?? '#000'}
                  className={classNames({ 'p-invalid': isFormFieldInvalid('bgColor') })}
                  onChange={(e) => {
                    formik.setFieldValue('bgColor', `#${e.value}`)
                  }}
                />
              </span>
            </div>
            <div className="row">
              <div className="col-10"> Foreground Color </div>
              <span className="col-2">
                <ColorPicker
                  id="fgColor"
                  data-testid="fgColor"
                  name="fgColor"
                  value={formik.values.fgColor ?? '#fff'}
                  className={classNames({ 'p-invalid': isFormFieldInvalid('fgColor') })}
                  onChange={(e) => {
                    formik.setFieldValue('fgColor', `#${e.value}`)
                  }}
                />
              </span>
            </div>
          </div>
          <div className="col mt-4">
            <div className="h-100 text-center">
              {
                QRGen({
                  url: formik.values.url,
                  uniqueID: formik.values.uniqueID,
                  type: formik.values.type,
                  bgColor: formik.values.bgColor,
                  fgColor: formik.values.fgColor,
                })
              }
            </div>

          </div>
        </div>
        <Button type="submit" label="Submit" data-testid="submit" />
      </form>
    </div>
  )
}
