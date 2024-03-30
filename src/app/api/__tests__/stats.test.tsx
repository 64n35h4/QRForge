import {
  describe, expect, test,
} from 'vitest'
import { QR_TYPE } from '@prisma/client'
import { GET } from '../stats/route'

describe('stats tests', () => {
  test('stats', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(
      {
        [QR_TYPE.DYNAMIC]: 0,
        [QR_TYPE.STATIC]: 0,
      },
    )
  })
})
