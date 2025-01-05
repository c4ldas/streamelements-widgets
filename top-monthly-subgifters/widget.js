// Initial data to create SE_API object
let gifterObj = {
    "jan": [],
    "feb": [],
    "mar": [],
    "apr": [],
    "may": [],
    "jun": [],
    "jul": [],
    "aug": [],
    "sep": [],
    "oct": [],
    "nov": [],
    "dec": []
};

let eventId = [];

// Name of SE_API object key
const key = "topMonthlySubgifters";

// Get the current month (jan, feb, mar, apr, etc)
const currentMonth = new Date().toLocaleDateString("default", {month: "short"}).toLowerCase();

window.addEventListener('onWidgetLoad', async (obj) => {
    
  fieldData = obj.detail.fieldData;
  isEditor = obj.detail.overlay.isEditorMode;
  const data = await SE_API.store.get(key);

  // Create key if not exists
  if(!data || !data.jan){  
    console.log(`%c [Top monthly subgifters] key "${key}" missing or malformed, (re)creating it...`, `color: yellow;`);
    await SE_API.store.set(key, gifterObj);
    console.log(await SE_API.store.get(key));
  }  
  
  // Custom font
  if(fieldData.customFontName != ""){
    document.querySelector("#container").style.fontFamily = fieldData.customFontName;
  }
  
  // Update the UI
  updateInterface(data[currentMonth]);
});



window.addEventListener('onEventReceived', async (obj) => {
  
  // Check if the Community gift is emulated and add all eventIds to be compared later
  if(obj.detail.listener == "event" && obj.detail.event.isMock){
    eventId = [...eventId, obj.detail.event._id]
  }
  
  /////////////////////////////
  // Add gifter manually
  /////////////////////////////  
  if(obj.detail.listener == 'message' &&
     obj.detail.event.data.nick == obj.detail.event.data.channel && // Check if is streamer
     obj.detail.event.data.text.startsWith(fieldData.command)) // Check if it is the correct command
  {
    // Command example: !addgifter username value
    const username = obj.detail.event.data.text.split(" ")[1];
    let amount = parseInt(obj.detail.event.data.text.split(" ")[2]);
    if(isNaN(amount)){ amount = 0; }
    
    const kvStore = await SE_API.store.get(key);
    
    updateUser({"kvStore": kvStore[currentMonth], "username": username, "amount": amount } );
    sortByAmount(kvStore[currentMonth]);
    updateInterface(kvStore[currentMonth]);
    
    await SE_API.store.set(key, kvStore);
  }
  
  // Test mock data
  if(obj.detail.listener == "event:test" && obj.detail.event.field == "testWidget"){
    const data = [ 
      { username: "Eminem", amount: 10 },
      { username: "Adele", amount: 7 },
      { username: "RickAstley", amount: 5 },
      { username: "LadyGaga", amount: 3 },
      { username: "MichaelJackson", amount: 3 },
      { username: "Shakira", amount: 1 }
    ]
    
    // As it is mock data, we just update the interface to test
  	updateInterface(data);    
  }
});


/////////////////////////////
// onSubBombComplete - Community gift
/////////////////////////////
async function onSubBombComplete(data){ 
  // Check if is Emulated event
  if(eventId.find((value) => value == data._id)){
    console.log("%c [Top monthly subgifters] Emulated event ignored.", "color: yellow;");
    eventId = [];
    return;
  }  
  
  const kvStore = await SE_API.store.get(key);
  
  updateUser({"kvStore": kvStore[currentMonth], "username": data.sender, "amount": data.amount } );
  sortByAmount(kvStore[currentMonth]);
  updateInterface(kvStore[currentMonth]);
    
  // Update SE_API with new data
  await SE_API.store.set(key, kvStore);  
}


/////////////////////////////
// onSubGift
/////////////////////////////
async function onSubGift(data){  
  // Check if is Emulated event
  if(eventId.find((value) => value == data._id)){
    console.log("%c [Top monthly subgifters] Emulated event ignored.", "color: yellow;");
    eventId = [];
    return;
  }  
  
  const kvStore = await SE_API.store.get(key);
  
  updateUser({ "kvStore": kvStore[currentMonth], "username": data.sender, "amount": 1});
  sortByAmount(kvStore[currentMonth]);
  updateInterface(kvStore[currentMonth]);
    
  // Update SE_API with new data
  await SE_API.store.set(key, kvStore);  
}

              
/////////////////////////////
// Function to add/update user
/////////////////////////////
function updateUser(data){  
  let { kvStore, username, amount } = data;
  
  if(!username || !amount) return;
  
  const user = kvStore.find(item => item.username.toLowerCase() == username.toLowerCase());
  if (user) {
    user.amount += amount;
  } else {
    kvStore.push({ username: username, amount: amount });
  }
}

/////////////////////////////
// Function to sort array
/////////////////////////////
function sortByAmount(array){
  array.sort((a, b) => b.amount - a.amount);
}


/////////////////////////////
// Function to update interface with the data
/////////////////////////////
function updateInterface(data){  
  let array = [];
  
  // Show updated list
  for(let user in data){
     if(user >= fieldData.giftersToDisplay) break;
    
    const response = fieldData.showAmount == "true" ? 
          			`${data[user].username} - ${data[user].amount}` : 
    				`${data[user].username}`;
    
    array.push(`<div class='top'> ${response} </div>`);
  }
  document.querySelector("#container").innerHTML = array.toString().replaceAll(",", `${fieldData.separator}`);
}
