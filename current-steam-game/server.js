const axios = require('axios').default
const express = require('express')
const app = express()

const key = process.env.STEAM_KEY // Your Steam API key as an environment variable

app.get('/', async (req, res) => {

  const steamId = req.query.id
  const region = req.query.region

  const appIdFetch = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`)

  try {
    const appId = appIdFetch.data.response.players[0] ? appIdFetch.data.response.players[0].gameid : null

    if (!appId) {
      res.status(200).json({ name: '' })
      return
    }

    const gameDetails = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appId}&cc=${region}&l=${region}`)

    const playTimeFetch = await (axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamId}&include_appinfo=true&appids_filter[0]=${appId}`))

    const gameName = gameDetails.data[appId].data.name
    const gamePrice = gameDetails.data[appId].data.price_overview ? gameDetails.data[appId].data.price_overview.final_formatted : '0'
    const gameImage = gameDetails.data[appId].data.header_image
    const playTime = parseInt(playTimeFetch.data.response.games[0].playtime_forever / 60)

    console.log({ name: gameName, price: gamePrice, header_image: gameImage, timePlayed: playTime })
    res.status(200).json({ name: gameName, price: gamePrice, header_image: gameImage, timePlayed: playTime })

  }
  catch (error) {
    if (error.startsWith('TypeError')){
    console.log(`${new Date().toLocaleTimeString('en-UK')} - Steam error: ${error}`)
  }
}

})

const listener = app.listen(process.env.PORT, () => {
  console.log("Listening on port " + listener.address().port);
});
