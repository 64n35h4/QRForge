import { describe, expect, test } from 'vitest'
import { isValidUrl } from '../utils'

describe('utils', () => {
  test('isValidUrl true', () => {
    const url1 = isValidUrl('https://this.is.a.url')
    const url2 = isValidUrl('http://this.is.com/id?url=test')
    const url3 = isValidUrl('http://10.30.23.43:4000')

    expect(url1).toBeTruthy()
    expect(url2).toBeTruthy()
    expect(url3).toBeTruthy()
  })

  test('isValidUrl false', () => {
    const url4 = isValidUrl('https://this.is.a')
    const url5 = isValidUrl('www.k')
    const url6 = isValidUrl('ftp://this.local')

    expect(url4).toBeFalsy()
    expect(url5).toBeFalsy()
    expect(url6).toBeFalsy()
  })
})
