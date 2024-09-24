var reloadOverlay
const sendPingSeconds = 240000 // 4 minutes
const reloadOverlayTime = 9000 // 9 seconds

window.addEventListener('onEventReceived', async (obj) => {
  if(obj.detail.event.field == "emulateButton"){ 
    const redemptionInfo = createRequest("_", true);
    sendRequest(redemptionInfo);
  }
  
  if(obj.detail.event.type == "channelPoints"){
  	console.log(obj)
  	if(isEditorMode){    
      const { image, backgroundColor, userInput, title } = obj.detail.event.data
      document.querySelector("#text").innerText = "This won't appear on OBS, it's just a test on Overlay editor"
      document.querySelector("#redemption").style.background = `no-repeat center/75% url("${image}"), ${backgroundColor}`;
      document.querySelector("#redemption-name").innerText = title
      document.getElementById('redemptionMessage').innerText = userInput
      setTimeout( () => {
        document.querySelector("#text").innerText = "Twitch Channel Points"
        document.querySelector("#redemption").style.background = ""
        document.querySelector("#redemption-name").innerText = ""
        document.getElementById('redemptionMessage').innerText = ""
      }, 10000);  
    }
  }  
})


window.addEventListener('onWidgetLoad', async (obj) => {
  fieldData = obj.detail.fieldData;
  isEditorMode = obj.detail.overlay.isEditorMode;
  
  if(isEditorMode){
    document.querySelector("#text").innerText = "Twitch Channel Points"
    document.querySelector("#redemption-name").innerText = "This info won't appear on your OBS"
  }
  
  apiToken = obj.detail.channel.apiToken
  channelId = obj.detail.channel.id
  const providerId = obj.detail.channel.providerId
  const socket = new WebSocket('wss://pubsub-edge.twitch.tv')
  const eventTopic = `community-points-channel-v1.${providerId}`
    
  // Connection and authentication  
  socket.onopen = (event) => {
    const info = {
      "type": "LISTEN",
      "data": {
        "topics": [eventTopic]
      }
    }
    console.log("Successfully connected to the websocket - Twitch!");
    socket.send(JSON.stringify(info));
    
    // Send PING every 4 minutes to keep the connection alive
    // https://dev.twitch.tv/docs/pubsub/#connection-management
    setInterval( () => { sendPing() }, sendPingSeconds)
  }
  
  // Send PING to keep the connection alive.
  // Also wait 9 seconds to reload the widget in case there is no PONG
  async function sendPing(){
    socket.send(JSON.stringify( { type: "PING" } ));

    // PING sent. If no PONG returned in 9 seconds, reload the widget to reauthenticate
    // https://dev.twitch.tv/docs/pubsub/#connection-management
    reloadOverlay = setTimeout( () => {
      console.log("Pubsub reconnect!")
      location.reload()      
    }, reloadOverlayTime)
  }  
 
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // PONG received, cancel the timer to reload the widget
    if(data.type == "PONG"){   
      clearTimeout(reloadOverlay)
      console.log("PONG received, overlay won't reload!")
    }
    
    // RECONNECT status received, widget needs to be reloaded to reauthenticate
    if(data.type == "RECONNECT"){
      console.log("PubSub needs to reconnect, reloading it...")
      location.reload()
    }
    
    // In case it is a Channel Point Redemption, get the variables to be sent
    if(data.data?.topic == eventTopic){
      const redemptionData = JSON.parse(data.data.message);
      
      if(redemptionData.type == 'reward-redeemed'){
       const { id, reward, user, user_input, redeemed_at } = redemptionData.data.redemption;
       const image = reward.image?.url_4x || reward.default_image.url_4x;
       const backgroundColor = reward.background_color;
       const activityId = crypto.randomUUID().replace(/-/g, '').substring(0, 24)
       
       const redemptionValues = { id, reward, user, user_input, image, backgroundColor, redeemed_at, activityId, redemptionData }
       const redemptionInfo = createRequest(redemptionValues, false);
       sendRequest(redemptionInfo);
      }
    }
  }
       
})

// Create request format to be sent via socket
function createRequest(data, emulation){
  if(emulation) {
    const redemptionInfo = {
      "activityId": crypto.randomUUID().replace(/-/g, '').substring(0, 24), 
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString(),
      "channel": channelId,
      "type": "channelPoints",       
      "data": {
        "rewardId": "abcd1234-abcd-1234-abcd-1234abcd1234abcd", 
        "title": fieldData.emulateTitle,
        "raw": { info: "No raw data due to emulation", more_info: "Redeem a real redemption for raw data" },
        "cost": fieldData.emulateCost,
        "backgroundColor": "#00FF00",
        "image": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png",
        "userInput": fieldData.emulateUserInput,
        "username": fieldData.emulateUsername,
      }
    };
    return redemptionInfo;
  }
    
  const { id, reward, user, user_input, image, backgroundColor, redeemed_at, activityId, redemptionData } = data;
  const redemptionInfo = { 
    "activityId": activityId, 
    "createdAt": new Date(redeemed_at).toISOString(),
    "updatedAt": new Date(redeemed_at).toISOString(),
    "channel": channelId,
    "type": "channelPoints",       
    "data": {
      "rewardId": id, 
      "title": reward.title,
      "raw": redemptionData.data.redemption,
      "cost": reward.cost,
      "backgroundColor": backgroundColor,
      "image": image,
      "userInput": user_input || "",
      "username": user.display_name,
    }
  };
  return redemptionInfo;
}

// Send a socket event that can be caught by onEventListener('onEventReceived') on any custom widget
async function sendRequest(redemptionInfo){
  fetch(`https://api.streamelements.com/kappa/v2/channels/${channelId}/socket`, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `apikey ${apiToken}`
    },      
    "body": JSON.stringify({
      event: "event",
      data: redemptionInfo
    })
  })
}
