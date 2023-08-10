## Windows Activation Prank

This widget emulates an activation Windows screen using Twitch Channel Points. The viewer redeems the Custom Redemption and types a message, which will show in the key field of the activation screen. 

After some seconds, there is a chance (set in the fields) to the activation be successful or trigger a Blue Screen of Death (BSoD). 
If successful, the message on bottom right asking to activate the Windows will disappear for some time (also set in the fields).

It is also possible to set to mute the microphone and desktop audio during the BSoD enabling Websockets on OBS.

## 1-click install: 

https://streamelements.com/dashboard/overlays/share/63cd51dcb29bd99ddcea1b50

## Preview and instructions

### How to use it:

The instructions are divided into 3 parts. 
1. [Twitch Configuration](readme.md#twitch-configuration) - Here we will create the Channel Points redemption to users will be able to activate it
2. [OBS Configuration](readme.md#twitch-configuration) - In this part, we will configure the OBS Websocket password, so we can mute and unmute the Mic and Desktop Audio (optional)
3. [Overlay Configuration](readme.md#twitch-configuration) - Here we add the Redemption info and OBS password.


### Twitch Configuration

1. Create a Twitch custom redemption in https://dashboard.twitch.tv/viewer-rewards/channel-points/rewards > `Add New Custom Reward`

2. Put a name, description, enable the option `Require Viewer to Enter Text`, set a price and cooldown. Click on `Save`

    * _In the example below (**click to enlarge**), I named it `Windows Activation`, set the cost to 1000 points and a cooldown of 2 hours. You can use the values you want, but take note of the name and the cooldown, as we will need it later_

       [![Twitch Redemption preview](https://i.imgur.com/Jf5Qird.png)](https://github.com/c4ldas/streamelements-widgets/assets/75918726/63e4d02d-c9b1-4f6b-bafb-66715bd4fc33 "Custom reward preview - Click to enlarge")

### OBS Configuration (optional)

 teste teste


### Overlay Configuration

teste teste

### Video preview:
https://user-images.githubusercontent.com/75918726/220400561-fd5969cc-2c4a-4bbe-9f00-56413ce23686.mp4

### Overlay preview:
![Overlay Preview](/windows-activation-prank/widget.png)




