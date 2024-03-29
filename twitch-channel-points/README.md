<h2 id="widget-name" class="widget-name">Twitch Channel Points widget</h2>
<p id="description" class="description">This widget shows information about the Channel Points redemption redeemed by an user.</p>
<p>The focus on this widget is to help developers to create their own widgets as Streamelements does not have native support for that. </p>
<p>The widget connects to Twitch pubsub (via websocket) and the redemptions are selected from event topic <code>community-points-channel-v1.${providerId}</code> (where providerId is the Twitch channel ID). As this information is just raw text, the widget formats that to be easier to work on.</p>
<p>Once a Channel Point is redeemed by an user, you can see it in <code>onEventReceived</code> listener. You can filter it by <code>obj.detail.event.type</code> which is &quot;channelPoints&quot;. It will also show on browser console. </p>
<p><code>obj.detail.event.data</code> shows the basic information of the reward redeemed. You can find more in <code>obj.detail.event.data.raw</code>.</p>
<p>Based on that, you can work the way you want and make your custom widgets based on Channel Points redemptions. The widget does not have anything on FIELDS tab, as it is only a raw version to collect redemptions from chat. </p>
<h2>1-click install:</h2>
<p><a href="https://streamelements.com/dashboard/overlays/share/6485fdee73031689652625b5">https://streamelements.com/dashboard/overlays/share/6485fdee73031689652625b5</a></p>
<h2>Preview and instructions</h2>
<h3>How to use it:</h3>
<p>1 - Add the widget to a overlay you use. It just needs to be added to one overlay.</p>
<p>2 - You don&#39;t need to modify anything in this widget, just keep it in a separated place on the overlay.</p>
<p>3 - Redeem any Custom reward and see the information on the widget and the browser console (devTools - F12). </p>
<p>4 - Develop your own custom widget based on the information received</p>
<p>OBS: The image and text on the widget will not appear on your OBS. It is only seen on Overlay Editor so you can make sure it is working. </p>
<h3>Overlay preview:</h3>
<p><img src="https://raw.githubusercontent.com/c4ldas/streamelements-widgets/main/twitch-channel-points/widget.png" alt="Overlay Preview"></p>
