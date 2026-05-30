import{expect} from "@playwright/test";
export class support{
    constructor(page){
        this.page=page;
        this.contact=this.page.getByRole('link',{name:'Contact'});
        this.name=this.page.locator('#recipient-name');
        this.email=this.page.locator('#recipient-email');
        this.message=this.page.locator('#message-text');
    }
    //navigation
    async navigation(){
        await this.page.goto('https://www.demoblaze.com/');
    }
    //->>>verify contact link is enable or not
    async conena(){
        await this.contact.click();
        await expect(this.page.locator('#exampleModalLabel')).toBeVisible();
    }

    //->>>erify user can submit form with all valid inputs
    async svi(){
        await this.contact.click();
        await expect(this.page.locator('#exampleModalLabel')).toBeVisible();
    }

    async fillfull(email,name,message){
        await this.email.fill(email);
        await this.name.fill(name);
        await this.message.fill(message);

    }
    async submitcont(){
         await this.page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Thanks for the message!!');
            await dialog.accept();
        });
        await this.page.locator('button[onclick="send()"]').click();
        
    }

    //->>>Verify form resets after successful submission
    async vrss(){
        await expect(this.page.locator('#cat')).toBeVisible();
    }

    //->>>verify contact email is visible or not in the contact form
    async emailviscon(){
        await this.contact.click();
        await expect(this.page.locator('//*[@id="exampleModal"]/div/div/div[2]/form/div[1]/label')).toBeVisible();
    }

    //->>>verify contact name is enable or not in the contact form
    async nameviscon(){
        await this.contact.click();
        await expect(this.page.locator('//*[@id="exampleModal"]/div/div/div[2]/form/div[2]/label')).toBeVisible();
    }

    //->>>verify contact message is enable or not in the contact form
    async messviscon(){
        await this.contact.click();
        await expect(this.page.locator('//*[@id="exampleModal"]/div/div/div[2]/form/div[3]/label')).toBeVisible();
    }

    //->>>verify close button in the contact form is enable or not
    async closefirstvis(){
        await this.contact.click();
        await expect(this.page.locator('//*[@id="exampleModal"]/div/div/div[1]/button/span')).toBeVisible();
    }

    //->>verify second close button is enable or not
    async closesecvis(){
        await this.contact.click();
        await expect(this.page.locator('//*[@id="exampleModal"]/div/div/div[3]/button[1]')).toBeVisible();
    }

    //->>>Verify alert contains thanks message
    async conthaale(){
        await this.contact.click();
    }


}