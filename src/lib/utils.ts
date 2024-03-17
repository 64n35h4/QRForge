/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'

export const fetcher = ({ url, params }: any) => axios.get(url, { params }).then((res) => res.data)

export const plural = (array: any, yes: string, no: string) => (array?.langth ? yes : no)
