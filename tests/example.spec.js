import {test,expect} from "@playwright/test";
import {Loginpage} from "../pages/login.mjs";

test.describe("signup", ()=>{
  let loginpage;
  test.describe.configure({mode:"serial"});

  test.beforeEach( async({page})=>{
    loginpage = new Loginpage(page);
    await loginpage.navigationpage();
  });

  //TCO1->>> testing the signup with same credentials
  test("signup with same credentials ",async({page})=>{
    await loginpage.clicksignup();
    await loginpage.fillForm("adm@123","adm@123");
    await loginpage.submit();
    await loginpage.test1();//testing the alert and expected message are same or not
    //await loginpage.handlingalert();
    await loginpage.close();
  });


  //TCO2->>> testing the login with wrong user and password
  test("login with wrong credentials",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm","adm");
    await loginpage.clickloginbtn();
    await loginpage.test2();//testing the alert and expected message are same or not
    //await loginpage.loginerror();
    await loginpage.close();
  });


  //TCO3->>> testing with wrong username
  test("testing with wrong username",async ({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("laksh","adm@123");
    await loginpage.clickloginbtn();
    await loginpage.test3();//testing the alert and expected message are same or not
    //await loginpage.loginerror();
    await loginpage.close();
  });


  //TCO4->>> testing with wrong password
  test("testing with wrong password",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","laksh");
    await loginpage.test4();
    await loginpage.clickloginbtn();
    await loginpage.close();
  });


  //TCO5->>> testing with empty username
  test("testing with empty username",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.fillonlypass("adm@123");
    await loginpage.clickloginbtn();
    await loginpage.test5();
    await loginpage.close();
  });


  //TCO6->>> testing with empty password
  test("testing with empty password",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.fillonlyuser("adm@123");
    await loginpage.clickloginbtn();
    await loginpage.test6();
    await loginpage.close();
  });


  //TC07->>> testing with correct credentials
  test("testing with correct credentials",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","adm@123");
    await loginpage.clickloginbtn();
    await expect(await page.locator("#nameofuser")).toHaveText("Welcome adm@123");
  });


  //TCO8->>> testing with empty user and password
  test("testing with empty user and password",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.clickloginbtn();
    await loginpage.test8();
    await loginpage.close();
    
  });


  //TCO9->>> testing log out
  test("testing log out",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","adm@123");
    await loginpage.clickloginbtn();
    await expect(await page.locator("#nameofuser")).toHaveText("Welcome adm@123");
    await loginpage.logout1();
  });


  //TC10->>>Password Field Masking
  test("Password Field Masking",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","adm@123");
    await loginpage.masking();
    await loginpage.close();
  });


  //TC11->>>Home page load validation
  test("home page load validation",async({page})=>{
    await loginpage.load();
  });


  //TC12->>>testing weather login is visible or not
  test("testing weather login is visible or not",async({page})=>{
    await loginpage.logvis()
  });


  //TC13->>>testing weather signup is visible or not
  test("testing weather signup is visible or not",async({page})=>{
    await loginpage.signvis();
  });


  //TC14->>>testing weather logout is visible or not
  test("testing weather logout is visible or not",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","adm@123");
    await loginpage.clickloginbtn();
    await expect(page.locator("#nameofuser")).toHaveText("Welcome adm@123");
    await loginpage.logoutvis();
  });


  //TC15->>>testing weather welcome adm@123 username is visible or not
  test("testing weather welcome adm@123 username is visible or not",async({page})=>{
    await loginpage.clicklogin();
    await loginpage.filluser("adm@123","adm@123");
    await loginpage.clickloginbtn();
    await expect(page.locator("#nameofuser")).toHaveText("Welcome adm@123");
  });


});