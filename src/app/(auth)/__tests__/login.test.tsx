import {
  describe, expect, test,
} from 'vitest'
import {
  render,
} from '@testing-library/react'
import Page from '../login/page'

describe('Login Page', () => {
  test('login page renders', () => {
    const result = render(<Page />)
    const loginSection = result.container.querySelector('#login-section')
    expect(loginSection).toBeDefined()
  })
})
