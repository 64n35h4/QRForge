import {
  describe, expect, test, vi,
} from 'vitest'
import * as SWR from 'swr'
import { render } from '@testing-library/react'
import Page from '../create/page'

describe('Static Create', () => {
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
})
