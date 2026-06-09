const { test, expect, devices } = require('@playwright/test');
const path = require('path');

// Dynamically resolves the absolute file system path to your index.html file
const LOCAL_SITE_URL = `file://${path.resolve(__dirname, '../index.html')}`;

test.describe('Apple Portfolio Core Suite', () => {

    // Automatically runs before each test to ensure the page opens correctly
    test.beforeEach(async ({ page }) => {
        await page.goto(LOCAL_SITE_URL);
    });

    test('Desktop Layout Validation: Verification of critical structural elements', async ({ page }) => {
        // 1. Assert title tag matches your identity specifications
        await expect(page).toHaveTitle(/Shivi Prabhakar/);

        // 2. Verify global navbar visibility and branding presence
        const logo = page.locator('#nav-logo');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveText('S.PRABHAKAR');

        // 3. Verify Bento specification grid cards loaded securely onto DOM
        const bentoContainer = page.locator('#bento-container');
        await expect(bentoContainer).toBeVisible();
        
        // Confirms all 4 structural bento spec cards are present in the DOM layout
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
        
        // Navigate to the local file URL inside the simulated mobile device
        await page.goto(LOCAL_SITE_URL);

        // Ensure main container text elements read cleanly on mobile screen widths
        const heroHeading = page.locator('#hero-text');
        await expect(heroHeading).toBeVisible();

        // Verify responsive header styles scaled cleanly (ensures text doesn't overflow mobile width boundaries)
        const bounds = await heroHeading.boundingBox();
        expect(bounds.width).toBeLessThan(430); 

        await iPhoneContext.close();
    });
});