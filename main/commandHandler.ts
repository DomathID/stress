import { Message } from "discord.js";
import { GreetCommand, TimeCommand } from "./commands";
import Command from "./commands/commandInterface";
import { CommandParser } from "./models/commandParser";

export default class CommandHandler {
  private commands: Command[];
  private readonly prefix: string;
  constructor(prefix: string) {

    const commandClasses = [
      GreetCommand,
      TimeCommand
    ];
    this.commands = commandClasses.map(commandClass => new commandClass());
    this.prefix = prefix;
  }
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) {
      return;
    }
    const commandParser = new CommandParser(message, this.prefix);
    const matchedCommand = this.commands.find(command => command.commandNames.includes(commandParser.parsedCommandName));
    if (!matchedCommand) {
      await message.reply(`I don't recognize that command. Try !help.`);
    } else {
      await matchedCommand.run(message).catch(error => {
        message.reply(`'${this.echoMessage(message)}' failed because of ${error}`);
      });
    }
  }

  echoMessage(message: Message): string {
    return message.content.replace(this.prefix, "").trim();
  }

  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
