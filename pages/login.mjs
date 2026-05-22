import {expect} from "@playwright/test";
export class Loginpage{
    constructor(page){
        this.page=page;
        //navigation
        this.signuplink=this.page.getByRole('link',{name:'Sign up'});//navigate to sign up
        this.loginlink=this.page.locator("#login2");//navigate to login
        this.signuser=this.page.locator("#sign-username");//navigate to username in signin
        this.signpass=this.page.locator("#sign-password");//navigate to password in signin
        this.loginuser=this.page.locator("#loginusername");//navigate to username in login
        this.loginpass=this.page.locator("#loginpassword");//navigate to password in login
        this.logout=this.page.getByRole("link",{name:"Log out"});//navigate to logout
        //button
        this.signbtn=this.page.getByRole("button",{name:"Sign up"});
        this.closebtn=this.page.getByRole("button",{name:"Close"}).nth(1);
        this.loginbtn=this.page.getByRole("button",{name: 'Log in'});
    }
    async navigationpage(){
        await this.page.goto("https://www.demoblaze.com/");
    }

    async clicksignup(){
        await this.signuplink.click();
    }

    async fillForm(user,pass){
        await this.signuser.fill(user);
        await this.signpass.fill(pass);
    }

    async submit(){
        await this.signbtn.click();
    }

    async close(){
        await this.closebtn.click();
    }
    /*
    async handlingalert(){
        this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());//get text
            await dialog.accept();

        })
    }
    */

    async test1(){
        this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("This user already exist.");
            await dialog.accept();
        })
    }
    

    //->>testing login with wrong user and passwordcredentials

    async clicklogin(){
        await this.loginlink.click();
    }

    async filluser(user,pass){
       await this.loginuser.fill(user);
        await this.loginpass.fill(pass);
    }

    async clickloginbtn(){
        await this.loginbtn.click();
    }
    /*
    async loginerror(){
        this.page.once("dialog",async(dialog)=>{
            console.log(dialog.message());
            await dialog.accept();
        })
    }
    */
    async test2(){
        this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Wrong password.");
            await dialog.accept();
        })
    }

    //->>> testing with wrong user name
    async test3(){
        this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("User does not exist.");
            await dialog.accept();
        })
    }

    //->>>testing with wrong password
    async test4(){
        this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Wrong password.");
            await dialog.accept();
        })
    }

    //->>>testing with empty username
    async test5(){
        this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Please fill out Username and Password.");
            await dialog.accept();
        })
    }

    async fillonlypass(pass){
        await this.loginpass.fill(pass);
    }

    //=>>>testing with empty password
    async fillonlyuser(user){
        await this.loginuser.fill(user);
    }
    async test6(){
        await this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Please fill out Username and Password.");
            await dialog.accept();
        })
    }

    //->>> testing with empty user and password
    async test8(){
        await this.page.once("dialog",async(dialog)=>{
            await expect(dialog.message()).toBe("Please fill out Username and Password.");
            await dialog.accept();
        })
    }

    //->>>testing logout
    async logout1(){
        await this.logout.click();
    }

    //->>>Password Field Masking
    async masking(){
        await expect(this.page.locator("#loginpassword")).toHaveAttribute("type","password");
    }

    //->>>home page load validation
    async load(){
        await expect(this.page).toHaveURL("https://www.demoblaze.com/");
    }

    //->>>testing weather login is visible or not

    async logvis(){
        await expect(this.loginlink).toBeVisible();
    }

    //->>>testing weather signup is visible or not
    async signvis(){
        await expect(this.signuplink).toBeVisible();
    }

    //->>>testing weather logout is visible or not
    async logoutvis(){
        await expect(this.logout).toBeVisible();
    }



}