import {
  describe, expect, test, vi,
} from 'vitest'
import * as SWR from 'swr'
import { render } from '@testing-library/react'
import Page from '../[id]/edit/page'
import { mockData } from './mocks'

describe('Dynamic Edit', () => {
  test('spinner component renders', () => {
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: Promise.resolve,
    }))
    const result = render(<Page params={{ id: '11' }} />)
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
    const result = render(<Page params={{ id: '11' }} />)
    const errorSection = result.container.querySelector('#error-section')
    expect(errorSection).toBeDefined()
  })

  test('error component renders', () => {
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: mockData[0],
      error: false,
      isLoading: false,
      isValidating: false,
      mutate: Promise.resolve,
    }))
    const result = render(<Page params={{ id: '11' }} />)
    expect(result.container).toBeDefined()
  })
})
