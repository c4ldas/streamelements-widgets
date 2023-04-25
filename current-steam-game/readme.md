## Current Steam Game

OBS: This widget was originally created by NooodyFR (https://github.com/NooodyFR), but as I am hosting the backend, I am adding it to here as well. 

This widget shows the game you are currently playing on Steam. It shows the game name, price, hours played and the game image as a background

## 1-click install: 

Original link:
https://strms.net/current_steam_game_by_nooody

Same widget, but with instructions included:
https://streamelements.com/dashboard/overlays/share/624e04622e2b5202dbcf8788

## Preview and instructions

### How to use it:

Original widget description from Streamelements Discord: 
https://discord.com/channels/141203863863558144/457957557470887947/883359312817299566

1 - Get your Steam ID from Steam application using the steps below

2 - Go to menu Steam > Settings

3 - Click on Account > View Account Details

![Preview](/current-steam-game/steam-id-instruction.png)

4 - Put the Steam ID on the corresponding widget field

5 - Choose your region from the dropdown list

6 - If you change the game, type !refresh on chat to reload the widget

OBS: Your profile needs to be set as Public. Follow the instructions below to check if your profile is public:

* On Steam, click on your username > `Edit my profile`
* Go to `Privacy Settings` and set `My profile` to `Public`

### Overlay preview:

![Overlay Preview](/current-steam-game/widget.png)


## Advanced instructions (optional)

These instructions are only valid in case you also want to host the backend on your own server, which is not necessary. I am adding this information because we never know when the server can go down

You will need a Nodejs server (currently running v16.15.0) and the Steam API key

Get your Steam API key here: https://steamcommunity.com/dev/apikey

First you will need to change the line `8` of the `widget.js` from the overlay to match your server domain
```js
const dataFetch = await fetch(`https://repl.c4ldas.com.br/api/steam/game/?id=${mySteamId}&region=${myRegion}`)
```

You need a Nodejs server running on your system. `Axios` (version 0.27.2) and `Express` (version 4.18.1) libraries are used, which can be installed using `npm install axios express`. 

On the server, copy the `server.js` content.

Set the Steam key as a environment variable called STEAM_KEY

Start the application
