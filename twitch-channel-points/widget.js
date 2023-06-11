
window.addEventListener('onWidgetLoad', async (obj) => {
      
  const providerId = obj.detail.channel.providerId
  const username = obj.detail.channel.username
  
  const socket = new WebSocket('wss://pubsub-edge.twitch.tv')
  const eventTopic = `community-points-channel-v1.${providerId}`
  
  document.getElementById('text').innerText = `Twitch Channel Points - ${username}`
  
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
    
    setInterval( () => { sendPing() }, 120000)
  }
  
 
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // If it is a PING, send a PONG to keep the connection alive
    if(event.data.type == "PING"){      
      sendPong();
    }
    
     // In case it is a Channel Point Redemption, get the variables and call the function RedemptionRedeemed()
    if(data.data?.topic == eventTopic){
      const redemptionData = JSON.parse(data.data.message);
      
      if(redemptionData.type == 'reward-redeemed'){
       const { id, reward, user, user_input } = redemptionData.data.redemption;
       const image = reward.image?.url_4x || reward.default_image.url_4x;
       const background = reward.background_color;
       
       redemptionRedeemed(id, reward, user, user_input, image, background, redemptionData);
      }
    }
  }

  // Send PING to keep the connection alive
  function sendPing(){
    socket.send(JSON.stringify( { type: "PING" } ));
  }
   
  // Send PONG to keep the connection alive
  function sendPong(){
    socket.send(JSON.stringify( { type: "PONG" } ));
  }
  
  // Here you do whatever you want with the reward
  function redemptionRedeemed(id, reward, user, user_input, image, background, redemptionData){    
    // In the example below, it will show the redemption information on browser console and HTML during 20 seconds
    console.table({ 'ID': id, 'Title': reward.title, 'Username': user.display_name, 'User Input': user_input, 'Image':  image, 'Background': background, 'Cost': reward.cost });
    console.log(redemptionData.data);

    document.getElementById('redemption').style.background = `no-repeat center/75% url("${image}"), ${background}`;
    document.getElementById('redemptionMessage').innerText = user_input ? user_input : ''
    setTimeout( () => {
      document.getElementById('redemption').style.background = ''
      document.getElementById('redemptionMessage').innerText = ''
    }, 20000);
  }
})
