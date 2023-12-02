## Twitch Channel Points widget

This widget shows information about the Channel Points redemption redeemed by an user.

The focus on this widget is to help developers to create their own widgets as Streamelements does not have support for that. 

The widget connects to Twitch pubsub (via websocket) and the redemptions are selected from event topic `community-points-channel-v1.${providerId}` (where providerId is the Twitch channel ID). As this information is just raw text, the widget formats that to be easier to work on.

Once a Channel Point is redeemed by an user, you can see it in `onEventReceived` listener. You can filter it by `obj.detail.event.type` which is "channelPoints". It will also show on browser console. 

`obj.detail.event.data` shows the basic information of the reward redeemed. You can find more in `obj.detail.event.data.raw`.

Based on that, you can work the way you want and make your custom widgets based on Channel Points redemptions. The widget does not have anything on FIELDS tab, as it is only a raw version to collect redemptions from chat. 

## 1-click install: 

https://streamelements.com/dashboard/overlays/share/6485fdee73031689652625b5

## Preview and instructions

### How to use it:

1 - Add the widget to a overlay you use. Just add it to one overlay.

2 - Redeem any Custom reward and see the information on the widget and the browser console. 

3 - Develop your custom widget based on the information received

OBS: The image and text on the widget will not appear on your OBS. It is only seen on Overlay Editor so you can make sure it is working. 

### Overlay preview:
![Overlay Preview](/twitch-channel-points/widget.png)
