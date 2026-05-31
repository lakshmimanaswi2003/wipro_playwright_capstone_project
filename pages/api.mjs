export class ApiPage {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://api.demoblaze.com';
    }

    async signup(username, password) {
        return await this.request.post(`${this.baseURL}/signup`, {
            data: { username, password }
        });
    }

    async login(username, password) {
        return await this.request.post(`${this.baseURL}/login`, {
            data: { username, password }
        });
    }

    async addToCart(cookie, prod_id) {
        return await this.request.post(`${this.baseURL}/addtocart`, {
            data: { id: Date.now(), cookie, prod_id, flag: true }
        });
    }

    async viewCart(cookie) {
        return await this.request.post(`${this.baseURL}/viewcart`, {
            data: { cookie, flag: true }
        });
    }

    async deleteItem(id) {
        return await this.request.post(`${this.baseURL}/deleteitem`, {
            data: { id }
        });
    }

    async placeOrder(orderData) {
        return await this.request.post(`${this.baseURL}/byorder`, {
            data: orderData
        });
    }
}