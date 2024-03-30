import { describe, expect, test } from 'vitest'
import { GET } from '../health/route'

describe('health tests', () => {
  test('health', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(
      { health: true },
    )
  })
})
