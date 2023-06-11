## Twitch Channel Points widget

This widget shows information about the Channel Points redemption redeemed by an user.

The focus on this widget is to help developers to create their own widgets as Streamelements does not have support for that. 

The widget connects to Twitch pubsub (via websocket) and the redemptions are selected from event topic `community-points-channel-v1.${providerId}` (where providerId is the Twitch channel ID). As this information is just raw text, the widget formats that to be easier to work on.

Once a Channel Point is redeemed by an user, it will show on browser console the information of the requested item as well as the image and text (if it exists) on HTML.

Based on that, you can work the way you want and make your own personalization. You do not need to change anything other than `rewardRedeemed()` function, where you can choose what you want to do with the redemption (play an alert, create an animation, TTS the message, it is up to you)

The widget does not have anything on FIELDS tab, as it is only a raw version to collect redemptions from chat. 


## 1-click install: 

https://streamelements.com/dashboard/overlays/share/6485fdee73031689652625b5

## Preview and instructions

### How to use it:

1 - Open the widget and personalize the `rewardRedeemed()` function the way you want to meet your needs.

2 - You can also remove the HTML div `text` in case you do not want that (I personally recommend that)

### Overlay preview:
![Overlay Preview](/twitch-channel-points/widget.png)