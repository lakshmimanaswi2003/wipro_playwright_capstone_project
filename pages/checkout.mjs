import {expect} from "@playwright/test";
export class checkout{
    constructor(page){
        this.page=page;
        this.cart=this.page.locator('#cartur');
        this.placeorder=this.page.locator('.btn.btn-success');
        this.pname=this.page.locator('#name');
        this.pcountry=this.page.locator('#country');
        this.pcity=this.page.locator('#city');
        this.pcard=this.page.locator('#card');
        this.pmonth=this.page.locator('#month');
        this.pyear=this.page.locator('#year');
        this.firstproduct=this.page.locator('.hrefch').first();
        this.addtocart=this.page.locator('.btn.btn-success.btn-lg');
        this.purchase=this.page.getByRole('button', { name: 'Purchase' });

    }

    async handlingfun(){
        await Promise.all([
            this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
            this.addtocart.click()
        ]);
    }
    async emptyhandelingfun(){
        const dialog = await this.page.waitForEvent('dialog');
        await this.purchase.click();
        await expect(dialog.message()).toContain('Please fill');
        await dialog.accept();
    }

    //->>>verify weather the checkout button is visible or not 
    async navigation(){
        await this.page.goto("https://www.demoblaze.com/");
    }
    async checkoutbutton(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
    }

    //->>>verify all the name field in the order page are visible
    async namefie(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pname).toBeVisible();

    }

    //->>>verify weather the country field is visible or not in order page
    async confie(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pcountry).toBeVisible();
    }

    //->>>verify the city field in the order page is visible or not
    async cityfie(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pcity).toBeVisible();
    }

    //->>verify the creditcard field in the order page is visible or not
    async credit(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pcard).toBeVisible();
    }

    //->>>verify weather the month field in the order form is visible or not
    async monthfield(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pmonth).toBeVisible();
    }

    //->>>verify weather the year field in the order form is visible or not
    async yearfield(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await expect(this.pyear).toBeVisible();
    }

    //->>>verify weather the user is able to fill the data in order form
    async vop(){
        await this.firstproduct.click();
        await this.handlingfun();
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await expect(this.pname).toHaveValue('John');


    }

    //->>>users can able to click the purchace button after filling
    async purchaceclick(){
        await this.firstproduct.click();
        await this.handlingfun();
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await expect(this.pname).toHaveValue('John');
        await this.purchase.click();
    }

    //->>>Vlidate weather the order is placed or not
    async validform(){
        await this.firstproduct.click();
        await this.handlingfun();
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await expect(this.pname).toHaveValue('John');
        await this.purchase.click();
        await expect(this.page.locator('.lead.text-muted')).toBeVisible();
        await this.page.locator('.confirm.btn.btn-lg.btn-primary').click();
    }

    //->>>validate empty form submission
    async empty(){
         await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>verify weather name only filled in the form
    async nameformfill(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>verifying missing card details
    async misscard(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>verifying missing country
    async miscou(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.pname.fill('John');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>verifying missing month
    async mismon(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pyear.fill('2026');
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>verifying missing year
    async misyear(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
    }

    //->>>Form resets after successful order
    async formreset(){
        await this.firstproduct.click();
        await this.handlingfun();
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.pyear.fill('2026');
        await expect(this.pname).toHaveValue('John');
        await this.purchase.click();
        await expect(this.page.locator('.lead.text-muted')).toBeVisible();
        await this.page.locator('.confirm.btn.btn-lg.btn-primary').click();
        await expect(this.page.locator('#nava')).toBeVisible();
    }

    //->>>verify close button works or not
    async closebutton(){
        await this.cart.click();
        await expect(this.placeorder).toBeVisible();
        await this.placeorder.click();
        await this.pname.fill("john");
        await this.pname.fill('John');
        await this.pcountry.fill('India');
        await this.pcity.fill('Hyderabad');
        await this.pcard.fill('123456789012');
        await this.pmonth.fill('05');
        await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out');
            await dialog.accept();
        });
        await this.purchase.click();
        await this.page.locator('//*[@id="orderModal"]/div/div/div[3]/button[1]').click();
    }
    

    
}