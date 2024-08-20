import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '../setupTest';

// US test cases, TODO: grab it from the config
const testCases = [
    {},
    { amount: 100, account: 'DEV_US_SHORT_TERM' },
    { amount: 200, account: 'DEV_US_SHORT_TERM_CHECKOUT' },
    { amount: 200, account: 'DEV_US_SHORT_TERM_PL2GO' },
    { amount: 200, account: 'DEV_US_LONG_TERM', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_LONG_TERM_CHECKOUT', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_LONG_TERM_PL2GO', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 100, account: 'DEV_US_NO_INTEREST', offer: 'NI' }
];

test.describe('sdk', () => {
    test('message should not have any automatically detectable accessibility issues', async ({ sdkMessage }) => {
        await Promise.all(
            testCases.map(async ({ account, amount, offer }) => {
                await test.step(`accessibility test for ${account}`, async () => {
                    // Navigate to page
                    const page = await sdkMessage({ amount, account, offer });

                    const zoidIFrame = await page.$('iframe[name*="__zoid__paypal_message__"]');
                    const messageIframe = await zoidIFrame.contentFrame();

                    const button = await messageIframe.$('button');
                    // TODO: 'best-practice' and 'wcag2aa' are resulting in errors, investigate
                    const results = await new AxeBuilder({ page })
                        .include(button, messageIframe)
                        .withTags(['wcag2a', 'wcag21a', 'wcag21aa'])
                        .analyze();

                    expect(results.violations).toEqual([]);
                });
            })
        );
    });
});
