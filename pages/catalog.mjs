import {expect} from "@playwright/test"
export class Catalog{
    constructor(page){
        this.page=page;
        //navigation
        this.cata=this.page.locator("#cat");
        this.phones=this.page.getByRole("link",{name:"Phones"});
        this.laptops=this.page.getByRole("link",{name:"Laptops"});
        this.monitor=this.page.getByRole("link",{name:"Monitors"});
    }
    async navigationpage(){
        await this.page.goto("https://www.demoblaze.com/");
    }

    //->>>Verify all product categories are displayed
    async catvis(){
        await expect(this.cata).toBeVisible();
    }

    //->>>Verify Phones Category has products
    async clickphones(){
        await this.phones.click();
    }

    async loadphone(){
        await this.page.waitForSelector(".hrefch");
    }
    
    async countphones(){
        const allphones=await this.page.locator(".hrefch").allTextContents();
        await expect(allphones.length).toBeGreaterThan(0);
    }

    //->>>verifying laptop category has products
    async clicklaptop(){
        await this.laptops.click();
    }
    
    async loadlaptop(){
        await this.page.waitForSelector(".hrefch");
    }
    async countlaptop(){
        const all=await this.page.locator(".hrefch").allTextContents();
        await expect(all.length).toBeGreaterThan(0);
    }

    //->>>verifying weather monitor category has products.
    async clickmonitor(){
        await this.monitor.click();
    }

    async loadmonitor(){
        await this.page.waitForSelector(".hrefch");
    }

    async countmonitor(){
        const allmoni=await this.page.locator(".hrefch").allTextContents();
        await expect(allmoni.length).toBeGreaterThan(0);
    }

    //->>>Verify each product displays product name
    async count(){
        const allnames=this.page.locator(".hrefch");
        const count=await allnames.count();
        for(var i=0;i<count;i++){
            await expect(allnames.nth(i)).toBeVisible();
        }


    }

    //->>>verify the price of each product on home page is displayed or not.
    async pricedisplay(){
        const allprice=this.page.locator('//*[@id="tbodyid"]/div[1]/div/div/h5');
        const pricecount=await allprice.count();
        for(var i=0;i<pricecount;i++){
            await expect(allprice.nth(i)).toBeVisible();
        }
    }

    //->>>verify the image of each product on home page is displayed or not.
    async imagedisplay(){
        const alldisplay=this.page.locator(".card-img-top.img-fluid");
        const displaycount=await alldisplay.count();
        for(var i=0;i<displaycount;i++){
            await expect(alldisplay.nth(i)).toBeVisible();
        }
    }

    //->>>verify the description of the each product 
    async verdes(){
        const alldisplay=this.page.locator(".card-img-top.img-fluid");
        const displaycount=await alldisplay.count();
        for(var i=0;i<displaycount;i++){
            await alldisplay.nth(i).click();
            await expect(this.page.locator('p').textcontent()).toBeVisible();
        }
    }

    //->>>Verify category switching works properly
    async switch(){
        //for phones
        await this.phones.click();
        await this.page.waitForSelector(".hrefch");
        const allphones=await this.page.locator(".hrefch").allTextContents();
        //for laptops
        await this.laptops.click();
        await this.page.waitForSelector('text=Sony vaio i5');
        const allitems=await this.page.locator(".hrefch").allTextContents();
        const alllaptops = allitems.filter(item => !allphones.includes(item));//removes the allphones from allitems

        expect(allphones).not.toEqual(alllaptops);
    }

    //->>>Verify no blank products are displayed(ex:phones)
    async blank(){
        await this.phones.click();
        await this.page.waitForSelector(".hrefch");
        const allphones=await this.page.locator(".hrefch").allTextContents();
        //console.log(allphones);
        allphones.forEach(data=>{
            expect(data).not.toBeNull();
            expect(data.trim().length).toBeGreaterThan(0);
        });
    }

    

}