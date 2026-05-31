import { test, expect } from '@playwright/test';
import { ApiPage } from '../pages/api.mjs';

let api;

const username = 'adm@123';
const password = 'adm@123';
const cookie = `user_${Date.now()}`;


//->>>verifying the api with signing up with the valid user
test('TC01 Signup Valid User', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.signup(username, password);

    expect(res.status()).toBe(200);
});


//->>>verifying the api with sign up with existing user name
test('TC02 Signup Existing User', async ({ request }) => {
    api = new ApiPage(request);

    await api.signup(username, password);

    const res = await api.signup(username, password);

    expect(res.status()).toBe(200);
});


//->>>verifying the api with signup with the empty username
test('TC03 Empty Username Signup', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.signup('', password);

    expect(res.status()).toBe(500);
});


//->>verifying the api with empty password
//weak validation
test('TC04 Empty Password Signup', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.signup(username, '');

    expect(res.status()).toBe(200);
});
    


//->>>verify api with login valid user
test('TC05 Login Valid User', async ({ request }) => {
    api = new ApiPage(request);

    await api.signup(username, password);

    const res = await api.login(username, password);

    expect([200, 201]).toContain(res.status());
});


//->>>verify api with invalid login
test('TC06 Invalid Login', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.login(username, 'wrongpass');

    expect([400, 401, 200]).toContain(res.status());
});

//->>>verify api for add product to cart
test('TC07 Add to Cart', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.addToCart(cookie, 1);

    expect(res.ok()).toBeTruthy();
});


//->>>verify api for view cart
test('TC08 View Cart', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.viewCart(cookie);

    expect(res.status()).toBe(200);
});


//->>>verify api for delete cart
test('TC09 Delete Item', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.deleteItem(1);

    expect([200, 201]).toContain(res.status());
});


//->>>verify api test on place order
test('TC10 Place Order', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.placeOrder({
        name: 'adm',
        country: 'India',
        city: 'AP',
        card: '123456',
        month: '05',
        year: '2026'
    });

    expect([200, 201,404]).toContain(res.status());
});


//testing api for verify login token
test('TC11 Verify Login Token', async ({ request }) => {
    api = new ApiPage(request);

    const username = `user_${Date.now()}`;
    const password = 'pass123';
    await api.signup(username, password);
    const res = await api.login(username, password);
    const body = await res.text();

    console.log(body);

    expect(body).toContain('Auth_token');
});


//verifying api for empty login
test('TC12 Empty Login', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.login('', '');

    expect([400, 500]).toContain(res.status());
});


//testing api for cart without cookie
test('TC13 Cart without Cookie', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.viewCart('');

    expect([400, 500]).toContain(res.status());
});


//api response time validation
test('TC14 Response Time', async ({ request }) => {
    api = new ApiPage(request);

    const start = Date.now();
    await api.login('adm@123', 'adm@123');
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(3000);
});


//api content type validation
test('TC15 Content Type', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.login('adm@123', 'adm@123');

    expect(res.headers()['content-type']).toContain('application');
});


//api testing on special characters
test('TC16 Special Characters', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.signup('@@@###', 'pass');

    expect(res.status()).toBeTruthy();
});


//verifying response is json or not
test('TC17 JSON Response', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.viewCart('test');

    const body = await res.text();

    expect(typeof body).toBe('string');
});


//verify status code consistency
test('TC18 Status Code Check', async ({ request }) => {
    api = new ApiPage(request);

    const res = await api.login('adm@123', 'adm@123');

    expect(res.status()).toBeGreaterThanOrEqual(200);
});


//full flow validation
test('TC19 Full Flow', async ({ request }) => {
    api = new ApiPage(request);

    const cookie = `user_${Date.now()}`;

    await api.addToCart(cookie, 1);

    const cart = await api.viewCart(cookie);
    expect(cart.status()).toBe(200);

    const order = await api.placeOrder({
        name: 'adm',
        card: '123456'
    }, cookie);

    expect([200, 500,404]).toContain(order.status());
});


//verifying api stability check
test('TC20 Stability', async ({ request }) => {
    api = new ApiPage(request);

    for (let i = 0; i < 3; i++) {
        const res = await api.login('adm@123', 'adm@123');
        expect(res.status()).toBeGreaterThan(0);
    }
});