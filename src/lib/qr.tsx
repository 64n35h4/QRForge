import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QR, QR_TYPE } from '@prisma/client'
import { DASHBOARD } from './constants'

// eslint-disable-next-line react/display-name
const QRGen = (row: Partial<QR>) => {
  const {
    url, uniqueID, type, bgColor, fgColor, size,
  } = row

  if (!url) {
    return ''
  }
  let text

  if (type === QR_TYPE.DYNAMIC) {
    text = `${DASHBOARD}/api/read/?u=${uniqueID}`
  } else {
    text = url
  }

  // TODO: improve settings
  return (
    <QRCodeSVG
      value={text!}
      size={size || 128}
      style={{ margin: '10px' }}
      bgColor={bgColor || '#fff'}
      fgColor={fgColor || '#000'}
    />
  )
}

export default QRGen
