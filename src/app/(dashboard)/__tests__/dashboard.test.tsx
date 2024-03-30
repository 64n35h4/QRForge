import {
  describe, expect, test, vi,
} from 'vitest'
import {
  render,
} from '@testing-library/react'
import * as SWR from 'swr'
import { QR_TYPE } from '@prisma/client'
import Page from '../page'

describe('Dyanmic', () => {
  test('spinner component renders', () => {
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: Promise.resolve,
    }))
    const result = render(<Page />)
    const spinnerSection = result.container.querySelector('#loading-spinner')
    expect(spinnerSection).toBeDefined()
  })

  test('error component renders', () => {
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: undefined,
      error: true,
      isLoading: false,
      isValidating: false,
      mutate: Promise.resolve,
    }))
    const result = render(<Page />)
    const errorSection = result.container.querySelector('#error-section')
    expect(errorSection).toBeDefined()
  })

  test('dashboard renders', () => {
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: {
        [QR_TYPE.DYNAMIC]: 1,
        [QR_TYPE.STATIC]: 2,
      },
      error: false,
      isLoading: false,
      isValidating: false,
      mutate: Promise.resolve,
    }))
    const result = render(<Page />)
    const dynamicSection = result.container.querySelector('#summary-dynamic')
    expect(dynamicSection?.innerHTML).toEqual('1')

    const staticSection = result.container.querySelector('#summary-static')
    expect(staticSection?.innerHTML).toEqual('2')
  })
})
