import Fastify from "fastify";
import cors from "@fastify/cors";
import { getPDF } from "./puppeteer/index.ts";

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

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
