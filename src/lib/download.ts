import * as htmlToImage from 'html-to-image'

const QRDownload = (rowIndex: number) => {
  const divElement = document.getElementById(`qr_${rowIndex}`)
  if (!divElement) return
  htmlToImage
    .toPng(divElement, { skipFonts: true })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'qr-code.png'
      link.click()
    })
    .catch(() => {
      // TODO handle toast
    })
}

export default QRDownload
