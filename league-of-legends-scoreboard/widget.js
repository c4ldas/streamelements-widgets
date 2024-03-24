window.addEventListener("onWidgetLoad", async (obj) => { 
  fieldData = obj.detail.fieldData
  const results = document.querySelector("#results");
  let inGameAPI
  
  console.log("%c This is the LOL overlay", "font-size: 1.5rem; color: green") 
  console.log("%c Mock Data is:", "color: green", fieldData.mockData)
  
  if(fieldData.mockData){
    inGameAPI = "https://lol-c4ldas.replit.app/allgamedata";
  } else {
    inGameAPI = "https://127.0.0.1:2999/liveclientdata/allgamedata";
  }
  
  console.log("%c InGameAPI:", "color: green", inGameAPI)
  const cDragonUrl = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1"
  const imageAssets = "https://raw.communitydragon.org/latest/game/assets/items/icons2d"
  const itemFetch = await fetch(`${cDragonUrl}/items.json`)
  const championFetch = await fetch(`${cDragonUrl}/champion-summary.json`)
  const itemList = await itemFetch.json()
  const championList = await championFetch.json()
  let interval
  let newImg = document.createElement("img");
    
  teste()
  
  async function teste() {
    try {
      results.innerText = "";
      let response = await fetch(inGameAPI);
      let data = await response.json();     
      
      // Loop through each player and set the corresponding image source
      for (let i = 0; i < data.allPlayers.length; i++) {
        
        // Champion configuration
        let championDiv = document.querySelector(`#image-${i}`);
        let championFullName = data.allPlayers[i].championName;
        let championLevel = data.allPlayers[i].level
      	let foundChampion = championList.find((element) => element.name == championFullName);
      	let championId;
        console.log(foundChampion)
      	
      	if(!foundChampion){
      	  championId = -1
      	} else {
      	  championId = foundChampion.id;
      	}
      	championDiv.src = `${cDragonUrl}/champion-icons/${championId}.png`;
        document.querySelector(`#level-${i}`).style.backgroundColor = "black";
        document.querySelector(`#image-${i}`).style.backgroundColor = "hsla(51, 100%, 50%, 100%)";
        document.querySelector(`#level-${i}`).innerText = championLevel;
      	console.log(championFullName);
        // console.log(championLevel);
      	
      	// KDA configuration
      	let kdaDiv = document.querySelector(`#kda-${i}`);      
      	let scores = data.allPlayers[i].scores;
      	let kda = `${scores.kills} / ${scores.deaths} / ${scores.assists}`;
      	kdaDiv.innerText = kda;
      	console.log(kda)
      	
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
        teste()
        console.log(new Date().toISOString())
      }, 5000)      
      
    } catch (error) {
      console.log("Entrou no catch");      
      clearInterval(interval);
      console.log(error)
      document.querySelector("#teams").style.visibility = "hidden";
      results.innerText = "Waiting game to start...";
      document.querySelectorAll(".item-unit").src = "";
      document.querySelectorAll(".kda").innerText = "";
      document.querySelectorAll(".champion-tile").src = "";
      setTimeout(() => { teste() }, 5000);
    }  
  }
  
});
