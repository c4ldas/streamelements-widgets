window.addEventListener("onWidgetLoad", async (obj) => { 
  let interval;
  let replayId;
  let predictionCreated = false;
  
  const fieldData = obj.detail.fieldData;
  const channel = obj.detail.channel.username;
  const isEditor = obj.detail.overlay.isEditorMode; 
  
  const predictionUrl = "https://repl.c4ldas.com.br/api/twitch/prediction";
  const cDragonUrl = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1";
  const imageAssets = "https://raw.communitydragon.org/latest/game/assets/items/icons2d";
  const mockUrl = "https://raw.githubusercontent.com/c4ldas/lol-mock-gamedata/main/allgamedata.json";
  const inGameUrl = "https://127.0.0.1:2999/liveclientdata/allgamedata";
  const activeGameUrl = "https://repl.c4ldas.com.br/api/lol/active-game";
  
  const waiting = document.querySelector("#waiting");
  const teams = document.querySelector("#teams");
  const itemUnit = document.querySelectorAll(".item-unit");
  const kda = document.querySelectorAll(".kda");
  const championTile = document.querySelectorAll(".champion-tile");  
  const itemList = await fetch(`${cDragonUrl}/items.json`).then((res) => res.json());
  const championList = await fetch(`${cDragonUrl}/champion-summary.json`).then((res) => res.json());
  
  // Widget description on browser console
  console.log("%c League of Legends Scoreboard widget", "font-size: 1rem; color: green") 
  
  // Widget will wait until player name and tag are filled out.
  if(!fieldData.playerName || !fieldData.tagLine) {
    console.log(`%c Please add your "Player name" and "Player tag #" to the fields.`, "color: yellow");
    return;
  }
  
  getInternalGameData();  
  getGameResults();  
  
  async function getInternalGameData() {
    try {
      waiting.innerText = "";
  
      // Fetch the JSON data
      const response = isEditor || fieldData.mockData ? await fetch(mockUrl) : await fetch(inGameUrl);
      const data = await response.json();
  
      // Loop through each player and update the DOM
      data.allPlayers.forEach((player, i) => {
        if (player.championName === "Target Dummy") return; // Skip dummies
  
        // Update champion information
        const championElement = document.querySelector(`#image-${i}`);
        const championLevelElement = document.querySelector(`#level-${i}`);
        const championName = player.championName;
        const championLevel = player.level;
  
        const foundChampion = championList.find((champion) => champion.name === championName);
        const championId = foundChampion ? foundChampion.id : -1;
  
        if (championElement) {
          championElement.src = `${cDragonUrl}/champion-icons/${championId}.png`;
          championElement.style.backgroundColor = "hsla(51, 100%, 50%, 100%)";
        }
        if (championLevelElement) {
          championLevelElement.innerText = championLevel;
          championLevelElement.style.backgroundColor = "black";
        }
  
        // Update KDA information
        const kdaElement = document.querySelector(`#kda-${i}`);
        if (kdaElement) {
          const { kills, deaths, assists } = player.scores;
          kdaElement.innerText = `${kills} / ${deaths} / ${assists}`;
        }
  
        // Update item information
        const items = player.items;
        items.forEach((item, index) => {
          if (index >= 6) return; // Skip trinkets
          const itemElement = document.querySelector(`#items-${i}-${index}`);
          if (itemElement) {
            const foundItem = itemList.find((itm) => itm.id === item.itemID);
            const itemIcon = foundItem ? foundItem.iconPath.split("/").pop().toLowerCase() : "gp_ui_placeholder.png";
            itemElement.src = `${imageAssets}/${itemIcon}`;
          }
        });
  
        // Clear any remaining item slots
        for (let j = items.length; j < 6; j++) {
          const itemElement = document.querySelector(`#items-${i}-${j}`);
          if (itemElement) itemElement.src = ""; // Clear the src attribute
        }
      });
  
      // Make the teams section visible
      teams.style.visibility = "visible";
  
      // Schedule the next update
      interval = setTimeout(getInternalGameData, 6000);
      
    } catch (error) {
      clearTimeout(interval);
      if (!isEditor) console.error("Error fetching or updating data:", error);
      teams.style.visibility = "hidden";
      waiting.innerText = "Waiting game...";
  
      // Clear any residual DOM elements
      document.querySelectorAll(".champion-tile").forEach((el) => (el.src = ""));
      document.querySelectorAll(".kda").forEach((el) => (el.innerText = ""));
      document.querySelectorAll(".item-unit").forEach((el) => (el.src = ""));
  
      // Retry after a delay
      setTimeout(getInternalGameData, 5000);
    }
  }  

  
  // Get Game results from API
  async function getGameResults() {
    try {
      const activeGame = await getActiveGame();
      
      if (!("inGame" in activeGame)) return; // In case of error, return;
      
      if(activeGame.inGame == true) {
        replayId = activeGame.currentGame.replayId;      
        if(fieldData.enablePrediction == "true" && predictionCreated == false) await createPrediction();
        
      } else {      
        if(fieldData.enablePrediction == "true" && replayId == activeGame.previousGame.replayId) {
          activeGame.previousGame.result == "remake" ? await cancelPrediction() : await closePrediction(activeGame.previousGame.result);
          predictionCreated = false;
          replayId = "";
        }
      }
    } catch (error) {
      console.error("getGameResults():", error);
      
    } finally {
      setTimeout(() => { getGameResults() }, 1000 * 40); // 40 seconds
    }
  }
  
  
  // Get active game
  async function getActiveGame() {
    try {      
      const options = new URLSearchParams({
        player: fieldData.playerName,
        tag: fieldData.tagLine,
        region: fieldData.region,
        type: "json"
      });
      
      const request = await fetch(`${activeGameUrl}?${options}`);
      const response = await request.json();
      if(response.error) throw response.error;
      
      console.log("activeGame", response);
      
      return response;
      
    } catch (error) {
      console.error("getActiveGame():", error);
      throw "Failed to check Active Game";
    }
  }
  
  
  // Create prediction. Returns "true" or "false"
  async function createPrediction(){  
    console.log("Creating prediction...");
    const options = new URLSearchParams({
      channel: channel,
      time: fieldData.submissionTime,      
      option1: fieldData.winnerOption,
      option2: fieldData.loserOption,
      question: fieldData.predictionQuestion,
    });
    
    const request = await fetch(`${predictionUrl}/create/${fieldData.twitchCode}?${options}`);
    const response = await request.text();
    predictionCreated = true;    
    return response.status == "success" ? true : false;  
  }  
  
  
  // Close prediction. Returns "true" or "false"
  async function closePrediction(result) {
    console.log("Closing prediction...");
    const options = new URLSearchParams({
      channel: channel,
      winner: result == "win" ? fieldData.winnerOption : fieldData.loserOption
    });
    
    const request = await fetch(`${predictionUrl}/close/${fieldData.twitchCode}?${options}`);
    const response = await request.text();    
    return response.status == "success" ? true : false;
  }
  
  
  // Cancel prediction. Returns "true" or "false"
  async function cancelPrediction(result) {    
    console.log("Cancelling prediction...");
    const options = new URLSearchParams({
      channel: channel
    });
    
    const request = await fetch(`${predictionUrl}/cancel/${fieldData.twitchCode}?${options}`);
    const response = await request.text();    
    return response.status == "success" ? true : false;
  }
});
