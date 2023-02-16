window.addEventListener('onWidgetLoad', async function (obj){
  fieldData = obj.detail.fieldData 
  channel = obj.detail.channel.username
  
  tftBadge()
  showBadge()
  
  async function tftBadge(){
    const getRankFetch = await fetch(`https://repl.c4ldas.com.br/api/tft/rank?type=overlay&region=${fieldData.region}&player=${fieldData.playerName}`)
    const getRank = await getRankFetch.json()
    const rank = getRank.tier.toLowerCase()
    const points = getRank.leaguePoints
    
    const badge = `https://raw.communitydragon.org/12.14/game/assets/ux/tftmobile/particles/tft_regalia_${rank}.png`
    
    document.getElementById('image-id').src = badge
    
    if(fieldData.showPoints === 'true'){       
      document.getElementById('points').innerText = `${points} points`
    }
    
    setTimeout(tftBadge, 120000)
  }
  
  function showBadge(){    
    $("#tft, #points").show().css('animation', `${fieldData.animEnter} ${fieldData.animEnterDuration}ms forwards`);  
    setTimeout(hideBadge, fieldData.showBadge * 1000)
  }
  
  function hideBadge(){
    $('#tft').css('animation', `${fieldData.animExit} ${fieldData.animExitDuration}ms forwards`);
    setTimeout(showBadge, fieldData.hideBadge * 1000)
  }
})

window.addEventListener('onEventReceived', async function(obj) {
  
  if(obj.detail.listener !== "message") return
  
  const data = obj.detail.event.data
  const channel = data.channel		
  const user = data.nick
  const text = data.text  
  const tftDiv = document.getElementById("tft")
  
  const userState = { 
    'mod': parseInt(data.tags.mod),
    'sub': parseInt(data.tags.subscriber),
    'vip': (data.tags.badges.indexOf("vip") !== -1),
    'broadcaster': user === channel
  }  
  
  if(text === fieldData.tempDisable && (userState.mod || userState.broadcaster)){
    tftDiv.style.visibility = "hidden";
  }
  
  if(text === fieldData.tempEnable && (userState.mod || userState.broadcaster)){
    tftDiv.style.visibility = "visible";  
  }
  
})
