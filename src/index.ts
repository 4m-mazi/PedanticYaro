import { Client, GatewayIntentBits } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import handlers from "./handlers/index.js";

if (!process.env.DISCORD_TOKEN || !process.env.DATABASE_URL) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
const gateway = new WebSocketManager({
  token: process.env.DISCORD_TOKEN,
  intents:
    GatewayIntentBits.Guilds |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.MessageContent,
  rest,
});
const client = new Client({ rest, gateway });
const prisma = new PrismaClient();

for (const [event, fn] of Object.entries(handlers)) {
  client.on(
    event as Parameters<typeof client.on>[0],
    fn as Parameters<typeof client.on>[1],
  );
}

await gateway.connect();
await prisma.$connect();
