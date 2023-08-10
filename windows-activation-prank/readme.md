# Windows Activation Prank

This widget emulates an activation Windows screen using Twitch Channel Points. The viewer redeems the Custom Redemption and types a message, which will show in the key field of the activation screen. 

After some seconds, there is a chance (set in the fields) to the activation be successful or trigger a Blue Screen of Death (BSoD). 
If successful, the message on bottom right asking to activate the Windows will disappear for some time (also set in the fields).

It is also possible to set to mute the microphone and desktop audio during the BSoD enabling Websockets on OBS.

# 1-click install: 

https://streamelements.com/dashboard/overlays/share/63cd51dcb29bd99ddcea1b50

# Preview and instructions

## How to use it:

The instructions are divided into 3 parts. 
1. [Twitch Configuration](readme.md#twitch-configuration)
   
   Here we will create the Channel Points redemption to users will be able to activate it
   
2. [OBS Configuration (optional)](readme.md#obs-configuration-optional)
   
   In this part, we will configure the OBS Websocket password, so we can mute and unmute the Mic and Desktop Audio.
   
3. [Overlay Configuration](readme.md#overlay-configuration)
   
   Here we add the Redemption info and OBS password.


## Twitch Configuration 

1. Create a Twitch custom redemption in https://dashboard.twitch.tv/viewer-rewards/channel-points/rewards > `Add New Custom Reward`

2. Put a name, description, enable the option `Require Viewer to Enter Text`, set a price and cooldown. Click on `Save`

    * _In the example below (**click to enlarge**), I named it `Windows Activation`, set the cost to 1000 points and a cooldown of 2 hours. You can use the values you want, but take note of the name and the cooldown, as we will need it later_

       [![Twitch Redemption preview](https://i.imgur.com/Jf5Qird.png)](https://github.com/c4ldas/streamelements-widgets/assets/75918726/63e4d02d-c9b1-4f6b-bafb-66715bd4fc33 "Custom reward preview - Click to enlarge")

## OBS Configuration (optional)

 This part is totally optional, but it adds more reality to the blue screen error. Here we are going to configure the connection between the overlay and the OBS to mute/unmute the Microphone and Desktop Audio once the blue screen is activated.

 1. On your OBS, go to `Tools` > `WebSocket Server Settings`.
 2. Select the first option `Enable WebSocket server` and `Enable Authentication`. Click on `Show Connect Info` and copy the `Server Password`. Click `OK`

    ![image](https://github.com/c4ldas/streamelements-widgets/assets/75918726/98c9831a-7da9-46d6-bd3e-ac26f3f3abc6)

## Overlay Configuration

Finally, we are going to setup the overlay.
Open the overlay and you will see the left panel (we call it FIELDS) is divided into 4 parts:
1. Widget Settings
   - **Language**: English and Portuguese are available.
   - **Cooldown (in minutes)**: Here you are going to put the cooldown value when the Redemption was created in [Twitch Configuration](readme.md#twitch-configuration). In the example, I put 2 hours, which means 120 minutes.
   - **Activation Success %**: How much the activation will work with no error. The higher the value, the higher the success. In case you want more chances of having Blue Screen, lower the value
   - **How long in BlueScreen**: Set how many seconds the Blue Screen error will stay on. After that, the widget will enter into cooldown
     
2. OBS Settings
   - **Connect to OBS**: In case you set the password in [OBS Configuration](readme.md#obs-configuration-optional) step, change this to YES. Otherwise, keep it in NO and you can skip this section
   - **OBS Websocket port**: Leave it as 4455, as it is the default one. Only change it in case you have also changed when you activated the OBS Websocket
   - **Microphone name**: Usually it is `Mic/Aux` in your OBS Audio Mixer, unless you have changed it.
   - **Desktop audio name**: Usually it is `Desktop Audio` in your OBS Audio Mixer, unless you have changed it in OBS.
     
      ![image](https://github.com/c4ldas/streamelements-widgets/assets/75918726/801c2f68-ddf3-4f7f-b28d-250ff589a783)

3. Channel Point Settings
   - **Channel Point Name**: The name of the Redemption created on Twitch Redemption page. In the example, it is `Windows Activation`
   - **Channel Point ID**: You can ignore it. It will be filled automatically once you fill the Channel Point Name.
     
4. Fields
   - **Refresh Widget**: Just a button to refresh the widget in case it freezes somehow. Not needed in 99.9% of the time.
     
## Done!

That's it! Add the overlay to your OBS if not done yet. When a viewer from chat redeems the item `Windows Activation`, the popup will appear like the video preview below. 

In case the activation is succeded, it will inform the Windows was activated successfully and the blue screen will not appear. The message "Activate Windows. Go to settings to activate Windows" on bottom right will disappear during the cooldown time.

If the activation fails, the blue screen will take the entire screen on the stream for some seconds, and the message "Activate Windows. Go to settings to activate Windows" on bottom right will disappear during cooldown time.

## Video preview:
https://user-images.githubusercontent.com/75918726/220400561-fd5969cc-2c4a-4bbe-9f00-56413ce23686.mp4

## Overlay preview:
![Overlay Preview](/windows-activation-prank/widget.png)




