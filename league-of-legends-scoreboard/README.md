# League of Legends Scoreboard

This widget shows the scoreboard on top of the screen, so it is easier to the viewers have data of each champion in the game. The following data is available for each champion: 

- Champion image
- Champion level
- Champion KDA
- Champion items

The widget is updated in almost real time, in a few seconds after each event happens.
Unfortunately, the widget installation is not so easy, even because accessing real time data from League of Legends depends on some configuration. But we will go through each part step-by-step here.

# Preview

## Video preview:
[![Youtube video preview](https://i.imgur.com/T5gFXWR.png)](https://www.youtube.com/watch?v=sXA7VEmf1Bk "Streamelements widget - League of Legends Scoreboard")

## Overlay preview:
![Overlay Preview](/league-of-legends-scoreboard/widget.png)


# 1-click install: 

LINK TO BE AVAILABLE SOON

# Instructions

## How to use it:

The instructions are divided into 3 parts. 
1. [Riot Certificate Installation](readme.md#riot-certificate-installation)
   
   Here we will explain how to install the Riot certificate on the computer to be able to retrieve the data from the game
   
2. [OBS Configuration](readme.md#obs-configuration)
   
   In this part, we will show how to configure the OBS shortcut to have access to the requested data
   
3. [Overlay Configuration](readme.md#overlay-configuration)
   
   Here we are going to install the overlay

## Riot Certificate Installation 

1. Download and save the Riot self signed certificate clicking on `root certificate` from Riot Developer page: https://developer.riotgames.com/docs/lol#game-client-api_root-certificatessl-errors
2. TO DO
3. TO DO 

## OBS Configuration

 We will need to configure OBS shortcut to allow receive response from the requests of the internal LOL API. Unfortunately, the LOL internal API has CORS enabled, which disallows requests that doesn't come from the original source (the game itself).
 
 1. Right-click on your OBS shortcut and select `Properties`
 2. At the end of the `Target` box, add a space and type `--disable-web-security`
 3. Click `OK`

## Overlay Configuration

1. TO DO
2. TO DO
3. TODO 
     
## Done!

TO DO





