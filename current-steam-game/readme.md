<h2>Current Steam Game</h2>
<p>OBS: This widget was originally created by NooodyFR (<a href="https://github.com/NooodyFR">https://github.com/NooodyFR</a>), but as I am hosting the backend, I am adding it to here as well. </p>
<p>This widget shows the game you are currently playing on Steam. It shows the game name, price, hours played and the game image as a background</p>
<h2>1-click install:</h2>
<p>Original link:
<a href="https://strms.net/current_steam_game_by_nooody">https://strms.net/current_steam_game_by_nooody</a></p>
<p>Same widget, but with instructions included:
<a href="https://streamelements.com/dashboard/overlays/share/624e04622e2b5202dbcf8788">https://streamelements.com/dashboard/overlays/share/624e04622e2b5202dbcf8788</a></p>
<h2>Preview and instructions</h2>
<h3>How to use it:</h3>
<p>Original widget description from Streamelements Discord: 
<a href="https://discord.com/channels/141203863863558144/457957557470887947/883359312817299566">https://discord.com/channels/141203863863558144/457957557470887947/883359312817299566</a></p>
<p>1 - Get your Steam ID from Steam application using the steps below</p>
<p>2 - Go to menu Steam &gt; Settings</p>
<p>3 - Click on Account &gt; View Account Details</p>
<p><img src="https://github.com/c4ldas/streamelements-widgets/blob/main/current-steam-game/steam-id-instruction.png" alt="Preview"></p>
<p>4 - Put the Steam ID on the corresponding widget field</p>
<p>5 - Choose your region from the dropdown list</p>
<p>6 - If you change the game, type !refresh on chat to reload the widget</p>
<p>OBS: Your profile needs to be set as Public. Follow the instructions below to check if your profile is public:</p>
<ul>
<li>On Steam, click on your username &gt; <code>Edit my profile</code></li>
<li>Go to <code>Privacy Settings</code> and set <code>My profile</code> to <code>Public</code></li>
</ul>
<h3>Overlay preview:</h3>
<p><img src="https://github.com/c4ldas/streamelements-widgets/blob/main/current-steam-game/widget.png" alt="Overlay Preview"></p>
<h2>Advanced instructions (optional)</h2>
<p>These instructions are only valid in case you also want to host the backend on your own server, which is not necessary. I am adding this information because we never know when the server can go down</p>
<p>You will need a Nodejs server (currently running v16.15.0) and the Steam API key</p>
<p>Get your Steam API key here: <a href="https://steamcommunity.com/dev/apikey">https://steamcommunity.com/dev/apikey</a></p>
<p>First you will need to change the line <code>8</code> of the <code>widget.js</code> from the overlay to match your server domain</p>
<pre><code class="language-js">const dataFetch = await fetch(`https://repl.c4ldas.com.br/api/steam/game/?id=${mySteamId}&amp;region=${myRegion}`)
</code></pre>
<p>You need a Nodejs server running on your system. <code>Axios</code> (version 0.27.2) and <code>Express</code> (version 4.18.1) libraries are used, which can be installed using <code>npm install axios express</code>. </p>
<p>On the server, copy the <code>server.js</code> content.</p>
<p>Set the Steam key as a environment variable called STEAM_KEY</p>
<p>Start the application</p>
