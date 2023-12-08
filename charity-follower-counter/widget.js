const keyName = "charityFollowerCounter"

window.addEventListener('onWidgetLoad', async (obj) => {
  fieldData = obj.detail.fieldData
  
  // Check the current value at the start of the widget and update the interface
  const totalFollowers = await checkValue() || 0
  updateInterface(totalFollowers)
})


window.addEventListener('onEventReceived', async (obj) => {
  const listener = obj.detail.listener
  
  // Once gets a new follower, increase the follower value
  if(listener === "follower-latest"){
    const currentValue = await checkValue()
    const newfollowerValue = currentValue + 1
    updateValue(newfollowerValue)
    updateInterface(newfollowerValue)
  }  
  
  // If chat message is the reset command and typed by streamer, reset the counter
  if(listener === "message" && obj.detail.event.data.text === fieldData.resetCommand && 
     obj.detail.event.data.nick == obj.detail.event.data.channel){
    updateValue(0)
    updateInterface(0)
  }
})


// Check the current value of followers since started counting
async function checkValue(){
  const getValue = await SE_API.store.get(keyName)
  if(!getValue) return 0
  const currentValue = getValue.value
  if(!currentValue) return 0
  return currentValue
}

async function updateValue(newValue){
  const test = await SE_API.store.set(keyName, { value: newValue } )
}


// Update the interface with the value
async function updateInterface(followerCounter){
  const totalDonation = followerCounter * fieldData.multiplier
  document.querySelector("#value").innerText = `${fieldData.currencySymbol}${totalDonation.toFixed(2).replace('.', fieldData.decimalSeparator)}`
}
