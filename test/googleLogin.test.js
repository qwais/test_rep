const puppeteer = require('puppeteer');
const CONFIG = require('../config');
const SELECTORS = require('./selectors');


describe('Google login',()=>{

let browser;
let page;

    beforeAll(async ()=>{
        browser = await puppeteer.launch({headless:false});
        page = await browser.newPage();
        await page.goto(CONFIG.baseUrl);
    });

    afterAll(async ()=>{
        await page.screenshot({path: 'googleAuth.png'});
        await browser.close();
    });

    test('email input validation',async () => {

        await page.click(SELECTORS.loginButton);
        await page.waitFor(SELECTORS.emailInputField);
        await page.type(SELECTORS.emailInputField, CONFIG.invalidEmail);
        await page.click(SELECTORS.continueButtonEmail);
        await page.waitFor(500);

        const validation = await page.$eval(SELECTORS.emailInputField,
            element => element.getAttribute("aria-invalid"));
        await expect(validation).toBe('true');

    });

    test('proceed to password',async () => {

        const inputField = await page.$(SELECTORS.emailInputField);
        await inputField.click({clickCount:3});
        await inputField.type('');
        await inputField.type(CONFIG.email);
        await page.click(SELECTORS.continueButtonEmail);
        await page.waitFor(SELECTORS.profileEmail);

        const profileEmail = await page.$eval(SELECTORS.profileEmail,
            element => element.textContent);
        await expect(profileEmail).toBe(CONFIG.email);
    });

    test('password input validation',async () => {

        await page.waitFor(SELECTORS.passwordInputField);
        await page.$eval(SELECTORS.passwordInputField, element => element.value = CONFIG.invalidPassword);
        await page.waitFor(500);
        await page.click(SELECTORS.continueButtonPassword);
        await page.waitFor(500);


        const validation = await page.$eval('[type="password"]',
            element => element.getAttribute("aria-invalid"));

        await expect(validation).toBe('true');

    });

    test('Complete login',async () => {

        const inputField = await page.$(SELECTORS.passwordInputField);
        await inputField.click({clickCount:3});
        await inputField.type('');
        await inputField.type(CONFIG.password);
        await page.waitFor(500);
        await page.click(SELECTORS.continueButtonPassword);
        await page.waitFor(500);

        //there would be an expet, but captcha)

    });
});


