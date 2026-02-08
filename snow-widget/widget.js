let fieldData;

window.addEventListener("onWidgetLoad", async (obj) => {
  const snowContainer = document.querySelector("#snow-container");
  fieldData = obj.detail.fieldData;

  const snowAmount = fieldData.amount;
  const snowSize = fieldData.size;
  const snowSpeed = fieldData.speed;
  const snowWind = fieldData.wind;
  const startFromTop = fieldData.startFromTop;
  const fade = fieldData.fade;
  const fadeIn = fieldData.fadeIn;
  const fadeOut = fieldData.fadeOut;

  for (let i = 0; i < snowAmount; i++) {
    const snow = document.createElement("div");
    const size = (Math.random() * 2 + 0.5) * snowSize;
    const driftStrength = 100 + snowWind * 100;

    snow.className = "snow";
    snow.style.width = size + "px";
    snow.style.height = size + "px";
    snow.style.left = Math.random() * 100 + "vw";

    // Vertical fall duration based on speed
    snow.style.animationDuration = (Math.random() * 10 + 10) / snowSpeed + "s";

    // Start delay
    snow.style.animationDelay = startFromTop ? Math.random() * 5 + "s" : Math.random() * -10 + "s";

    // Horizontal drift
    snow.style.setProperty("--drift", (Math.random() ** 0.5 * driftStrength * 2 - driftStrength) + "px");

    if (startFromTop) {
    // start off-screen above container
      const startY = -50 - Math.random() * 50; 
      snow.style.top = startY + "px";
      snow.style.setProperty("--startY", "0px"); 

    } else {
      snow.style.top = (-10 - Math.random() * 20) + "px";
      snow.style.setProperty("--startY", "0px");

    }

    if (fade) {
      // Calculate opacity fractions for top and bottom based on slider (1–10)
      const opacityStart = 1 - fadeIn / 5;
      const opacityEnd = 1 - fadeOut / 5;
      snow.style.setProperty("--opacityStart", opacityStart);
      snow.style.setProperty("--opacityMiddle", 1); // fully visible in middle
      snow.style.setProperty("--opacityEnd", opacityEnd);

    } else {
      snow.style.setProperty("--opacityStart", 0.8);
      snow.style.setProperty("--opacityMiddle", 0.8);
      snow.style.setProperty("--opacityEnd", 0.8);
      
    }

    snowContainer.appendChild(snow);
  }
});

window.addEventListener("onEventReceived", async (obj) => {
  // Ignore if not a chat message
  if(obj.detail.listener !== "message") return;

  const data = obj.detail.event.data;
  const enableCommand = fieldData.enableCommand;
  const disableCommand = fieldData.disableCommand;
  const permissionLevel = fieldData.permissionLevel;

  const userState = { 
    "broadcaster": data.nick === data.channel,
    "mod": parseInt(data.tags.mod),
    "vip": (data.tags.badges.indexOf("vip") !== -1),
    "sub": parseInt(data.tags.subscriber)
  }

  const userLevel = 
    userState.broadcaster ? 4 :
    userState.mod ? 3 :
    userState.vip ? 2 :
    userState.sub ? 1 : 0

  // Hide the element
  if ((userLevel >= parseInt(permissionLevel)) && data.text == disableCommand) {
    document.querySelector("#snow-container").style.visibility = "hidden";
  }

  // Unhide the element
  if ((userLevel >= parseInt(permissionLevel)) && data.text == enableCommand) {
    document.querySelector("#snow-container").style.visibility = "visible";
  }
});
