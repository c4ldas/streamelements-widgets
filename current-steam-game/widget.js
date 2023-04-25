window.addEventListener('onWidgetLoad', async (obj) => {
  
  fieldData = obj.detail.fieldData
  const mySteamId = fieldData.steamId || 0
  const myRegion = fieldData.locale || "br"
  
  getData = async () => {
    const dataFetch = await fetch(`https://repl.c4ldas.com.br/api/steam/game/?id=${mySteamId}&region=${myRegion}`)
    const data = await dataFetch.json()
    
    if (data.name === '') {
      data.name = "Cannot load user data or no game running"
      data.price = "N/A"
      data.timePlayed = "N/A"
    }
    
    document.getElementById("title").innerText = data.name
    document.getElementById("box").style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.85) 60%, rgba(0,212,255,0) 100%), url('${data.header_image}') center center no-repeat`
    document.getElementById("box").style.backgroundSize = "100%"
    document.getElementById("price").innerHTML = `<i class="mdi mdi-currency-usd" aria-hidden="true" style="color: white;"></i> ${data.price}`
    document.getElementById("timeplayed").innerHTML = `<i class="mdi mdi-google-controller" aria-hidden="true" style="color: white;"></i> ${data.timePlayed}h`
  }
  
  getData()
})

window.addEventListener('onEventReceived', async (obj) => {
  console.log(obj)  
  if(obj.detail.listener !== 'message' || obj.detail.event.data.text !== fieldData['reloadCommand']) return
  getData()
})
