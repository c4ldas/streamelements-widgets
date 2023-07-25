/* <!-- ERROR SCREEN WIDGET --> */

window.addEventListener('onWidgetLoad', async (obj) => {
  
  fieldData = obj.detail.fieldData
  isEditorMode = obj.detail.overlay.isEditorMode  
  windowContainer = document.getElementById(`window-container`)
  percentage = document.getElementById(`percentage`)
  moreInformation = document.getElementById(`more-information`)
  supportPerson = document.getElementById(`support-person`)
  stopCode = document.getElementById(`stop-code`)
  errorMessage = document.getElementById('error-message')
  titleMessage = document.getElementById(`title-message`)
  body = document.getElementById(`body`)
  subtitle = document.getElementById(`subtitle`)
  message1 = document.getElementById(`message-1`)
  message2 = document.getElementById(`message-2`)
  productKey = document.getElementById(`product-key`)
  loading = document.getElementById(`loading`)
  buttons = document.getElementById(`buttons`)
  pointerWrapper = document.getElementById(`pointer-wrapper`)
  pointer = document.getElementById(`pointer`)
  next = document.getElementById(`next`)
  cancel = document.getElementById(`cancel`) 
  screenContainer = document.getElementById('screen-container')
  textContainer = document.getElementById('text-container')
  activate = document.getElementById('activate')
  settings = document.getElementById('settings')
  
  var textArray =  ['errorMessage', 'percentage', 'moreInformation', 'supportPerson', 'stopCode', 'titleMessage', 'activated', 'subtitle', 'message1', 'message2', 'productKey', 'next', 'cancel', 'activate', 'settings']
  
  var messages = {
    en: {
      errorMessage: "Your PC ran into a problem and needs to restart. We're<br/>just collecting some error info, and then we'll restart for<br/>you.",
      percentage: "20% complete",
      moreInformation: "For more information about this issue and possible fixes, visit https://www.windows.com/stopcode",
      supportPerson: "If you call a support person, give them this info:",
      stopCode: "Stop code: CRITICAL_PROCESS_DIED",
      titleMessage: "Enter a product key",
      activated: "Windows activated successfully!",
      subtitle: "Enter a product key",
      message1: "Your product key should be in an email from whoever sold or distributed Windows to you, or on the box the Windows DVD or USB came in.",
      message2: "Product Key",
      productKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
      next: "Next",      
      cancel: "Cancel",
      activate: "Activate Windows",
      settings: "Go to Settings to activate Windows."
    },    
    pt: {
      errorMessage: "Ocorreu um problema e seu PC precisa ser reiniciado. Estamos <br/>coletando algumas informações sobre o erro e, em seguida,<br/>reiniciaremos para você.",
      percentage: "20% concluído",
      moreInformation: "Para obter mais informações sobre esse problema e correções possíveis, visite https://www.windows.com/stopcode",
      supportPerson: "Se você ligar para o suporte, forneça estas informações:",
      stopCode: "Código de parada: CRITICAL PROCESS DIED",
      titleMessage: "Inserir chave do produto (Product Key)",
      activated: "Windows ativado com sucesso!",
      subtitle: "Inserir chave do produto (Product Key)",
      message1: "Sua chave do produto (Product Key) deve estar em um email de quem vendeu ou distribuiu o Windows para você, ou na caixa em que veio o DVD ou USB do Windows.",
      message2: "Chave do produto (Product Key)",
      productKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
      next: "Avançar",
      cancel: "Cancelar",
      activate: "Ativar o Windows",
      settings: "Acesse Configurações para ativar o Windows."
    }
  }
    
  const iterator = textArray.values();
  for (const value of iterator) {
    if(this[value]) {
      this[value].innerHTML = messages[fieldData.language][value]
    }    
  }  
  
  if(isEditorMode){        
    screenContainer.style.visibility = 'visible'
    screenContainer.style.opacity = 0.1
    windowContainer.style.visibility = 'visible'
    windowContainer.style.opacity = 0.3
    textContainer.style.visibility = 'visible'
    textContainer.style.opacity = 0.7
  }    
  
  // Getting Custom Reward Channel Point ID
  const twitchItemsFetch = await fetch(`https://api.jebaited.net/twitchItems/${obj.detail.channel.username}`)
  const twitchItems = await twitchItemsFetch.json()
  const { customRewards } = twitchItems[0].data.community.channel.communityPointsSettings
  
  for(const element of customRewards){
    if(element.title === fieldData.channelPointName){
      //console.log({ title: element.title, id: element.id })
      SE_API.setField("channelPointId", element.id, false)
    }
  } 
  
})

window.addEventListener('onEventReceived', (obj) => {
  console.log(fieldData)
  if(obj.detail.event.listener === 'widget-button' && obj.detail.event.field === 'refresh'){
    location.reload()
  }
  
  // In case the event is not a message, nothing will be executed  
  if(obj.detail.listener !== 'message') return  
  if(obj.detail.event.data.tags["custom-reward-id"] !== fieldData.channelPointId) return
  
  // Reset the configuration  
  windowContainer.style.opacity = 1
  windowContainer.style.visibility = 'visible'
  pointerWrapper.classList.remove('pointer-animation-y')
  pointer.classList.remove('pointer-animation-x')
  productKey.style.color = 'black' 
  
  // Start typing the text
  const typewriter = new Typewriter(productKey, { loop: false, delay: 75, cursor: '' })
  typewriter
    .pauseFor(1000)
    .typeString(obj.detail.event.renderedText.substring(0,45))
    .callFunction( () => mouseAnimation())
    .start()
  
  async function mouseAnimation(){
    pointerWrapper.classList.add('pointer-animation-y')
    pointer.classList.add('pointer-animation-x')
    pointer.onanimationend = () => {
      next.style.backgroundColor = 'hsl(211, 100%, 20%)'
      setTimeout( () => {
        next.style.backgroundColor = 'hsl(211, 100%, 43%)'
        activatingWindows()
      }, 80)
    }
  }
  
  async function activatingWindows(){
    console.log("activatingWindows...")
    loading.style.visibility = 'visible'
    next.style.visibility = 'hidden'
    cancel.style.visibility = 'hidden'
    
    Math.random() < (fieldData.activationSuccess/100) ? success() : failed()
  }
  
  
  async function success(){
    console.log("Success!")
    
    setTimeout( async () => { 
      titleMessage.innerText = messages[fieldData.language].activated
      message1.innerText = messages[fieldData.language].activated
      message1.style.fontSize = '3em'
      message1.style.left = '0'
      message1.style.right = '0'
      message1.style.textAlign = 'center'
      message2.style.visibility = 'hidden'
      loading.style.visibility = 'hidden'
      textContainer.style.visibility = 'hidden'
      productKey.style.visibility = 'hidden'
      subtitle.style.visibility = 'hidden' 
      setTimeout( () => {
        reactivateWidget()
      }, fieldData.blueScreenTime * 1000)
    }, 5000)
  }  
  
  
  async function failed(){    
    console.log("Failed!")
    setTimeout( async () => { 
      windowContainer.style.visibility = 'hidden' 
      loading.style.visibility = 'hidden'
      textContainer.style.visibility = 'hidden'
      screenContainer.style.visibility = 'visible'
      screenContainer.style.opacity = "1"
      console.log(screenContainer)
      fieldData.connectObs === "true" ? connectObs() : setTimeout(reactivateWidget, fieldData.blueScreenTime * 1000)
    }, 5000)
  }
      
  
  async function connectObs(){
    const obs = new OBSWebSocket();
    await obs.connect(`ws://127.0.0.1:${fieldData.obsPort}`, `${fieldData.obsPassword}`)
    console.log("Connected to OBS...")      
    obs.call('SetInputMute', { inputName: fieldData.microphone, inputMuted: true })
    obs.call('SetInputMute', { inputName: fieldData.desktopAudio, inputMuted: true })
    console.log('Mic and Desktop audio muted!')
    
    setTimeout( async () => {
      await obs.call('SetInputMute', { inputName: fieldData.microphone, inputMuted: false })
      await obs.call('SetInputMute', { inputName: fieldData.desktopAudio, inputMuted: false })
      console.log('Mic and Desktop Audio unmuted!')
      await obs.disconnect()
      console.log('Disconnected from OBS')
      reactivateWidget()
      // windowContainer.style.visibility = 'hidden'
      // screenContainer.style.visibility = 'hidden'       

    }, fieldData.blueScreenTime * 1000) 
  }
  

  async function reactivateWidget(){
    console.log("reactivate Widget...")
    console.log("Editor mode: ", isEditorMode)
    
    if(isEditorMode){        
      screenContainer.style.visibility = 'visible'
      screenContainer.style.opacity = 0.1
      windowContainer.style.visibility = 'visible'
      windowContainer.style.opacity = 0.3
    } else {
      windowContainer.style.visibility = 'hidden'
      screenContainer.style.visibility = 'hidden'
    }
    setTimeout( () => {
      // textContainer.style.visibility = 'visible'
      location.reload()
    }, fieldData.reactivateTimer * 60 * 1000)
  } 
  
})
