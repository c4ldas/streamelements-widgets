var voicemod
const container = document.querySelector("#container")
const connectionStatus = document.querySelector("#connectionStatus")
const currentVoiceLabel = document.querySelector("#currentVoiceLabel")
const currentVoice = document.querySelector("#currentVoice")
const ports = [59129, 20000, 39273, 42152, 43782, 46667, 35679, 37170, 38501, 33952, 30546]
let portIndex = 0
const voiceFilterAmount = 10
const getVoice = {
  "action": "getCurrentVoice",
  "id": Date.now(),
  "payload": {}
}

window.addEventListener('onWidgetLoad', async (obj) => {
  fieldData = obj.detail.fieldData
  if(fieldData.containerVisible == "false"){    
    container.style.backgroundColor = "transparent"
    container.style.borderStyle = "none"
  }
  if(fieldData.autoConnect == "false") return  
  connectVoicemod(fieldData.voicemodAPIKey)
   
})

function connectVoicemod(apiKey) {
  currentVoiceLabel.style.display = "none"
  if (portIndex < ports.length) {
    const port = ports[portIndex]
    voicemod = new WebSocket(`ws://localhost:${port}/v1`)
    connectionStatus.innerHTML = `Connecting to Voicemod, please wait. <br/>Connecting on port ${port}...`
    
    voicemod.onopen = (event) => {
      connectionStatus.innerHTML = `Connected to Voicemod on port ${port}! <br/>Starting authentication...`
      connectionStatus.style.color = "green"
      // Send authentication 
      authenticationData(apiKey)
    }      
    voicemod.onerror = (event) => {
      portIndex++
      connectVoicemod(apiKey) 
    }
  } else {
    connectionStatus.innerHTML = `Failed to connect to Voicemod! <br/>Please check the application is open and try again later.`
    connectionStatus.style.color = "red"
  }
  
  voicemod.onmessage = (event) => {
    const data = JSON.parse(event.data)    
    switch(data.action) {
      case "getCurrentVoice":
        currentVoicePlaying(data);
        break;
      case "registerClient":
        clientRegistered(data);
        break;
      case "voiceLoadedEvent":
        voiceLoadedEvent(data)
        break;
      case "voiceChangerEnabledEvent":
        voiceChangerEnabledEvent(data);
        break;
      case "voiceChangerDisabledEvent":
        voiceChangerDisabledEvent(data);
        break;
      case "getVoices":
        setVoice(data);
        break;
      default:
        break;
    }
  }  
}

function authenticationData(apiKey) {
  const registerClient = {
    "action": "registerClient",
    "id": Date.now(),
    "payload": { "clientKey": apiKey }
  }
  voicemod.send(JSON.stringify(registerClient))
}

function clientRegistered(data) {    
  if (data.payload.status.code == 200) {            
    connectionStatus.innerHTML = `Authenticated with Voicemod!`
    setTimeout( () => { connectionStatus.innerHTML = "" }, 5000)
    connectionStatus.style.color = "green"
    container.style.display = "block"
    currentVoiceLabel.style.display = "block"
    voicemod.send(JSON.stringify(getVoice))
    return
  }
  connectionStatus.innerHTML = `Failed to authenticate with Voicemod. <br/>Check the credentials and try again later!`
  connectionStatus.style.color = "red"
}

async function currentVoicePlaying(data) { 
  const voiceName = capitalizeString(data.actionObject.voiceID)
  currentVoice.innerHTML = voiceName
}

function voiceLoadedEvent(data) { 
  const voiceName = capitalizeString(data.actionObject.voiceID)
  currentVoice.innerHTML = voiceName
}

function voiceChangerEnabledEvent(data) { 
  voicemod.send(JSON.stringify(getVoice))
  container.style.display = "block"
  currentVoiceLabel.style.display = "block"
  currentVoice.style.display = "block"
}

function voiceChangerDisabledEvent(data) {
  container.style.display = "none"
  currentVoiceLabel.style.display = "none"
  currentVoice.style.display = "none"
} 

function setVoice(data){
  const voices = data.actionObject.voices
  voices.some((voice) => {
    if(voice.friendlyName == data.id){
      voicemod.send(JSON.stringify({
        action: "loadVoice",
        id: voice.id,
        payload: { voiceID: voice.id }
      })) 
    }
  })
}
  
// Transform VoiceID into voice name with correct capitalization
// Example: magic-chords --> Magic Chords
function capitalizeString(string) {  
  if(string == "nofx") return "Clean Voice"
  const words = string.split("-");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" ");
}

window.addEventListener('onEventReceived', async (obj) => {
  console.log("onEventReceived: ", obj)  
  if(obj.detail.event.type != "channelPoints") return
  const channelPointName = obj.detail.event.data.title
  const validChannelPoints = [];
  
  // Checking for the valid Channel Points
  for (let i = 1; i <= voiceFilterAmount; i++) {
    const fieldName = `channelPointName${i}`;
    validChannelPoints.push(fieldData[fieldName]);
  }
  if(!validChannelPoints.includes(channelPointName)) return
  
  function getVoices(voiceFilterName){
    voicemod.send(JSON.stringify({
      "action": "getVoices",
      "id": voiceFilterName,
      "payload": {}
    }))
  }
  // Read the amount of voices in FIELDS
  for (let x=1;x<=voiceFilterAmount;x++){
    const channelPointNameField = `channelPointName${x}`;
    const voiceFilterNameField = `voiceFilterName${x}`;  
    if (channelPointName === fieldData[channelPointNameField]) {
      getVoices(fieldData[voiceFilterNameField]);
      break;
    }  
  }  
})
