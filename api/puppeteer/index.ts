import puppeteer from "puppeteer";
import fs from "fs";

const base64Encode = (file: string) => {
  return fs.readFileSync(file, { encoding: "base64" });
};

const getHeaderTemplate = () => {
  const logo = base64Encode("./public/logo_on_white.png");
  const html = fs
    .readFileSync("./api/puppeteer/header-template.html", "utf8")
    .replace("{logo}", `data:image/png;base64, ${logo}`);

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
  return pdf;
};
