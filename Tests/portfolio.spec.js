const { test, expect, devices } = require('@playwright/test');

// Points to your local Live Server instance
const LOCAL_SITE_URL = 'http://127.0.0.1:5500/index.html'; 

test.describe('Apple Portfolio Core Suite', () => {

    test('Desktop Layout Validation: Verification of critical structural elements', async ({ page }) => {
        await page.goto(LOCAL_SITE_URL);

        // 1. Assert title tag matches your name [cite: 1]
        await expect(page).toHaveTitle(/Shivi Prabhakar/);

        // 2. Verify global navbar visibility and branding presence
        const logo = page.locator('#nav-logo');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveText('S.PRABHAKAR');

        // 3. Verify Bento specification grid cards loaded securely onto DOM
        const bentoContainer = page.locator('#bento-container');
        await expect(bentoContainer).toBeVisible();
        
        // Confirms all 4 structural bento spec cards are present
        const cards = bentoContainer.locator('.glass-card');
        const count = await cards.count();
        expect(count).toBe(4); 
    });

    test('Mobile Responsiveness Verification: Render validation under Mobile Safari parameters', async ({ browser }) => {
        // Emulate an iPhone 14 layout viewport
        const iPhoneContext = await browser.newContext({
            ...devices['iPhone 14'],
        });
        const page = await iPhoneContext.newPage();
        await page.goto(LOCAL_SITE_URL);

        // Ensure main container text reads cleanly on mobile screen widths
        const heroHeading = page.locator('#hero-text');
        await expect(heroHeading).toBeVisible();

        // Verify responsive header styles scaled cleanly (doesn't overflow the phone screen width)
        const bounds = await heroHeading.boundingBox();
        expect(bounds.width).toBeLessThan(430); 

        await iPhoneContext.close();
    });
});