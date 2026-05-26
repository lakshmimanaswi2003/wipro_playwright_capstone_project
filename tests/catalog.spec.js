import {test,expect} from "@playwright/test";
import {Catalog} from "../pages/catalog.mjs";

test.describe("testing catalog products",()=>{

    let catalog;
    test.describe.configure({mode:"serial"});

    test.beforeEach(async({page})=>{
        catalog = new Catalog(page);
        await catalog.navigationpage();
    });

    //TC01->>> Verify all product categories are displayed
    test("Verify all product categories are displayed",async({page})=>{
        await catalog.catvis();
        //testing weather categories options are available or not.
    });


    //TC02->>>Verify Phones Category has products
    test("Verify Phones Category has products",async({page})=>{
        await catalog.clickphones();
        await catalog.loadphone()//check weather atleast one product is available or not
        await catalog.countphones()//test weather all uploded mobiles are available or not
    })


    //TC03->>>Verify laptop Category has products
    test("Verify laptop Category has products",async({page})=>{
        await catalog.clicklaptop();
        await catalog.loadlaptop();//check weather atleast one product is available or not
        await catalog.countlaptop();//test weather all uploded laptops are available or not

    });


    //TC04->>>verify monitor category has products
    test("verify monitor category has products",async({page})=>{
        await catalog.clickmonitor();
        await catalog.loadmonitor();
        await catalog.countmonitor();
    });


    //TC05->>>Verify each product on home webpage displays product name
    test("Verify each product displays product name",async({page})=>{
        await catalog.count();
    });


    //TC06->>>Verify each product on home webpage displays product price
    test("Verify each product on home webpage displays product price",async({page})=>{
        await catalog.pricedisplay();
    });
    

    //TC07->>>verify each product on home webpage displays product image
    test("verify each product on home webpage displays product image",async({page})=>{
        await catalog.imagedisplay();

    });


    //TC08->>>verify product description when we click a product.
    test("verify product description when we click a product.",async({page})=>{
        await catalog.verdes();
    });


    //TC09->>>Verify category switching works properly
    test("Verify category switching works properly",async({page})=>{
        await catalog.switch();
    });


    //TC10->>>Verify no blank products are displayed
    test("Verify no blank products are displayed",async({page})=>{
        await catalog.blank();
    });


    
});
