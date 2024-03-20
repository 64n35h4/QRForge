/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'

export const fetcher = ({ url, params }: any) => axios.get(url, { params }).then((res) => res.data)

export const plural = (array: any, yes: string, no: string) => (array?.langth ? yes : no)

export const isValidUrl = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  )
  return pattern.test(str)
}
