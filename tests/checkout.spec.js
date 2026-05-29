import {test,expect} from "@playwright/test";
import {checkout} from "../pages/checkout.mjs";

test.describe("verifying checkout services",()=>{

    let check;
    test.describe.configure({mode:'serial'});
    test.beforeEach(async({page})=>{
        check=new checkout(page);
        await check.navigation();
    });

    //TC01->>>verify weather the checkout button is visible or not 
    test("verify weather the checkout button is visible or not ",async({page})=>{
        await check.checkoutbutton();
    });


    //TC02->>>verify all the name field in the order page are visible
    test('verify all the name field in the order page are visible',async({page})=>{
        await check.namefie();
    });


    //TC03->>>verify the country field in the order page is visible or not
    test('verify the country field in the order page is visible or not',async({page})=>{
        await check.confie();
    });


    //TC04->>>verify the city field in the order page is visible or not
    test('verify the city field in the order page is visible or not',async({page})=>{
        await check.cityfie();
    });


    //TC05->>>verify the creditcard field in the order page is visible or not
    test('verify the creditcard field in the order page is visible or not',async({page})=>{
        await check.credit();
    });


    //TC06->>>verify weather the month field in the order form is visible or not
    test('verify weather the month field in the order form is visible or not',async({page})=>{
        await check.monthfield();
    });


    //TC07->>>verify weather the year field in the order form is visible or not
    test('verify weather the year field in the order form is visible or not',async({page})=>{
        await check.yearfield();
    });


    //TC08->>>verify weather the user is able to fill the data in order form
    test('verify weather the user is able to fill the data in order form',async({page})=>{
        await check.vop();
    });


    //TC09->>>users can able to click the purchace button after filling
    test('users can able to click the purchace button after filling',async({page})=>{
        await check.purchaceclick();
    });


    //TC10->>>Vlidate weather the order is placed or not
    test('Vlidate weather the order is placed or not',async({page})=>{
        await check.validform();
    });


    //TC11->>>validate empty form submission
    test('validate empty form submission',async({page})=>{
        await check.empty();
    });


    //TC12->>>verify weather name only filled in the form
    test('verify weather name only filled in the form',async({page})=>{
        await check.nameformfill();
    });


    //TC13->>>verifying missing card details
    test('verifying missing card details',async({page})=>{
        await check.misscard();
    });


    //TC14->>>verifying missing country
    test('verifying missing country',async({page})=>{
        await check.miscou();
    });


    //TC15->>>verifying missing month
    test('verifying missing month',async({page})=>{
        await check.mismon();
    });


    //TC16->>>verifying missing year
    test('verifying missing year',async({page})=>{
        await check.misyear();
    });

    
    //TC17->>>Form resets after successful order
    test('Form resets after successful order',async({page})=>{
        await check.formreset();
    });


    //TC18->>>verify close button works or not
    test('verify close button works or not',async({page})=>{
        await check.closebutton();
    });

});