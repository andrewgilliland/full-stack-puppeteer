import puppeteer from "puppeteer";

export const getPDF = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pdf = await page.pdf();
  await browser.close();
  console.log("PDF generated");
  return pdf;
};
