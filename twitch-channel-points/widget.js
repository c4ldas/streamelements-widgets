var reloadOverlay
const sendPingSeconds = 240000 // 4 minutes
const reloadOverlayTime = 9000 // 9 seconds

window.addEventListener('onEventReceived', async (obj) => {
  if(obj.detail.listener == 'channelPoints') {
    console.log(obj)
  }
})

window.addEventListener('onWidgetLoad', async (obj) => {
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
    
    // In case it is a Channel Point Redemption, get the variables and call the function RedemptionRedeemed()
    if(data.data?.topic == eventTopic){
      const redemptionData = JSON.parse(data.data.message);
      
      if(redemptionData.type == 'reward-redeemed'){
       const { id, reward, user, user_input, redeemed_at } = redemptionData.data.redemption;
       const image = reward.image?.url_4x || reward.default_image.url_4x;
       const backgroundColor = reward.background_color;
       const activityId = crypto.randomUUID().replace(/-/g, '').substring(0, 24)
       
       redemptionRedeemed(id, reward, user, user_input, image, backgroundColor, redeemed_at, activityId, redemptionData);
      }
    }
  }
       
  // Here you do whatever you want with the reward
  async function redemptionRedeemed(id, reward, user, user_input, image, backgroundColor, redeemed_at, activityId, redemptionData){ 
    const redemptionInfo = { 
      "rewardId": id, 
      "activityId": activityId,
      "title": reward.title, 
      "createdAt": new Date(redeemed_at).toISOString(),
      "updatedAt": new Date(redeemed_at).toISOString(),
      "channel": channelId,
      "type": "channelPoints",       
      "data": {
        "raw": redemptionData.data.redemption,
        "cost": reward.cost,
        "backgroundColor": backgroundColor,
        "image": image,
        "userInput": user_input,
        "username": user.display_name,
      }  
    }
    
    // Send a socket event that can be caught by onEventListener('onEventReceived') on any custom widget
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
    
    // const channelPointsEvent = new CustomEvent("onEventReceived", data)
    // window.dispatchEvent(channelPointsEvent);

    // document.getElementById('redemption').style.background = `no-repeat center/75% url("${image}"), ${backgroundColor}`;
    // document.getElementById('redemptionMessage').innerText = user_input ? user_input : ''
    // setTimeout( () => {
    //   document.getElementById('redemption').style.background = ''
    //   document.getElementById('redemptionMessage').innerText = ''
    // }, 20000);
  }
})
