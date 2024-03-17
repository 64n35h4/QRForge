import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QR, QR_TYPE } from '@prisma/client'
import { DASHBOARD } from './constants'

// eslint-disable-next-line react/display-name
const QRGen = (row: QR) => {
  const {
    url, uniqueID, type,
  } = row

  if (!url) {
    return ''
  }
  let text

  if (type === QR_TYPE.DYNAMIC) {
    text = `${DASHBOARD}/read/?u=${uniqueID}`
  } else {
    text = url
  }

  // TODO: improve settings
  return (
    <QRCodeSVG value={text!} size={128} style={{ margin: '10px' }} />
  )
}

export default QRGen
