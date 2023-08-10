import { test, expect } from '@playwright/test';

let ts

test('As a new user, When I click join at the event, then I am able to join', async ({ page }) => {
    ts = Date.now()
    await page.goto('https://meetabit.com/events/duck-game-night-at-cirit');
    await page.getByRole('link', { name: 'Attend' }).click();
    await page.getByPlaceholder('First and Last Name').click();
    await page.getByPlaceholder('First and Last Name').fill(`duckgame${ts}`);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(`duckgame${ts}@game.com`);
    await page.getByRole('button', { name: 'Attend' }).click();
});

test("As an organizer, I can kick the guy out just joined because I don't like him", async ({ page }) => {
    await page.goto('https://meetabit.com/events/duck-game-night-at-cirit');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email').fill('otndottcbuy@gmail.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').fill('saunaman');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: 'Thu 10 Aug Duck game night at Cirit!' }).click();
    await page.getByRole('link', { name: ' attendee' }).click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => { });
    });
    await page.locator('li').filter({ hasText: `duckgame${ts} Remove` }).getByRole('button').click();
    //await expect()
});