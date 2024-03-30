import {
  describe, expect, test, vi,
} from 'vitest'
import {
  fireEvent, render,
} from '@testing-library/react'
import * as SWR from 'swr'
import * as Nav from 'next/navigation'
import mockRouter from 'next-router-mock'
import Page from '../page'

describe('Static', () => {
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

  test('navigate to create', async () => {
    vi.spyOn(Nav, 'usePathname').mockImplementation(() => '/qr/static')
    vi.spyOn(SWR, 'default').mockImplementation(() => ({
      data: undefined,
      error: true,
      isLoading: false,
      isValidating: false,
      mutate: Promise.resolve,
    }))

    const result = render(<Page />)
    const addNewBtnSection = result.container.querySelector('#add-new-button')
    fireEvent.click(addNewBtnSection!)

    expect(mockRouter).toMatchObject({
      asPath: '/qr/static/create',
    })
  })
})
