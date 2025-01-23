import Fastify from "fastify";
import cors from "@fastify/cors";
import puppeteer from "puppeteer";
// import { getPDF } from "./puppeteer";

export const getPDF = async (url: string) => {
  console.log("Request received");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pdf = await page.pdf();
  await browser.close();
  console.log("PDF generated");
  return pdf;
};

export const getScreenshot = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot();
  await browser.close();
  return screenshot;
};

const fastify = Fastify({});

await fastify.register(cors, {});

fastify.get("/", async function handler() {
  console.log("Request received");

  return { hello: "world" };
});

fastify.get("/pdf", async function handler() {
  const pdf = await getPDF("https://www.freecodecamp.org/");

  return pdf;
});

fastify.get("/screenshot", async function handler() {
  const screenshot = await getScreenshot("https://www.freecodecamp.org/");

  return screenshot;
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
