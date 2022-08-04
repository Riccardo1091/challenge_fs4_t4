import fetch from "node-fetch";
import 'dotenv/config'
import * as Discord from "discord.js";
const client = new Discord.Client(
    {intents: ['GUILDS','GUILD_MEMBERS','GUILD_MESSAGES','GUILD_INTEGRATIONS']}
);
client.login(process.env.TOKEN);

// bot va ONLINE
client.on("ready", ()=>{
    console.log("ONLINE")
    client.guilds.cache.forEach(guild =>{  //creo i comandi
        guild.commands.create({
            name: "articles",
            description: "Mostra l'ID di tutti gli articoli",
            options: [
                {
                    name: "id",
                    description: "id articolo da cercare",
                    type: "INTEGER",
                    required: false
                }
            ]
        })
        
        guild.commands.create({
            name: "articles-authors",
            description: "Mostra i nomi di tutti gli autori",            
        })
    })
})


//comando digitato dall'utente
client.on("interactionCreate", interaction =>{
    if(!interaction.isCommand()) return  //interaction non valida
    if(interaction.commandName == "articles"){

        const id = interaction.options.getInteger("id") || 0; //recupero l'id opzionale
        if(id==0){  //tutti gli id
        (async () => {
            let ids =""
            const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
            const pubblications = await response.json();
            pubblications.forEach(element => {
                ids+=`${element.id}\n`;
            });
            interaction.reply("Ecco gli ID degli articoli: \n"+ids)
          })()}
        else {  // un articolo in particolare
            (async () => {
                const url = "https://api.spaceflightnewsapi.net/v3/articles/"+id;
                const response = await fetch(url);
                if(response.status==200){ //articolo cercato presente
                const pubblications = await response.json();                
                interaction.reply("Ecco il contenuto dell'articolo: \n"+pubblications.title);}
                else{  //articolo cercato inesistente
                    interaction.reply("Articolo non presente")
                }
              })()
        }
    }
    if(interaction.commandName == "articles-authors"){  //mostro la lista degli autori
        (async () => {
            const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=15");
            const pubblications = await response.json();
            let autori ="";
            pubblications.forEach( pubblication => {  //creo array di autori
                if (autori.indexOf(pubblication.newsSite) === -1) {
                    autori+=`${pubblication.newsSite}\n`;
                }
            })
            interaction.reply("Ecco gli autori: \n" +autori)
          })()
    }
})



