const predictionURL = "https://repl.c4ldas.com.br/api/twitch/prediction";
const cDragonUrl = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1";
const imageAssets = "https://raw.communitydragon.org/latest/game/assets/items/icons2d";
let predictionCreated = false;
let interval;

window.addEventListener("onWidgetLoad", async (obj) => { 
  let inGameAPI
  fieldData = obj.detail.fieldData;
  channel = obj.detail.channel.username;
  isEditor = obj.detail.overlay.isEditorMode
  code = fieldData.twitchCode;  
  
  const results = document.querySelector("#results");
  
  console.log("%c League of Legends Scoreboard overlay", "font-size: 1.5rem; color: green");
  console.log("%c Mock Data is:", "color: green", fieldData.mockData);
  
  if(fieldData.mockData){
    inGameAPI = "https://lol-c4ldas.replit.app/allgamedata";
  } else {
    inGameAPI = "https://127.0.0.1:2999/liveclientdata/allgamedata";
  }
  
  console.log("%c InGameAPI:", "color: green", inGameAPI)

  const itemFetch = await fetch(`${cDragonUrl}/items.json`)
  const championFetch = await fetch(`${cDragonUrl}/champion-summary.json`)
  const itemList = await itemFetch.json()
  const championList = await championFetch.json()
  let interval
  let newImg = document.createElement("img");
    
  // if(!isEditor) getGameData();
  getGameData()  
  
  async function getGameData() {
    try {
      results.innerText = "";
      let response = await fetch(inGameAPI);
      let data = await response.json();
      
      if(fieldData.enablePrediction == "true" && predictionCreated == false && data.events.Events.length == 1){
        const choice1 = "Win";
        const choice2 = "Lose";
        predictionCreated = createPrediction(fieldData.time, fieldData.predictionQuestion, choice1, choice2);
      }
      
      const lastEvent = data.events.Events.findLast( (event) => event.EventName == "GameEnd");
      if(fieldData.enablePrediction == "true" && !fieldData.mockData && lastEvent) closePrediction(lastEvent.Result);    
      
      // Loop through each player and set the corresponding image source
      for (let i = 0; i < data.allPlayers.length; i++) {
        
        if(data.allPlayers[i].championName == "Target Dummy") break; // remove dummies
        
        // Champion configuration
        let championDiv = document.querySelector(`#image-${i}`);
        let championFullName = data.allPlayers[i].championName;
        let championLevel = data.allPlayers[i].level;
      	let foundChampion = championList.find((element) => element.name == championFullName);
      	let championId;
        // console.log(foundChampion)
      	
      	if(!foundChampion){
      	  championId = -1
      	} else {
      	  championId = foundChampion.id;
      	}
      	championDiv.src = `${cDragonUrl}/champion-icons/${championId}.png`;
        document.querySelector(`#level-${i}`).style.backgroundColor = "black";
        document.querySelector(`#image-${i}`).style.backgroundColor = "hsla(51, 100%, 50%, 100%)";
        document.querySelector(`#level-${i}`).innerText = championLevel;
      	// console.log(championFullName);
        // console.log(championLevel);
      	
      	// KDA configuration
      	let kdaDiv = document.querySelector(`#kda-${i}`);      
      	let scores = data.allPlayers[i].scores;
      	let kda = `${scores.kills} / ${scores.deaths} / ${scores.assists}`;
      	kdaDiv.innerText = kda;
      	// console.log(kda)
      	
      	// Items configuration
      	let itemDiv = document.querySelector(`#items-${i}`);
      	let itemsArray = data.allPlayers[i].items;
        let totalItems = itemsArray.length; // Total number of items for the current champion
    	
        // Loop through each item obtained by the champion
        itemsArray.forEach( (obj, index) => {
          if (index == 6) return; // Skip processing the trinket
          
          let unitItem = document.querySelector(`#items-${i}-${index}`)    
      	  let itemId = obj.itemID;
      	  let foundItem = itemList.find((element) => element.id == itemId );
      	  let itemName;
      	  
      	  if(!foundItem){
            itemName = "gp_ui_placeholder.png";     
          } else {
            itemName = foundItem.iconPath.split("/").pop().toLowerCase();
          }        
          unitItem.src = `${imageAssets}/${itemName}`;

        })
        
        // Clear remaining img elements if the number of items is less than 6
        for (let j = totalItems; j < 6; j++) {
          let unitItem = document.querySelector(`#items-${i}-${j}`);
          unitItem.src = ""; // Clear the src attribute
        }
      }
      document.querySelector("#teams").style.visibility = "visible";
      
      interval = setTimeout( async () => {
        getGameData()
        // console.log(new Date().toISOString())
      }, 5000);
      
    } catch (error) {     
      clearInterval(interval);
      console.log("Catch error:", error)
      document.querySelector("#teams").style.visibility = "hidden";
      results.innerText = "Waiting game to start...";
      document.querySelectorAll(".item-unit").src = "";
      document.querySelectorAll(".kda").innerText = "";
      document.querySelectorAll(".champion-tile").src = "";
      setTimeout(() => { getGameData() }, 5000);
    }  
  }
  
});

// Create Prediction - Start
async function createPrediction(submissionTime, question, option1, option2){
  console.log("Creating Prediction");
  const predictionCreateFetch = await fetch(`${predictionURL}/create/${fieldData.twitchCode}/?time=${submissionTime}&channel=${channel}&option1=${option1}&option2=${option2}&question=${question}`);
  const predictionCreate = await predictionCreateFetch.text();
  console.log(predictionCreate);
  return predictionCreate.startsWith('Erro') ? true : false;
}    

// Close Prediction - Start
async function closePrediction(option){
  console.log("Closing Prediction");
  const predictionCloseFetch = await fetch(`${predictionURL}/close/${fieldData.twitchCode}/?channel=${channel}&winner=${option}`) 
  const predictionClose = await predictionCloseFetch.text();
  predictionCreated = false;
  console.log(predictionClose);
  return      
}
