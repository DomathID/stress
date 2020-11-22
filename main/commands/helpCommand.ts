import Command from "./commandInterface";
import { Message, MessageEmbed } from "discord.js"
export class HelpCommand implements Command {
  commandNames = ["help"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix}help`>
  }

  async run(message: Message): Promise<void> {
   const embed = new MessageEmbed()
  .setAuthor("TypeScript Bot Discord Beta")
  .setDescription("This Easy to Use")
  .setColor(0x0099ff)
  .setFooter("Bot By DomathID")
  .addFields({
   name: 'help',
   value: "Help Command"
  },
  {
   name: 'Say',
   value: "Say Something"
  },
  {
   name: 'Ping',
   value: "Ping Signal"
 })
 .setTimestamp()
await message.channel.send(embed)
  }
}
                
