const path = require('path');
const fs = require('fs');

async function login(page) {
  await page.waitForSelector('input');

  const inputs = await page.evaluate(() => {
    const inputElements = document.querySelectorAll('input');

    inputElements[2].value = '230803';

    inputElements[3].click();

    return inputElements;
  });

  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.content();

  const menuFrameContent = await page.evaluate(() => {
    const menuFrame = window.frames['menu'];

    if (menuFrame) {
      return menuFrame.document.documentElement.outerHTML;
    } else {
      return null;
    }
  });

  if (menuFrameContent) {
    console.log(menuFrameContent);
  } else {
    console.log("O frame com nome 'menu' não foi encontrado.");
  }

  const screenshotPath = path.join(__dirname, 'screenshot.png');
  await page.screenshot({ path: screenshotPath });

  const frameContents = await Promise.all(page.frames().map(async (frame) => {
    return await frame.content();
  }));

  const combinedHTML = frameContents.join('');

  const htmlFilePath = path.join(__dirname, 'pagina_logada.html');
  fs.writeFileSync(htmlFilePath, combinedHTML);

  console.log('Arquivo HTML gerado com sucesso:', htmlFilePath);;


  return inputs;
}

module.exports = login;
