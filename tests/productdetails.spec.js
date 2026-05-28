import {test,expect} from '@playwright/test';
import {productdetails} from '../pages/productdetails.mjs';

test.describe("product details service",()=>{
    let details;
    test.beforeEach(async({page})=>{
        details=new productdetails(page);
        await details.navigation();
    });
    //TC01->>>verify weather the product details page is loaded correctly or not
    test("verify weather the product details page is loaded correctly or not",async({page})=>{
        await details.pageload();
    });


    //TC02->>>verify weather product name is visible or not
    test("verify weather product name is visible or not",async({page})=>{
        await details.visname();
    });


    //TC03->>>erify Product Price is Displayed correctly in the homepage and the details page
    test("erify Product Price is Displayed correctly in the homepage and the details page",async({page})=>{
        await details.correctdisplay();
    });


    //TC04->>>verify weather the product name is correctly displayed in homepage and the details
    test("verify weather the product name is correctly displayed in homepage and the details",async({page})=>{
        await details.namedisplay();
    });


    //TC05->>>verifying the core details are same or not in both home page and details page
    test("verifying the core details are same or not in both home page and details page",async({page})=>{
        await details.coredisplay();
    });


    //TC06->>>verifying the processor details are same or not in both home page and details page
    test("verifying the processor details are same or not in both home page and details page",async({page})=>{
        await details.processordisplay();
    });


    //TC07->>>verigying the RAM details are same or not in both home page and details page
    test("verigying the RAM details are same or not in both home page and details page",async({page})=>{
        await details.ramdisplay();
    });


    //TC08->>>verifying the internalstorage details are same or not in both homepage and details page
    test("verifying the internalstorage details are same or not in both homepage and details page",async({page})=>{
        await details.internalstorage();
    });


    //TC09->>>Verifying the image in the home page is same as the image in the details page
    test("Verifying the image in the home page is same as the image in the details page",async({page})=>{
        await details.imagedisplay();
    });


    //TC10->>>Verify weather the add cart button is visible or not
    test("Verify weather the add cart button is visible or not",async({page})=>{
        await details.addcart();
    });


    //->>>TC11->>>verify weather addtocart in the details tab is there or not
    test("verify weather addtocart in the details tab is there or not",async({page})=>{
        await details.detailadd();
    });


    //->>>TC12->>>verify weather the product is add to the cart or not
    test("verify weather the product is add to the cart or not",async({page})=>{
        await details.cart();
    });


    //->>>TC13->>>verify weather the product image is same or not
    test("verify weather the product image is same or not",async({page})=>{
        await details.cartimg();
    });


    //->>>TC14->>>verify weather the product price is displayed correctly or not on cart
    test("verify weather the product price is displayed correctly or not on cart",async({page})=>{
        await details.cartprice();
    })


    //->>>TC15->>>verify weather the placeorder is visible or no in cart
    test("verify weather the placeorder is visible or no in cart",async({page})=>{
        await details.placeorder();
    })


    //->>>TC16->>>verifying the total price
    test("verifying the total price",async({page})=>{
        await details.totalprice();
    })


    //TC17->>>verify placeorderform is opening or not which contains details
    test("verify placeorderform is opening or not which contains details",async({page})=>{
        await details.placedetails();
    })
})