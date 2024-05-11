const puppeteer = require("puppeteer");
const login = require("./login");

const startNavigation = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.rssv8.com.br/index1.asp?rc=0&cl=26&us=98');

    await login(page);

    const htmlContent = await page.content();

    fs.writeFileSync('pagina_logada.html', htmlContent);

    await browser.close();
}

module.exports = startNavigation