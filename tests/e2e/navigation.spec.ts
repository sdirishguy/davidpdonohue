import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate from home to projects', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/DavidPDonohue/i)
    
    // Wait for the page to load and navigation to be visible
    await page.waitForSelector('nav', { timeout: 5000 })
    
    // Click on Projects link
    await page.getByRole('link', { name: /projects/i }).click()
    
    // Verify we're on the projects page
    await expect(page).toHaveURL(/\/projects/)
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible()
  })

  test('should navigate through all main sections', async ({ page }) => {
    const sections = [
      { name: 'Personal', url: '/about' },
      { name: 'Professional', url: '/professional' },
      { name: 'Projects', url: '/projects' },
      { name: 'Content', url: '/content' },
      { name: 'Contact', url: '/contact' }
    ]

    await page.goto('/')

    for (const section of sections) {
      await page.getByRole('link', { name: new RegExp(section.name, 'i') }).click()
      await expect(page).toHaveURL(new RegExp(section.url))
      await page.waitForLoadState('networkidle')
    }
  })
})