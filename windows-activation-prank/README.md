<h1 id="widget-name" class="widget-name">Windows Activation Prank</h1>
<p id="description" class="description">This widget emulates an activation Windows screen using Twitch Channel Points. The viewer redeems the Custom Redemption and types a message, which will show in the key field of the activation screen. </p>
<p>After some seconds, there is a chance (set in the fields) to the activation be successful or trigger a Blue Screen of Death (BSoD). 
If successful, the message on bottom right asking to activate the Windows will disappear for some time (also set in the fields).</p>
<p>It is also possible to set to mute the microphone and desktop audio during the BSoD enabling Websockets on OBS.</p>
<h1>1-click install:</h1>
<p><a href="https://streamelements.com/dashboard/overlays/share/63cd51dcb29bd99ddcea1b50">https://streamelements.com/dashboard/overlays/share/63cd51dcb29bd99ddcea1b50</a></p>
<h1>Preview and instructions</h1>
<h2>How to use it:</h2>
<p>The instructions are divided into 3 parts. </p>
<ol>
<li><p><a href="readme.md#twitch-configuration">Twitch Configuration</a></p>
<p>Here we will create the Channel Points redemption to users will be able to activate it</p>
</li>
<li><p><a href="readme.md#obs-configuration-optional">OBS Configuration (optional)</a></p>
<p>In this part, we will configure the OBS Websocket password, so we can mute and unmute the Mic and Desktop Audio.</p>
</li>
<li><p><a href="readme.md#overlay-configuration">Overlay Configuration</a></p>
<p>Here we add the Redemption info and OBS password.</p>
</li>
</ol>
<h2>Twitch Configuration</h2>
<ol>
<li><p>Create a Twitch custom redemption in <a href="https://dashboard.twitch.tv/viewer-rewards/channel-points/rewards">https://dashboard.twitch.tv/viewer-rewards/channel-points/rewards</a> &gt; <code>Add New Custom Reward</code></p>
</li>
<li><p>Put a name, description, enable the option <code>Require Viewer to Enter Text</code>, set a price and cooldown. Click on <code>Save</code></p>
<ul>
<li><p><em>In the example below (<strong>click to enlarge</strong>), I named it <code>Windows Activation</code>, set the cost to 1000 points and a cooldown of 2 hours. You can use the values you want, but take note of the name and the cooldown, as we will need it later</em></p>
<p> <a href="https://github.com/c4ldas/streamelements-widgets/assets/75918726/63e4d02d-c9b1-4f6b-bafb-66715bd4fc33" title="Custom reward preview - Click to enlarge"><img src="https://i.imgur.com/Jf5Qird.png" alt="Twitch Redemption preview"></a></p>
</li>
</ul>
</li>
</ol>
<h2>OBS Configuration (optional)</h2>
<p> This part is totally optional, but it adds more reality to the blue screen error. Here we are going to configure the connection between the overlay and the OBS to mute/unmute the Microphone and Desktop Audio once the blue screen is activated.</p>
<ol>
<li><p>On your OBS, go to <code>Tools</code> &gt; <code>WebSocket Server Settings</code>.</p>
</li>
<li><p>Select the first option <code>Enable WebSocket server</code> and <code>Enable Authentication</code>. Click on <code>Show Connect Info</code> and copy the <code>Server Password</code>. Click <code>OK</code></p>
<p><img src="https://github.com/c4ldas/streamelements-widgets/assets/75918726/98c9831a-7da9-46d6-bd3e-ac26f3f3abc6" alt="image"></p>
</li>
</ol>
<h2>Overlay Configuration</h2>
<p>Finally, we are going to setup the overlay.
Open the overlay and you will see the left panel (we call it FIELDS) is divided into 4 parts:</p>
<ol>
<li><p>Widget Settings</p>
<ul>
<li><strong>Language</strong>: English and Portuguese are available.</li>
<li><strong>Cooldown (in minutes)</strong>: Here you are going to put the cooldown value when the Redemption was created in <a href="readme.md#twitch-configuration">Twitch Configuration</a>. In the example, I put 2 hours, which means 120 minutes.</li>
<li><strong>Activation Success %</strong>: How much the activation will work with no error. The higher the value, the higher the success. In case you want more chances of having Blue Screen, lower the value</li>
<li><strong>How long in BlueScreen</strong>: Set how many seconds the Blue Screen error will stay on. After that, the widget will enter into cooldown</li>
</ul>
</li>
<li><p>OBS Settings</p>
<ul>
<li><p><strong>Connect to OBS</strong>: In case you set the password in <a href="readme.md#obs-configuration-optional">OBS Configuration</a> step, change this to YES. Otherwise, keep it in NO and you can skip this section</p>
</li>
<li><p><strong>OBS Websocket port</strong>: Leave it as 4455, as it is the default one. Only change it in case you have also changed when you activated the OBS Websocket</p>
</li>
<li><p><strong>Microphone name</strong>: Usually it is <code>Mic/Aux</code> in your OBS Audio Mixer, unless you have changed it.</p>
</li>
<li><p><strong>Desktop audio name</strong>: Usually it is <code>Desktop Audio</code> in your OBS Audio Mixer, unless you have changed it in OBS.</p>
<p> <img src="https://github.com/c4ldas/streamelements-widgets/assets/75918726/801c2f68-ddf3-4f7f-b28d-250ff589a783" alt="image"></p>
</li>
</ul>
</li>
<li><p>Channel Point Settings</p>
<ul>
<li><strong>Channel Point Name</strong>: The name of the Redemption created on Twitch Redemption page. In the example, it is <code>Windows Activation</code></li>
<li><strong>Channel Point ID</strong>: You can ignore it. It will be filled automatically once you fill the Channel Point Name.</li>
</ul>
</li>
<li><p>Fields</p>
<ul>
<li><strong>Refresh Widget</strong>: Just a button to refresh the widget in case it freezes somehow. Not needed in 99.9% of the time.</li>
</ul>
</li>
</ol>
<h2>Done!</h2>
<p>That&#39;s it! Add the overlay to your OBS if not done yet. When a viewer from chat redeems the item <code>Windows Activation</code>, the popup will appear like the video preview below. </p>
<p>In case the activation is succeded, it will inform the Windows was activated successfully and the blue screen will not appear. The message &quot;Activate Windows. Go to settings to activate Windows&quot; on bottom right will disappear during the cooldown time.</p>
<p>If the activation fails, the blue screen will take the entire screen on the stream for some seconds, and the message &quot;Activate Windows. Go to settings to activate Windows&quot; on bottom right will disappear during cooldown time.</p>
<h2>Video preview:</h2>
<p><a href="https://user-images.githubusercontent.com/75918726/220400561-fd5969cc-2c4a-4bbe-9f00-56413ce23686.mp4">https://user-images.githubusercontent.com/75918726/220400561-fd5969cc-2c4a-4bbe-9f00-56413ce23686.mp4</a></p>
<h2>Overlay preview:</h2>
<p><img src="https://raw.githubusercontent.com/c4ldas/streamelements-widgets/main/windows-activation-prank/widget.png" alt="Overlay Preview"></p>
