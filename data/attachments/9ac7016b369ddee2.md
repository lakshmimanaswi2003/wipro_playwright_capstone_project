# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> verify navigation services >> Verify Navigation Using Keyboard (Accessibility)
- Location: tests/navigation.spec.js:90:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /index.html/
Received string:  "https://www.demoblaze.com/cart.html"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "https://www.demoblaze.com/cart.html"

```

```yaml
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: "#"
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
- heading "Products" [level=2]
- table:
  - rowgroup:
    - row "Pic Title Price x":
      - columnheader "Pic"
      - columnheader "Title"
      - columnheader "Price"
      - columnheader "x"
  - rowgroup
- heading "Total" [level=2]
- heading [level=3]
- button "Place Order"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  11  |         this.phones=this.page.getByRole('link',{name:'Phones'});
  12  |         
  13  | 
  14  |     }
  15  |     async navigation(){
  16  |         await this.page.goto('https://www.demoblaze.com/');
  17  |     }
  18  |     //->>>Verify Home Navigation
  19  |     async homnav(){
  20  |         await this.home.click();
  21  |         await expect(this.page).toHaveURL(/index.html/);
  22  |     }
  23  | 
  24  |     //->>>verify cart navigation
  25  |     async cartnavi(){
  26  |         await this.cart.click();
  27  |         await expect(this.page).toHaveURL(/cart.html/);
  28  |     }
  29  | 
  30  |     //->>>verify contact navigation
  31  |     async contanavi(){
  32  |         await this.contact.click();
  33  |         await expect(this.page.locator('#exampleModalLabel')).toHaveText("New message");
  34  |         
  35  |     }
  36  | 
  37  |     //->>>verify about us navigation
  38  |     async abnavi(){
  39  |         await this.aboutus.click();
  40  |         await expect(this.page.locator('#videoModalLabel')).toHaveText("About us");
  41  |     }
  42  | 
  43  |     //->>>verify login navigation
  44  |     async lognav(){
  45  |         await this.login.click();
  46  |         await expect(this.page.locator('#logInModalLabel')).toHaveText("Log in");
  47  |     }
  48  | 
  49  |     //->>>verify signin navigation
  50  |     async signav(){
  51  |         await this.signin.click();
  52  |         await expect(this.page.locator('#signInModalLabel')).toHaveText("Sign up");
  53  |     }
  54  | 
  55  |     //->>>Verify navigation from cart to home
  56  |     async cth(){
  57  |         await this.cart.click();
  58  |         await this.home.click();
  59  |         await expect(this.page).toHaveURL(/index.html/);
  60  |     }
  61  | 
  62  |     //->>>Verify Navigation Works After Page Refresh
  63  |     async pgref(){
  64  |         await this.page.reload();
  65  |         await this.cart.click();
  66  |         await expect(this.page).toHaveURL(/cart.html/);
  67  |     }
  68  | 
  69  |     //->>>Verify All Navbar Links Visible
  70  |     async alllinks(){
  71  |         await expect(this.home).toBeVisible();
  72  |         await expect(this.cart).toBeVisible();
  73  |         await expect(this.contact).toBeVisible();
  74  |         await expect(this.aboutus).toBeVisible();
  75  |         await expect(this.login).toBeVisible();
  76  |         await expect(this.signin).toBeVisible();
  77  |     }
  78  | 
  79  |     //->>>Verify Clicking Logo Redirects to Home
  80  |     async logolink(){
  81  |         await this.cart.click();
  82  |         await this.page.locator('img[src="blazemeter-favicon-512x512.png"]').click();
  83  |         await expect(this.page).toHaveURL(/index.html/);
  84  |     }
  85  | 
  86  |     //->>>Verify Multiple Navigation Clicks
  87  |     async multnav(){
  88  |         await this.cart.click();
  89  |         await this.home.click();
  90  |         await this.cart.click();
  91  |         await expect(this.page).toHaveURL(/cart.html/);
  92  |     }
  93  | 
  94  |     //->>>Verify Navigation Link Clickable
  95  |     async nlc(){
  96  |         await expect(this.cart).toBeEnabled();
  97  |     }
  98  | 
  99  |     //->>>Verify No Broken Navigation
  100 |     async brokennavi(){
  101 |         await this.cart.click();
  102 |         await expect(this.page.locator('#tbodyid')).toHaveCount(1);
  103 | 
  104 |     }
  105 | 
  106 |     //->>>Verify Navigation Using Keyboard (Accessibility)
  107 |     async keyboartacc(){
  108 |         await this.cart.click();
  109 |         await this.page.keyboard.press('Tab');
  110 |         await this.page.keyboard.press('Enter');
> 111 |         await expect(this.page).toHaveURL(/index.html/);
      |                                 ^ Error: expect(page).toHaveURL(expected) failed
  112 |     }
  113 | 
  114 |     //->>>Verify Modal login Does Not Affect Navigation
  115 |     async affnavi(){
  116 |         await this.login.click();
  117 |         await this.page.locator('#loginusername').fill('adm@123');
  118 |         await this.page.locator('#loginpassword').fill('adm@123');
  119 |         await this.page.locator('button[onclick="logIn()"]').click();
  120 |         await this.cart.click();
  121 |         await expect(this.page).toHaveURL(/cart.html/);
  122 |     }
  123 | 
  124 |     //->>>verify clicking the phones redirect to phones page
  125 |     async phoneredir(){
  126 |         await this.page.locator('.hrefch').first().click();
  127 |         await expect(this.page).toHaveURL(/idp_=1/);
  128 |     }
  129 | 
  130 |     //->>>verify clicking the laptops redirect to laptops page
  131 |     async lapredir(){
  132 |         await this.page.locator('.hrefch').nth(7).click();
  133 |         await expect(this.page).toHaveURL(/idp_=8/);
  134 |     }
  135 | 
  136 |     //->>>verify clicking the monitors redirect to monitors page
  137 |     async moniredir(){
  138 |         await this.page.getByRole('link',{name:'Monitors'}).click();
  139 |         await this.page.locator('//*[@id="tbodyid"]/div[1]/div/div/h4/a').first().click();
  140 |         await expect(this.page).toHaveURL(/idp_=10/);
  141 |     }
  142 | 
  143 | }
```