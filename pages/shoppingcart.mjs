import {expect} from "@playwright/test";
export class shoppingcart{
    constructor(page){
        this.page=page;
    }
    async navigation(){
        await this.page.goto('https://www.demoblaze.com/');
    }
    //Verify user can add a product to the cart
    async addproduct(){
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForSelector('.name', { state: 'visible' });
        await expect(this.page.locator('.name')).toBeVisible();
        await this.page.locator('.btn.btn-success.btn-lg').click();
    }

    //->>>Verify success message appears after adding item
    async succmeg(){
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForSelector('.name', { state: 'visible' });
        //await expect(this.page.locator('.name')).toBeVisible();
        await this.page.locator('.btn.btn-success.btn-lg').click();
        
        await this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Product added");
            await dialog.accept();
        });
        
    }

    //->>>Verify correct product name is added
    async correctname(){
        await this.page.locator('.hrefch').first().click();
        const name=(await this.page.locator('.name').textContent()).trim();
        await expect(this.page.locator('.name')).toBeVisible();
        
        await Promise.all([
            this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
            this.page.click('.btn.btn-success.btn-lg')
        ]);
        
        
        await this.page.locator('#cartur').click();
        //await this.page.waitForSelector('#tbodyid tr', { state: 'visible' });
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(1);
        const name1=(await this.page.locator('#tbodyid tr td:nth-child(2)').textContent());
        await expect(name).toBe(name1);

    }

    //->Verify correct product price is added
    async correctprice(){
        const price1=await this.page.locator('.card-block h5').first().textContent();
        const cleanprice1=price1.replace(/[^0-9]/g,"");
        await this.page.locator('.hrefch').first().click();

        await Promise.all([
            this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
            this.page.locator('.btn.btn-success.btn-lg').click()
        ]);
        //await this.page.locator('.btn.btn-success.btn-lg').click();
    
        await this.page.locator('#cartur').click();
        //await this.page.waitForSelector('#tbodyid tr', { state: 'visible' });
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(1,{ timeout: 10000 });
        const price2=await this.page.locator('#tbodyid tr td:nth-child(3)').first().textContent();
        await expect(cleanprice1).toBe(price2);


    }

    //->>>Verify multiple different products can be added
    async multi(){
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('.name')).toBeVisible();
        const name1=(await this.page.locator('.name').textContent()).trim();
        
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.nav-link').first().click();
        await this.page.waitForSelector('.hrefch',{timeout:10000});

        await this.page.locator('.hrefch').nth(1).click();
        const secondProduct = await this.page.locator('.name').textContent();
        
        
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.nav-link').first().click();
        await this.page.waitForSelector('.hrefch',{timeout:10000});

        await this.page.locator('#cartur').click();
        await this.page.waitForSelector('#tbodyid tr',{timeout:10000});
         const cartProducts = await this.page.locator('#tbodyid tr td:nth-child(2)').allTextContents();
         console.log(cartProducts);
         expect(cartProducts).toContain(name1);
         expect(cartProducts).toContain(secondProduct);


    }

    //->>>Verify cart page loads successfully
    async cartload(){
        
        await this.page.locator('.hrefch').first().click();
        await Promise.all([
            this.page.waitForEvent('dialog').then(d => d.accept()),
            this.page.locator('.btn.btn-success.btn-lg').click()
        ]);
        //await this.page.locator('.btn.btn-success.btn-lg').click()
        
        await this.page.locator('#cartur').click();
        await expect(this.page).toHaveURL(/cart.html/);
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(1);
        await expect(this.page.locator('#tbodyid tr')).toBeVisible();
    }

    //->>>Verify cart is empty when no products are added
    async empty(){
        await this.page.locator('#cartur').click();
        await expect(this.page.locator("#tbodyid tr")).toHaveCount(0);
    }

    //->>>Verify user can delete product from cart and verify cart were updated
    async delcart(){
        
        await this.page.locator('.hrefch').first().click();
        await Promise.all([
            this.page.waitForEvent('dialog').then(d => d.accept()),
            this.page.locator('.btn.btn-success.btn-lg').click()
        ]);
        //await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.locator('#cartur').click();
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(1);
        await this.page.getByRole('link',{name:'Delete'}).click();
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(0);
    }

    //->>>verify weather user can able to deltet product or not in cart
    async del(){
        await this.page.locator('.hrefch').first().click();
        await Promise.all([
            this.page.waitForEvent('dialog').then(d => d.accept()),
            this.page.locator('.btn.btn-success.btn-lg').click()
        ]);
        await this.page.locator('#cartur').click();
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(1);
        await this.page.getByRole('link',{name:'Delete'}).click();
    }

    //verify we can delete all the products form cart
    async delmulti(){
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('.name')).toBeVisible();
        const name1=(await this.page.locator('.name').textContent()).trim();
        
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.nav-link').first().click();
        await this.page.waitForSelector('.hrefch',{timeout:10000});

        await this.page.locator('.hrefch').nth(1).click();
        const secondProduct = await this.page.locator('.name').textContent();
        
        
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.nav-link').first().click();
        await this.page.waitForSelector('.hrefch',{timeout:10000});

        await this.page.locator('#cartur').click();
        await this.page.waitForSelector('#tbodyid tr',{timeout:10000});
         const cartProducts = await this.page.locator('#tbodyid tr td:nth-child(2)').allTextContents();
         console.log(cartProducts);
         expect(cartProducts).toContain(name1);
         expect(cartProducts).toContain(secondProduct);
         await this.page.getByRole('link',{name:'Delete'}).first().click();
         await expect(this.page.locator('#tbodyid tr')).toHaveCount(1);
         await this.page.getByRole('link',{name:'Delete'}).click();

    }

}