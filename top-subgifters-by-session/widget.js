// Starting an empty list of gifters 
const gifterObj = {}

window.addEventListener('onWidgetLoad', async (obj) => {
  fieldData = obj.detail.fieldData
  mockData = fieldData.mockData.replaceAll("'",'"') // Replacing single quotes to double quotes for JSON support
  isEditor = obj.detail.overlay.isEditorMode
  
  // console.log('onWidgetLoad: ', JSON.parse(mockData))
  
  // When in Ovelray Editor, show mock data to test font, color, size, spacing, etc
  if(isEditor){
    sortTopGifters(JSON.parse(mockData))
    return
  }  
})


window.addEventListener('onEventReceived', async (obj) => {
  // When clicking on button "Test with mock data", it will show mock data on OBS to test
  if(obj.detail.event.listener == 'widget-button' && obj.detail.event.field == 'testWidget'){
    console.log('onEventReceived: ', JSON.parse(mockData))
    sortTopGifters( JSON.parse(mockData) )
    return
  } 
  
  // If not a subscription option, ignore
  if(obj.detail.listener != 'subscriber-latest') return
  
  // If subscription is a gift, start counting
  if(obj.detail.event.gift) {    
    // const sender = obj.detail.event.data.text || obj.detail.event.sender; // Remove this line
    // Checking the sender (gifter)
    const sender = obj.detail.event.sender;
    // Adding one to the gifter key object. In case it is the first time gifting, create the gifter key with value 1
    gifterObj[sender] = gifterObj[sender] + 1 || 1
    
    sortTopGifters(gifterObj)
  }
})


// Sort the top gifters and show on screen
async function sortTopGifters(gifterObj){
  let array = []

  // Sorting gifters in descending order
  const keysSorted = Object.keys(gifterObj).sort(function(a,b){return gifterObj[b]-gifterObj[a]})

  // Create the list with the amount chosen 
  for(let username in keysSorted){
    if(username >= fieldData.giftersToDisplay) break
    
    fieldData.showAmount == "true" ? response = `${keysSorted[username]} - ${gifterObj[keysSorted[username]]}` : response = keysSorted[username]
    array.push(`<div class='top'> ${response} </div>`)
  }
  // Show the gifters sorted on screen (HTML tab) and using the separator (if any)
  document.querySelector("#container").innerHTML = array.toString().replaceAll(',', `${fieldData.separator}`)
  
}
