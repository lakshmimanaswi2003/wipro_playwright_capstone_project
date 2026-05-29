import {test,expect} from "@playwright/test";
import {navi} from "../pages/navigation.mjs";
test.describe("verify navigation services",async()=>{

    let navigat;
    test.describe.configure({mode:'serial'});
    test.beforeEach(async({page})=>{
        navigat=new navi(page);
        await navigat.navigation();
    })
    //TC01->>>Verify Home Navigation
    test('Verify Home Navigation',async({page})=>{
        await navigat.homnav();
    });


    //TC02->>>verify cart navigation
    test('verify cart navigation',async({page})=>{
        await navigat.cartnavi();
    });


    //TC03->>>verify contack navigation
    test('verify contact navigation',async({page})=>{
        await navigat.contanavi();
    });


    //TC04->>>verify about us navigation
    test('verify about us navigation',async({page})=>{
        await navigat.abnavi();
    });


    //TC05->>>verify login navigation
    test('verify login navigation',async({page})=>{
        await navigat.lognav();
    });


    //TC06->>>verify signup navigation
    test('verify signup navigation',async({page})=>{
        await navigat.signav();
    });


    //TC07->>>Verify navigation from cart to home
    test('Verify navigation from cart to home',async({page})=>{
        await navigat.cth();
    });


    //TC08->>>Verify Navigation Works After Page Refresh
    test('Verify Navigation Works After Page Refresh',async({page})=>{
        await navigat.pgref();
    });


    //TC09->>>Verify All Navbar Links Visible
    test('Verify All Navbar Links Visible',async({page})=>{
        await navigat.alllinks();
    });


    //TC10->>>Verify Clicking Logo Redirects to Home
    test('Verify Clicking Logo Redirects to Home',async({page})=>{
        await navigat.logolink();
    });


    //TC11->>>Verify Multiple Navigation Clicks
    test('Verify Multiple Navigation Clicks',async({page})=>{
        await navigat.multnav();
    });


    //TC12->>>Verify Navigation Link Clickable
    test('Verify Navigation Link Clickable',async({page})=>{
        await navigat.nlc();
    });


    //TC13->>>Verify No Broken Navigation
    test('Verify No Broken Navigation',async({page})=>{
        await navigat.brokennavi();
    });


    //TC14->>>Verify Navigation Using Keyboard (Accessibility)
    test('Verify Navigation Using Keyboard (Accessibility)',async({page})=>{
        await navigat.keyboartacc();
    });


    //TC15->>>Verify Modal login Does Not Affect Navigation
    test('Verify Modal login Does Not Affect Navigation',async({page})=>{
        await navigat.affnavi();
    });


    //TC16->>>verify clicking the phones redirect to phones page
    test('verify clicking the phones redirect to phones page',async({page})=>{
        await navigat.phoneredir();
    });


    //TC17->>>verify clicking the laptops redirect to laptops page
    test('verify clicking the laptops redirect to laptops page',async({page})=>{
        await navigat.lapredir();
    });


    //TC18->>>verify clicking the monitors redirect to monitors page
    test('verify clicking the monitors redirect to monitors page',async({page})=>{
        await navigat.moniredir();
    });

});