const { test, expect } = require('@playwright/test');
const path = require('path');

// Points to your local file system resolved path
const LOCAL_SITE_URL = `file://${path.resolve(__dirname, '../index.html')}`; 

test.describe('Apple Portfolio Core Suite', () => {

    test('Header and Branding: Verification of critical structural elements', async ({ page }) => {
        await page.goto(LOCAL_SITE_URL);

        // 1. Assert title tag matches name
        await expect(page).toHaveTitle(/Shivi Prabhakar/);

        // 2. Verify global navbar visibility and branding presence
        const logo = page.locator('#nav-logo');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveText('S.PRABHAKAR');
    });

    test('Bento Grid: Check that specification cards loaded securely', async ({ page }) => {
        await page.goto(LOCAL_SITE_URL);

        const bentoContainer = page.locator('#bento-container');
        await expect(bentoContainer).toBeVisible();
        
        // Confirms all 4 structural bento spec cards are present
        const cards = bentoContainer.locator('.glass-card');
        const count = await cards.count();
        expect(count).toBe(4); 
    });

    test('Experience Section Scrollytelling: Verify slides fade in/out during scrolling', async ({ page }) => {
        await page.goto(LOCAL_SITE_URL);

        // Access the slide elements
        const slides = page.locator('.exp-slide');
        
        // Helper to scroll and check slide visibility
        const verifySlideVisible = async (scrollY, visibleIndex) => {
            await page.evaluate((y) => {
                window.scrollTo(0, y);
                // Dispatch scroll event and force GSAP update
                window.dispatchEvent(new Event('scroll'));
                if (window.ScrollTrigger) window.ScrollTrigger.update();
            }, scrollY);
            
            // Wait brief moment for scrub to catch up
            await page.waitForTimeout(600);
            
            // Assert slide is visible (opacity > 0.8)
            const opacity = await slides.nth(visibleIndex).evaluate(el => window.getComputedStyle(el).opacity);
            expect(parseFloat(opacity)).toBeGreaterThan(0.8);
        };

        // Scroll sequentially to check each slide's scrollytelling transition
        await verifySlideVisible(800, 0);   // Slide 1: Profile
        await verifySlideVisible(1400, 1);  // Slide 2: Active Leadership
        await verifySlideVisible(2000, 2);  // Slide 3: RBC SDET
        await verifySlideVisible(2600, 3);  // Slide 4: Previous Lead
        await verifySlideVisible(3200, 4);  // Slide 5: History cards
    });
});