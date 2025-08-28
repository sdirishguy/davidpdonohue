import { test, expect } from '@playwright/test'

test('home to projects', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/DavidPDonohue/i)
  await page.getByRole('link', { name: /projects/i }).click()
  await expect(page).toHaveURL(/\/projects$/)
})
