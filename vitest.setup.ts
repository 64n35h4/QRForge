/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { vi } from 'vitest'
import '@testing-library/jest-dom'

vi.spyOn(console, 'error').mockImplementation(() => {})

vi.mock('next/navigation', () => ({
  // eslint-disable-next-line global-require
  ...require('next-router-mock'),
  useSearchParams: () => [new URLSearchParams({ revalidate: '1' })],
  usePathname: vi.fn(),
}))

vi.mock('next-auth/next', async (importOriginal) => {
  const actual = await importOriginal() as any
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { id: '111', username: 'admin' },
  }
  return {
    __esModule: true,
    ...actual,
    getServerSession: vi.fn(
      () => ({ ...mockSession }),
    ),
    useSession: vi.fn(
      () => ({ ...mockSession }),
    ),
  }
})

vi.mock('swr')

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal() as any
  return {
    ...actual,
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  }
})
