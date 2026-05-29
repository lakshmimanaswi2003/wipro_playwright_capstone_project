import {test,expect} from '@playwright/test';
import {shoppingcart} from '../pages/shoppingcart.mjs';

test.describe("verify shopping cart",()=>{
    let cart;
    test.describe.configure({mode:"serial"});
    test.beforeEach(async({page})=>{
        cart=new shoppingcart(page);
        await cart.navigation();
    });
    //TC01->>>Verify user can add a product to the cart
    test("Verify user can add a product to the cart",async({page})=>{
        await cart.addproduct();
    });


    //TC02->>>Verify success message appears after adding item
    test("Verify success message appears after adding item",async({page})=>{
        await cart.succmeg();
    });


    //TC03->>>Verify correct product name is added
    test("Verify correct product name is added",async({page})=>{
        await cart.correctname();
    });


    //TC04->>>Verify correct product price is added
    test("Verify correct product price is added",async({page})=>{
        await cart.correctprice();
    })


    //TC05->>>Verify multiple different products can be added
    test("Verify multiple different products can be added",async({page})=>{
        await cart.multi();
    })


    //TC06->>>Verify cart page loads successfully
    test("Verify cart page loads successfully",async({page})=>{
        await cart.cartload();
    });


    //TC07->>>Verify cart is empty when no products are added
    test("Verify cart is empty when no products are added",async({page})=>{
        await cart.empty();
    });


    //TC08->>>Verify user can delete product from cart and verify cart were updated
    test("Verify user can delete product from cart and verify cart were updated",async({page})=>{
        await cart.delcart();
    });


    //TCO9->>>verify weather user can able to deltet product or not in cart
    test("verify weather user can able to deltet product or not in cart",async({page})=>{
        await cart.del();
    });


    //TC10->>>verify we can delete all the products form cart
    test("verify we can delete all the products form cart",async({page})=>{
        await cart.delmulti();
    })
});