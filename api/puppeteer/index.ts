import puppeteer from "puppeteer";
import { readFileSync } from "fs";

const base64Encode = (file: string) => {
  return readFileSync(file, { encoding: "base64" });
};

const logo = base64Encode("./public/logo_on_white.png");

const getHeaderTemplate = () => {
  const html = readFileSync("./api/puppeteer/header-template.html", "utf8")
    .replace("{logo}", `data:image/png;base64, ${logo}`)
    .replace(
      "{gridContent}",
      [
        "Client",
        "Job",
        "Area",
        "Date Collected",
        "Farm/Operation",
        "Field",
        "Lab",
        "Date Analyzed",
      ]
        .map(
          (header, index) => `<div style="${
            (index + 1) % 4 ? "" : "place-self: end; text-align: right;"
          }">
      <div style="font-weight: bold; font-size: 10px;">${header}</div>
      <div>${header}</div>
      </div>`
        )
        .join("")
    );

  return html;
};

const getFooterTemplate = () => {
  const formattedDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const html = readFileSync("./api/puppeteer/footer-template.html", "utf8")
    .replace("{logo}", `data:image/png;base64, ${logo}`)
    .replace("{dateCreated}", formattedDate);

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
    footerTemplate: getFooterTemplate(),
    printBackground: true,
    format: "A4",
    margin: {
      top: "2.5in",
      bottom: "1.1in",
      left: ".5in",
      right: ".5in",
    },
  });

  await browser.close();
  return pdf;
};
