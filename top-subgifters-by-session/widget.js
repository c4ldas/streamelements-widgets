// Starting an empty list of gifters 
const gifterObj = {}

window.addEventListener('onWidgetLoad', async (obj) => {
  fieldData = obj.detail.fieldData
  mockData = fieldData.mockData.replaceAll("'",'"') // Replacing single quotes to double quotes for JSON support
  isEditor = obj.detail.overlay.isEditorMode
  
  if(fieldData.customFontName != ""){
    document.querySelector("#container").style.fontFamily = fieldData.customFontName
  }
  
  // When in Ovelray Editor, show mock data to test font, color, size, spacing, etc
  if(isEditor){
    sortTopGifters(JSON.parse(mockData))
    return
  }  
})


window.addEventListener('onEventReceived', async (obj) => {
  
  console.log(obj)
  // When clicking on button "Test with mock data", it will show mock data on OBS to test
  if(obj.detail.event.listener == 'widget-button' && obj.detail.event.field == 'testWidget'){
    console.log('onEventReceived: ', JSON.parse(mockData))
    sortTopGifters( JSON.parse(mockData) )
    return
  } 
  
  // Manually add a subgifter (Only Streamer can do that)
  if(obj.detail.listener == 'message' && obj.detail.event.data.nick == obj.detail.event.data.channel && obj.detail.event.data.text.startsWith(fieldData.command)){
    
    // Command example: !addgifter username value
    const username = obj.detail.event.data.text.split(" ")[1]
    const value = parseInt(obj.detail.event.data.text.split(" ")[2])
    
    gifterObj[username] ? gifterObj[username]+= value : gifterObj[username] = value
    sortTopGifters(gifterObj)
  }
  
  // If not a subscription option, ignore
  if(obj.detail.listener != 'subscriber-latest') return
  
  // If subscription is a gift, start counting
  if(obj.detail.event.gifted) {    
    // Checking the sender (gifter)
    const sender = obj.detail.event.sender;
    // Adding one to the gifter key object. In case it is the first time gifting, create the gifter key with value 1
    gifterObj[sender] = gifterObj[sender] + 1 || 1
    
    sortTopGifters(gifterObj)
  }
})


// Sort the top gifters and show them on screen
async function sortTopGifters(gifterObj){
  let array = []

  // Sorting gifters in descending order
  const keysSorted = Object.keys(gifterObj).sort(function(a,b){return gifterObj[b]-gifterObj[a]})
  
  // Create the list with the amount chosen 
  for(let username in keysSorted){
    // Only shows the amount requested    
    if(username >= fieldData.giftersToDisplay) break
    
    // Select whether the amount of each subgifter will be shown
    fieldData.showAmount == "true" ? response = `${keysSorted[username]} - ${gifterObj[keysSorted[username]]}` : response = keysSorted[username]
    array.push(`<div class='top'> ${response} </div>`)
  }
  // Show the gifters sorted on screen (HTML tab) and using the separator chosen (if any)
  document.querySelector("#container").innerHTML = array.toString().replaceAll(',', `${fieldData.separator}`)
  
}
