import puppeteer from "puppeteer";
import fs from "fs";

const getHeaderTemplate = () => {
  const html = fs.readFileSync("./api/puppeteer/header-template.html", "utf8");

  console.log(html);

  return html;
};

export const getPDF = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const pdf = await page.pdf({
    path: "report.pdf",
    displayHeaderFooter: true,
    headerTemplate: getHeaderTemplate(),
    footerTemplate: "<p>Report Footer</p>",
    printBackground: true,
    format: "A4",
    margin: {
      top: ".5in",
      bottom: ".5in",
      left: ".5in",
      right: ".5in",
    },
  });

  await browser.close();
  console.log("PDF generated");

  return pdf;
};
