<h1 id="widget-name" class="widget-name">League of Legends Scoreboard</h1>
<p id="description" class="description">This widget shows the scoreboard on top of the screen, so it is easier to the viewers have data of each champion in the game. </p>
<p>The following data is available for each champion: </p>
<ul>
<li>Champion image</li>
<li>Champion level</li>
<li>Champion KDA</li>
<li>Champion items</li>
</ul>
<p>The widget also has an option to create and close Twitch predictions. Check the instructions for more information.</p>
<p>The widget is updated in almost real time, in a few seconds after each event happens.
Unfortunately, the widget installation is not so easy, even because accessing real time data from League of Legends depends on some configuration. But we will go through each part step-by-step here.</p>
<p>The font used for KDA and champion level is called <code>Beaufort for LOL</code> and it is the official League of Legends font. You can download at Riot Games Typography website: https://brand.riotgames.com/en-us/league-of-legends/typography/</p>

<h1>Preview</h1>
<h2>Video preview:</h2>
<p><a href="https://www.youtube.com/watch?v=sXA7VEmf1Bk" title="Streamelements widget - League of Legends Scoreboard"><img src="https://i.imgur.com/T5gFXWR.png" alt="Youtube video preview"></a></p>
<h2>Overlay preview:</h2>
<p><img src="https://raw.githubusercontent.com/c4ldas/streamelements-widgets/main/league-of-legends-scoreboard/widget.png" alt="Overlay Preview"></p>

<h1>1-click install:</h1>
<p>https://streamelements.com/dashboard/overlays/share/6685b5e685cc27e0cd243a57</p>

<h1>Instructions</h1>
<h2>How to use it:</h2>
<p>The instructions are divided into 4 parts.</p>
<ol>
<li>
  <p><a href="readme.md#riot-certificate-installation">Riot Certificate Installation</a></p>
  <p>Here we will explain how to install the Riot certificate on the computer to be able to retrieve the data from the game</p>
</li>
<li>
  <p><a href="readme.md#obs-configuration">OBS Configuration</a></p>
  <p>In this part, we will show how to configure the OBS shortcut to have access to the requested data</p>
</li>
<li>
  <p><a href="readme.md#twitch-prediction">Twitch prediction configuration</a></p>
  <p>In case you want, you can configure the widget to open and close Twitch predictions for you automatically. You can skip it if you don't want predictions to be created</p>
</li>
<li>
  <p><a href="readme.md#overlay-configuration">Overlay Configuration</a></p>
  <p>Here we are going to install the overlay</p>
</li>
</ol>
<h2 id="riot-certificate-installation">Riot Certificate Installation</h2>
<ol>
  <li><p>Download and save the Riot self signed certificate clicking on <code>root certificate</code> from Riot Developer page: <a href="https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors">https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors</a></p></li>
  <p><li>Install the certificate using User Certificate or running the command prompt below (replace <code>C:\path_to_cert</code> to the folder where you saved your cert)</p></li>
  <ul><li><p><code>certutil -user -addstore "Root" C:\path_to_cert\riotgames.pem</code></p></li></ul>
  <li><p>Certificate installed! You can now delete the riotgames.pem file you downloaded.</p></li>
</ol>
<h2 id="obs-configuration">OBS Configuration</h2>
<p> We will need to configure OBS shortcut to allow receive response from the requests of the internal LOL API. Unfortunately, the LOL internal API has CORS enabled, which disallows requests that doesn&#39;t come from the original source (the game itself).</p>
<ol>
  <li>Right-click on your OBS shortcut and select <code>Properties</code></li>
  <li>At the end of the <code>Target</code> box, add a space and type <code>--disable-web-security</code></li>
  <li>Click <code>OK</code></li>
  <li>Open OBS using that shortcut</li>
</ol>

<h2 id="twitch-prediction">Twitch Prediction</h2>
<p> To allow the widget to create and close predictions, create a code following the steps below.</p>
<ol>
  <li>Go to https://c4ldas.com.br/api/twitch and link your Twitch account</code></li>
  <li>Once authorized, click on <code>Mostrar code</code> (it means <code>show code</code> in Portuguese) and copy it.</li>
  <li>From the overlay, choose <code>Yes</code> on <code>Configuration > Enable Twitch auto prediction</code>
  <li>Paste the copied code where it says <code>Twitch Code from https://c4ldas.com.br/api/twitch</code></li>
  <li>Click on <code>SAVE</code> button</li>
</ol>

<h2 id="overlay-configuration">Overlay Configuration</h2>
<ol>
<li>The overlay usage is pretty basic, once installed, you will see the same as in Overlay Preview. The left side (called FIELDS) will show some options to personalize the widget.</li>
<li>The FIELDS section is divided by 4 groups: Overlay Test, Configuration and Layout</li>
<ul><li><p>Overlay Test - This group contains the option to use Mock data to test the overlay, it will show some champions with full item list. Disable it when you are satisfied and want to see real data.</p></li></ul>
<ul><li><p>Configuration - This group contains options to enable Twitch auto prediction, set the prediction question (the options will always be <code>Win</code>/<code>Lose</code>). You can also enable or disable the message <code>Waiting game to start...</code> when the game is not running</p></li></ul>
<ul><li><p>Layout - Here you can manually set the position of each team on the screen. You can configure the vertical and horizontal position of each team independently.</p></li></ul>

</ol>
<h2>Done!</h2>
<p>That's it! You can test it in a Training Practice Tool to make sure the values are being updated correctly and the way you wanted. Or you can just start a real game if you are confident! Happy streaming!</p>
