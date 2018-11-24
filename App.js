const Discord = require( "discord.js" );
const client = new Discord.Client();
const config = require( "./config.json" );

client.on( "ready", () => {
    console.log( "Practice" );
} );
var prefix = config.prefix;


const messageText = ":deciduous_tree::deciduous_tree::deciduous_tree::deciduous_tree::deciduous_tree:\n"
    + ":deciduous_tree::deciduous_tree::monkey::deciduous_tree::deciduous_tree:\n"
    + ":deciduous_tree::deciduous_tree::deciduous_tree::deciduous_tree::mountain_snow:️\n"
    + ":deciduous_tree::deciduous_tree::hole:️:deciduous_tree::deciduous_tree:\n"
    + ":deciduous_tree::deciduous_tree::deciduous_tree::deciduous_tree::deciduous_tree:\n";

const addMessageAndReactions = ( message ) => {
    message.channel.send( messageText ).then( function( message ) {
        message.react( "🐒" );
    } ).catch( function( error ) {
        console.log( "error:" + error );
    } );
}

client.on( 'messageReactionAdd', ( reaction, user ) => {
    console.log( "reaction:" + reaction.emoji );
    if(reaction.count == 1) {
        const message = reaction.message;
        if(reaction.emoji == "🐒") {
            message.react( "⬅" );
        }
        if(reaction.emoji == "⬅") {
            message.react( "🔼" );
        }
        if(reaction.emoji == "🔼") {
            message.react( "🔽" );
        }
        if(reaction.emoji == "🔽") {
            message.react( "➡" );
        }
    }
    if ( reaction.count < 2 ) {
        return;
    }
    addMessageAndReactions( reaction.message );
} );

client.on( "message", ( message ) => {
    if ( message.content.startsWith( prefix + "ping" ) ) {
        message.channel.send( "pong!" );
    }

    if ( message.content.startsWith( "hola" ) ) {
        message.channel.send( "Hola Mayra" );
        addMessageAndReactions( message );
    }
    if ( message.content.startsWith( "hello" ) ) {
        message.channel.send( "Hello Coranos" );
        addMessageAndReactions( message );
    }

    if ( message.content.startsWith( prefix + "a" ) ) {
        let img = message.mentions.users.first()
        console.log( img );
        if ( !img ) {
            const embed = new Discord.RichEmbed()
                .setImage( `${message.author.AvatarURL}` )
                .setColor( 0x66b3ff )
                .setFooter( `Avatar de ${message.author.username}#${message.author.discriminator}` );
            message.channel.send( { embed } );
        } else if ( img.avatarURL === null ) {
            const embed = new Discord.RichEmbed
                .setImage( `${message.author.defaultAvatarURL}` )
                .setColor( 0x66b3ff )
                .setFooter( `Avatar de ${message.author.username}#${message.author.discriminator}` );
            message.channel.send( { embed } );
        } else {
            const embed = new Discord.RichEmbed()
                .setImage( `${img.avatarURL}` )
                .setColor( 0x66b3ff )
                .setFooter( `Avatar de ${img.username}#${img.discriminator}` );
            message.channel.send( { embed } );
        };



        const moment = require( "moment" );
        require( `moment-duration-format` );

        const actividad = moment.duration( client.uptime ).format( " D [dias], H [hrs], m [mins], s [secs]" );


        const embed = new Discord.RichEmbed()
            .setColor( 0x66ff66 )

            .setAuthor( `Bot info`, client.user.avatarURL )
            .addField( `Dueño`, `user#0000`, true )
            .addField( `Version`, `1.0.0`, true )
            .addField( `Libreria`, `Discord ^11.2.1 (js)`, true )

            .addField( `Memoria`, `${( process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed( 2 )} MB`, true )
            .addField( `Uptime`, `$(actividad)`, true )
            .addField( `Servidores`, `${client.guilds.size.toLocaleString()}`, true )

            .addField( `Usuarios`, `${client.users.size.toLocaleString()}`, true )
            // .addField( `Canales`, `${client.channel.size.toLocaleString()}`, true )
            .addField( `Conexiones a voz`, `${client.voiceConnections.size}`, true )

        message.channel.send( { embed } );

    }
} );
client.login( config.token );
