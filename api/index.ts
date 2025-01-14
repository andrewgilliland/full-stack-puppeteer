import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  //   logger: true,
});

// Register CORS plugin
await fastify.register(cors, {
  // put your options here
});

fastify.get("/", async function handler() {
  console.log("Request received");
  return { hello: "world" };
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
