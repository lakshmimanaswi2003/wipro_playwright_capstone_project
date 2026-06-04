import {expect} from "@playwright/test";
export class navi{
    constructor(page){
        this.page=page;
        this.home=this.page.getByText('Home');
        this.cart=this.page.locator('#cartur');
        this.contact=this.page.getByRole('link',{name:'Contact'});
        this.aboutus=this.page.getByRole('link',{name:'About us'});
        this.login=this.page.locator('#login2');
        this.signin=this.page.locator('#signin2');
        this.phones=this.page.getByRole('link',{name:'Phones'});
        

    }
    async navigation(){
        await this.page.goto('https://www.demoblaze.com/');
    }
    //->>>Verify Home Navigation
    async homnav(){
        await this.home.click();
        await expect(this.page).toHaveURL(/index.html/);
    }

    //->>>verify cart navigation
    async cartnavi(){
        await this.cart.click();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    //->>>verify contact navigation
    async contanavi(){
        await this.contact.click();
        await expect(this.page.locator('#exampleModalLabel')).toHaveText("New message");
        
    }

    //->>>verify about us navigation
    async abnavi(){
        await this.aboutus.click();
        await expect(this.page.locator('#videoModalLabel')).toHaveText("About us");
    }

    //->>>verify login navigation
    async lognav(){
        await this.login.click();
        await expect(this.page.locator('#logInModalLabel')).toHaveText("Log in");
    }

    //->>>verify signin navigation
    async signav(){
        await this.signin.click();
        await expect(this.page.locator('#signInModalLabel')).toHaveText("Sign up");
    }

    //->>>Verify navigation from cart to home
    async cth(){
        await this.cart.click();
        await this.home.click();
        await expect(this.page).toHaveURL(/index.html/);
    }

    //->>>Verify Navigation Works After Page Refresh
    async pgref(){
        await this.page.reload();
        await this.cart.click();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    //->>>Verify All Navbar Links Visible
    async alllinks(){
        await expect(this.home).toBeVisible();
        await expect(this.cart).toBeVisible();
        await expect(this.contact).toBeVisible();
        await expect(this.aboutus).toBeVisible();
        await expect(this.login).toBeVisible();
        await expect(this.signin).toBeVisible();
    }

    //->>>Verify Clicking Logo Redirects to Home
    async logolink(){
        await this.cart.click();
        await this.page.locator('img[src="blazemeter-favicon-512x512.png"]').click();
        await expect(this.page).toHaveURL(/index.html/);
    }

    //->>>Verify Multiple Navigation Clicks
    async multnav(){
        await this.cart.click();
        await this.home.click();
        await this.cart.click();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    //->>>Verify Navigation Link Clickable
    async nlc(){
        await expect(this.cart).toBeEnabled();
    }

    //->>>Verify No Broken Navigation
    async brokennavi(){
        await this.cart.click();
        await expect(this.page.locator('#tbodyid')).toHaveCount(1);

    }

    //->>>Verify Navigation Using Keyboard (Accessibility)
    async keyboartacc(){
        await this.cart.click();
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Enter');
        await expect(this.page).toHaveURL(/index.html/);
    }

    //->>>Verify Modal login Does Not Affect Navigation
    async affnavi(){
        await this.login.click();
        await this.page.locator('#loginusername').fill('adm@123');
        await this.page.locator('#loginpassword').fill('adm@123');
        await this.page.locator('button[onclick="logIn()"]').click();
        await this.cart.click();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    //->>>verify clicking the phones redirect to phones page
    async phoneredir(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page).toHaveURL(/idp_=1/);
    }

    //->>>verify clicking the laptops redirect to laptops page
    async lapredir(){
        await this.page.locator('.hrefch').nth(7).click();
        await expect(this.page).toHaveURL(/idp_=8/);
    }

    //->>>verify clicking the monitors redirect to monitors page
    async moniredir(){
        await this.page.getByRole('link',{name:'Monitors'}).click();
        await this.page.locator('//*[@id="tbodyid"]/div[1]/div/div/h4/a').first().click();
        await expect(this.page).toHaveURL(/idp_=1/);
    }

}