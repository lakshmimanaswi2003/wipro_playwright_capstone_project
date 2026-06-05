import {test,expect} from "@playwright/test";
import {support} from "../pages/support-addon.mjs";

test.describe("verifying support or contact services",()=>{
    let supp;

    test.describe.configure({mode:"serial"});

    test.beforeEach(async({page})=>{
        supp = new support(page);
        await supp.navigation();
    });

    //TC01->>>verify contact link is enable or not
    test("verify contact link is enable or not",async({page})=>{
        await supp.conena();
    });


    //TC02->>>verify user can submit form with all valid inputs
    test('erify user can submit form with all valid inputs',async({page})=>{
        await supp.svi()
        await supp.fillfull('john@gmail.com','john','hello support');
        await supp.submitcont();
    });


    //TC03->>>Verify form resets after successful submission
    test('Verify form resets after successful submission',async({page})=>{
        await supp.svi()
        await supp.fillfull('john@gmail.com','john','hello support');
        await supp.submitcont();
        await supp.vrss();
    });
    

    //TC04->>>verify contact email is visible or not in the contact form
    test("verify contact email is enable or not in the contact form",async({page})=>{
        await supp.emailviscon();
    });


    //TC05->>>verify contact name is enable or not in the contact form
    test("verify contact name is enable or not in the contact form",async({page})=>{
        await supp.nameviscon();
    });


    //TC06->>>verify contact message is enable or not in the contact form
    test("verify contact message is enable or not in the contact form",async({page})=>{
        await supp.messviscon();
    });


    //TC07->>>verify close button in the contact form is enable or not
    test("verify close button in the contact form is enable or not",async({page})=>{
        await supp.closefirstvis();
    });


    //TC08->>>verify second close button is enable or not
    test("verify second close button is enable or not",async({page})=>{
        await supp.closesecvis();
    });


    //TC09->>>Verify alert contains thanks message
    test("Verify alert contains thanks message",async({page})=>{
        await supp.conthaale();
        await supp.fillfull('john','john@gmail.com','hello support i have an issue');
        await supp.submitcont();
    });
    
});