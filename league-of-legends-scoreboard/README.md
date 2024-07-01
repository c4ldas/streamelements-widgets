<h1 id="widget-name" class="widget-name">League of Legends Scoreboard</h1>
<p id="description" class="description">This widget shows the scoreboard on top of the screen, so it is easier to the viewers have data of each champion in the game. </p>
<p>The following data is available for each champion: </p>
<ul>
<li>Champion image</li>
<li>Champion level</li>
<li>Champion KDA</li>
<li>Champion items</li>
</ul>
<p>The font used for KDA and champion level is called <code>Beaufort for LOL</code> and it is the official League of Legends font. You can download at Riot Games Typography website: https://brand.riotgames.com/en-us/league-of-legends/typography/</p>
<p>The widget is updated in almost real time, in a few seconds after each event happens.
Unfortunately, the widget installation is not so easy, even because accessing real time data from League of Legends depends on some configuration. But we will go through each part step-by-step here.</p>

<h1>Preview</h1>
<h2>Video preview:</h2>
<p><a href="https://www.youtube.com/watch?v=sXA7VEmf1Bk" title="Streamelements widget - League of Legends Scoreboard"><img src="https://i.imgur.com/T5gFXWR.png" alt="Youtube video preview"></a></p>
<h2>Overlay preview:</h2>
<p><img src="https://raw.githubusercontent.com/c4ldas/streamelements-widgets/main/league-of-legends-scoreboard/widget.png" alt="Overlay Preview"></p>

<h1>1-click install:</h1>
<p>https://streamelements.com/dashboard/overlays/share/6442fd8507855cbfc906e519</p>

<h1>Instructions</h1>
<h2>How to use it:</h2>
<p>The instructions are divided into 3 parts. </p>
<ol>
<li><p><a href="readme.md#riot-certificate-installation">Riot Certificate Installation</a></p>
<p>Here we will explain how to install the Riot certificate on the computer to be able to retrieve the data from the game</p>
</li>
<li><p><a href="readme.md#obs-configuration">OBS Configuration</a></p>
<p>In this part, we will show how to configure the OBS shortcut to have access to the requested data</p>
</li>
<li><p><a href="readme.md#overlay-configuration">Overlay Configuration</a></p>
<p>Here we are going to install the overlay</p>
</li>
</ol>
<h2>Riot Certificate Installation</h2>
<ol>
  <li><p>Download and save the Riot self signed certificate clicking on <code>root certificate</code> from Riot Developer page: <a href="https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors">https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors</a></p></li>
  <p><li>Install the certificate using User Certificate or running the command prompt below (replace <code>C:\path_to_cert</code> to the folder where you saved your cert)</p></li>
  <ul><li><p><code>certutil -user -addstore "Root" C:\path_to_cert\riotgames.pem</code></p></li></ul>
  <li><p>Certificate installed! You can now delete the riotgames.pem file you downloaded.</p></li>
</ol>
<h2>OBS Configuration</h2>
<p> We will need to configure OBS shortcut to allow receive response from the requests of the internal LOL API. Unfortunately, the LOL internal API has CORS enabled, which disallows requests that doesn&#39;t come from the original source (the game itself).</p>
<ol>
  <li>Right-click on your OBS shortcut and select <code>Properties</code></li>
  <li>At the end of the <code>Target</code> box, add a space and type <code>--disable-web-security</code></li>
  <li>Click <code>OK</code></li>
  <li>Open OBS using that shortcut</li>
</ol>
<h2>Overlay Configuration</h2>
<ol>
<li>The overlay usage is pretty basic, once installed, you will see the same as in Overlay Preview. The left side (called FIELDS) will show some options to personalize the widget.</li>
<li>The FIELDS section is divided by 3 groups: Overlay Test, Configuration and Positioning</li>
<ul><li><p>Overlay Test - This group contains the option to use Mock data to test the overlay, it will show some champions with full item list. Disable it when you are satisfied and want to see real data.</p></li></ul>
<ul><li><p>Configuration - This group contains options to organize the layout of the champions and if you want to show the message <code>Waiting game to start...</code> when the game is not running</p></li></ul>
<ul><li><p>Here you can manually set the position of each team on the screen. You can configure the vertical and horizontal position of each team independently.</p></li></ul>

</ol>
<h2>Done!</h2>
<p>That's it! You can start a Training Practice Tool to make sure the values are being updated correctly.</p>
