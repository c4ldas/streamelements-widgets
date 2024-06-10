<h1 id="widget-name" class="widget-name">League of Legends Scoreboard</h1>
<p id="description" class="description">This widget shows the scoreboard on top of the screen, so it is easier to the viewers have data of each champion in the game. </p>
<p>The following data is available for each champion: </p>
<ul>
<li>Champion image</li>
<li>Champion level</li>
<li>Champion KDA</li>
<li>Champion items</li>
</ul>
<p>The widget is updated in almost real time, in a few seconds after each event happens.
Unfortunately, the widget installation is not so easy, even because accessing real time data from League of Legends depends on some configuration. But we will go through each part step-by-step here.</p>

<h1>Preview</h1>
<h2>Video preview:</h2>
<p><a href="https://www.youtube.com/watch?v=sXA7VEmf1Bk" title="Streamelements widget - League of Legends Scoreboard"><img src="https://i.imgur.com/T5gFXWR.png" alt="Youtube video preview"></a></p>
<h2>Overlay preview:</h2>
<p><img src="https://raw.githubusercontent.com/c4ldas/streamelements-widgets/main/league-of-legends-scoreboard/widget.png" alt="Overlay Preview"></p>

<h1>1-click install:</h1>
<p>LINK TO BE AVAILABLE SOON</p>

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
<li>Download and save the Riot self signed certificate clicking on <code>root certificate</code> from Riot Developer page: <a href="https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors">https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors</a></li>
<li>TO DO</li>
<li>TO DO</li>
</ol>
<h2>OBS Configuration</h2>
<p> We will need to configure OBS shortcut to allow receive response from the requests of the internal LOL API. Unfortunately, the LOL internal API has CORS enabled, which disallows requests that doesn&#39;t come from the original source (the game itself).</p>
<ol>
<li>Right-click on your OBS shortcut and select <code>Properties</code></li>
<li>At the end of the <code>Target</code> box, add a space and type <code>--disable-web-security</code></li>
<li>Click <code>OK</code></li>
</ol>
<h2>Overlay Configuration</h2>
<ol>
<li>TO DO</li>
<li>TO DO</li>
<li>TODO</li>
</ol>
<h2>Done!</h2>
<p>TO DO</p>
