import express, { Request, Response } from 'express';
import Discord, { Message } from "discord.js";
import { DISCORD_TOKEN } from './config/secrets';
import CommandHandler from './commandHandler';
import config from './config/botConfig';

const PORT = process.env.PORT || 5000;
const app = express();
const client = new Discord.Client();
app.use(express.urlencoded({ extended: true }));
app.use('/', (request: Request, response: Response) => {
  response.sendStatus(200);
});

const commandHandler = new CommandHandler(config.prefix);
client.on("ready", () => { console.log("Bot's Ready !"); });
client.on("message", (message: Message) => { commandHandler.handleMessage(message); });
client.on("error", e => { console.error("Discord client error!", e); });

client.login(DISCORD_TOKEN);
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
