import {expect} from '@playwright/test';
export class productdetails{
    constructor(page){
        this.page=page;
    }
    //verify weather the product details page is loaded correctly or not
    async navigation(){
        await this.page.goto("https://www.demoblaze.com/");
    }
    async pageload(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page).toHaveURL(/idp_=1/);
        //console.log(this.page.url());
    }

    //verify weather product name is visible or not
    async visname(){
        await this.page.locator(".hrefch").first().click();
        await expect(this.page.locator('.name')).toBeVisible();
    }

    //->>>Verify Product Price is Displayed correctly in the homepage and the details page
    async correctdisplay(){
        const price1=await this.page.locator('//*[@id="tbodyid"]/div[1]/div/div/h5').textContent();
        //console.log(price1);
        const cleanprice1=price1.replace(/[^0-9]/g,"");
        await this.page.locator(".hrefch").first().click();
        await expect(this.page.locator('//*[@id="tbodyid"]/h3')).toBeVisible();
        const price2=await this.page.locator('//*[@id="tbodyid"]/h3').textContent();
        //console.log(price2);
        const cleanprice2=price2.replace(/[^0-9]/g,"");
        //console.log(cleanprice2);
        await expect(cleanprice1).toBe(cleanprice2);
    }

    //->>>verify weather the product name is correctly displayed in homepage and the details
    async namedisplay(){
        const name1=await this.page.locator('.hrefch').first().textContent();
        //console.log(name1);
        await this.page.locator('.hrefch').first().click();
        await expect(await this.page.locator('//*[@id="tbodyid"]/h2')).toBeVisible();
        const name2=await this.page.locator('//*[@id="tbodyid"]/h2').textContent();
        await expect(name1).toBe(name2);
    }

    //->>>verifying the core details are same or not in both home page and details page
    async coredisplay(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('//*[@id="more-information"]/p')).toBeVisible();
        const text=await this.page.locator('//*[@id="more-information"]/p');
        await expect(text).toContainText('1.5GHz octa-core');
    }

    //->>>verifying the processor details are same or not in both home page and details page
    async processordisplay(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('//*[@id="more-information"]/p')).toBeVisible();
        const text=await this.page.locator('//*[@id="more-information"]/p');
        await expect(text).toContainText('7420 processor');
    }

    //->>>verigying the RAM details are same or not in both home page and details page
    async ramdisplay(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('//*[@id="more-information"]/p')).toBeVisible();
        const text=await this.page.locator('//*[@id="more-information"]/p');
        await expect(text).toContainText(' 3GB of RAM.');
    }

    //->>>verifying the internalstorage details are same or not in both homepage and details page
    async internalstorage(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('//*[@id="more-information"]/p')).toBeVisible();
        const text=await this.page.locator('//*[@id="more-information"]/p');
        await expect(text).toContainText('32GB of internal storage');
    }

    //->>>Verifying the image in the home page is same as the image in the details page
    async imagedisplay(){
        const image1=await this.page.locator(".card-img-top.img-fluid").first();
        const image1src=await image1.getAttribute('src');
        //console.log(image1src);
        await this.page.locator('.card-img-top.img-fluid').first().click();
        await expect(this.page.locator('//*[@id="imgp"]/div/img')).toBeVisible();
        const image2src=await this.page.locator('//*[@id="imgp"]/div/img').getAttribute('src');
        await expect(image1src).toBe(image2src);
    }

    //->>>Verify weather the add cart button is visible or not
    async addcart(){
        await expect(this.page.locator('#cartur')).toBeVisible();
    }

    //->>>verify weather addtocart in the details tab is there or not
    async detailadd(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('.name')).toBeVisible();
        await expect(this.page.locator('.btn.btn-success.btn-lg')).toBeVisible();
        await this.page.locator('.btn.btn-success.btn-lg').click();
    }

    //->>>verify weather the product is add to the cart or not
    async cart(){
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('.name')).toBeVisible();
        await expect(this.page.locator('.btn.btn-success.btn-lg')).toBeVisible();
        this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());//get text
            await dialog.accept();

        });
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.locator('#cartur').click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('#tbodyid tr td:nth-child(2)')).toHaveText('Samsung galaxy s6');
    }

    //->>>verify weather the product image is same or not
    async cartimg(){
        const imagesrc=await this.page.locator('//*[@id="tbodyid"]/div[1]/div/a/img').getAttribute('src');
        await this.page.locator('.hrefch').first().click();
        await expect(this.page.locator('.name')).toBeVisible();
        await expect(this.page.locator('.btn.btn-success.btn-lg')).toBeVisible();
        await this.page.locator('.btn.btn-success.btn-lg').click();
        this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());//get text
            await dialog.accept();

        });
        await this.page.locator('#cartur').click();
        await this.page.waitForTimeout(1000);
        //await expect(this.page.locator('img[src="imgs/galaxy_s6.jpg"]')).toBeVisible();
        const row = this.page.locator('#tbodyid tr');
        await expect(row.first()).toBeVisible();
        const cartsrc=await this.page.locator('img[src="imgs/galaxy_s6.jpg"]').getAttribute('src');
        await expect(imagesrc).toBe(cartsrc);
    }

    //->>>verify weather the product price is displayed correctly or not on cart
    async cartprice(){
        const price=await this.page.locator('//*[@id="tbodyid"]/div[1]/div/div/h5').textContent();
        const cleanprice1=price.replace(/[^0-9]/g,"");
        await this.page.locator('.hrefch').first().click();
        //await expect(this.page.locator('.name')).toBeVisible();
        //await expect(this.page.locator('.btn.btn-success.btn-lg')).toBeVisible();
        await this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());//get text
            await dialog.accept();

        });
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//*[@id="cartur"]').click();
        await this.page.waitForTimeout(1000);
        //await expect(this.page.locator('#tbodyid tr td:nth-child(3)')).toBeVisible();
        const price2=await this.page.locator('#tbodyid tr td:nth-child(3)').textContent();
        await expect(cleanprice1).toBe(price2);

    }

    //->>>verify weather the placeorder is visible or no in cart
    async placeorder(){
        await this.page.locator('.hrefch').first().click();
        //await expect(this.page.locator('.name')).toBeVisible();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('.btn.btn-success.btn-lg')).toBeVisible();
        await this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());//get text
            await dialog.accept();

        });
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.locator('//*[@id="cartur"]').click();
        await expect(this.page.locator('//*[@id="page-wrapper"]/div/div[2]/button')).toBeVisible();
    }

    //->>>verifying the total price
    async totalprice(){
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('//*[@id="tbodyid"]/div[2]/div/a')).toBeVisible();
        await this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe('Product added')
            await dialog.accept();
        });
        await this.page.locator('.btn.btn-success.btn-lg').click();
        //await this.page.waitForTimeout(1000);
        await this.page.locator('#cartur').click();
        await this.page.waitForTimeout(1000);
        //await expect(this.page.locator('#tbodyid tr td:nth-child(3)')).toBeVisible();
        const sum1=await this.page.locator('#tbodyid tr td:nth-child(3)').textContent();
        const cleansum1=sum1.replace(/[^0-9]/g,"");
        const sum2=await this.page.locator('#totalp').textContent();
        await expect(cleansum1).toBe(sum2);

    }

    //->>>verify placeorderform is opening or not which contains details
    async placedetails(){
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('//*[@id="tbodyid"]/div[2]/div/a')).toBeVisible();
        await this.page.locator('//*[@id="tbodyid"]/div[2]/div/a').click();
        await this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe('Product added')
            await dialog.accept();
        });
        await this.page.locator('.btn.btn-success.btn-lg').click();
        await this.page.locator('#cartur').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.btn.btn-success').click();
        await this.page.waitForTimeout(1000);

        await expect(this.page.locator('#orderModalLabel')).toBeVisible();
    }

    //->>>verify weather laptop description is visible or not
    async lapdes(){
        await this.page.getByRole("link",{name:'Laptop'}).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByText('Sony is so confident')).toBeVisible();
    }


    //->>>verify weather the monitor description is visible or not
    async mondes(){
        await this.page.getByRole("link",{name:'Monitors'}).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('.hrefch').first().click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByText('LED Cinema Display features')).toBeVisible();
    }

    //->>>verifying weather about us details are visible or not
    async aboutus(){
        await expect(this.page.getByText("About Us").nth(1)).toBeVisible();
    }
}

