# Songwriter-Bible
A tool to help write a song.


## Project Description

This app will aid in the songwriting process.  User will be able to write in a text area and save progress in the browser.  Other features will include the ability to look up a specific artist's song lyrics for inspiration, a chord diagram search, links to tabs if available and a rhyming dictionary.  

## API and Data Sample

Songsterr API returns data array on a specific pattern (name) with a specified parameter.  In this case, an artist. Request returns an array of songs.  

ie. http://www.songsterr.com/a/ra/songs.json?pattern=Radiohead

```{
        "id": 97,
        "type": "Song",
        "title": "Creep",
        "artist": {
            "id": 48,
            "type": "Artist",
            "nameWithoutThePrefix": "Radiohead",
            "useThePrefix": false,
            "name": "Radiohead"
        },
        "chordsPresent": true,
        "tabTypes": [
            "PLAYER",
            "TEXT_GUITAR_TAB",
            "CHORDS",
            "TEXT_BASS_TAB"
        ]
    },
    {
        "id": 16501,
        "type": "Song",
        "title": "Paranoid Android",
        "artist": {
            "id": 48,
            "type": "Artist",
            "nameWithoutThePrefix": "Radiohead",
            "useThePrefix": false,
            "name": "Radiohead"
        },
        "chordsPresent": true,
        "tabTypes": [
            "PLAYER",
            "TEXT_GUITAR_TAB",
            "CHORDS",
            "TEXT_BASS_TAB"
        ]
    },
    {
        "id": 436709,
        "type": "Song",
        "title": "My Iron Lun",
        "artist": {
            "id": 48,
            "type": "Artist",
            "nameWithoutThePrefix": "Radiohead",
            "useThePrefix": false,
            "name": "Radiohead"
        },
        "chordsPresent": false,
        "tabTypes": [
            "PLAYER"
        ]
    },
 ```
I will also be using a simple lyrics API called Lyrics.ovh.  The song title and artist name are easily incorporated into the request URL. Spaces are accounted for and url is created from data in Songster API request.

ie. https://api.lyrics.ovh/v1/Queen/We Will Rock You 

```
{
    "lyrics": "Buddy you're a boy make a big noise\r\nPlayin' in the street gonna be a big man some day\r\nYou got mud on yo' face\r\nYou big disgrace\r\nKickin' your can all over the place\r\nSingin'\n\n\n\nWe will we will rock you\n\nWe will we will rock you\n\n\n\nBuddy you're a young man hard man\n\nShouting in the street gonna take on the world some day\n\nYou got blood on yo' face\n\nYou big disgrace\n\nWavin' your banner all over the place\n\n\n\nWe will we will rock you\n\nSing it\n\nWe will we will rock you\n\n\n\nBuddy you're an old man poor man\n\nPleadin' with your eyes gonna make\n\nYou some peace some day\n\nYou got mud on your face\n\nBig disgrace\n\nSomebody betta put you back into your place\n\n\n\nWe will we will rock you\n\nSing it\n\nWe will we will rock you\n\nEverybody\n\nWe will we will rock you\n\nWe will we will rock you\n\nAlright"

}
```
All other API fucntinoality will be embedded into the website. (RhymeBrain.com, scales-chords.com/api/)

## Wireframes

![alt text](https://res.cloudinary.com/willnolin/image/upload/c_thumb,w_200,g_face/v1621261270/1-Homepage_j2nadf.png "homepage")

![alt text](https://res.cloudinary.com/willnolin/image/upload/c_thumb,w_200,g_face/v1621261270/2-After-Search-Artist_sehkzt.png "after-artist-search")
![alt text](https://res.cloudinary.com/willnolin/image/upload/c_thumb,w_200,g_face/v1621261270/3-After-Song-Click_vb5ndf.png "after-song-click")

![alt-text](https://res.cloudinary.com/willnolin/image/upload/c_thumb,w_200,g_face/v1621261270/4-After-chord-search_qhwfdd.png "after-chord-search")
![alt-text](https://res.cloudinary.com/willnolin/image/upload/c_thumb,w_200,g_face/v1621261270/5-After-Rhyme-lookup_t7na1u.png "after-rhyme-search")

#### MVP 
  * Allow user to write lyrics/chords and save.
  * Allow user to search for Artist
  * Allow user to choose Song
  * Display song lyrics and tab link on the webpage
  * Implement user input search for chord diagram and rhymes
  * Display diagrams and rhymes on the page.
  * Navigation for several pages or sections
  
#### PostMVP  
  * hovering over songs displays availability of lyrics or tabs
  * once song is chosen, display album art and other metadata from that song
  * implement button to play chord sound
  * display tablature on the website
  * allow user to display chord diagrams in song text.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|May 14-16| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|May 17| Project Approval / Core Application Structure (HTML,CSS. js) API calls working properly | Incomplete
|May 18| Pseudocode / actual code / functionality / MVP | Incomplete
|May 19| Style Style Style / Start Post-MVP | Incomplete
|May 20| Post-MVP| Incomplete
|May 21| Presentations | Incomplete

## Priority Matrix
![alt text](https://res.cloudinary.com/willnolin/image/upload/v1621262690/Songwriter-bible-matrix_tlnw2a.png "priority matrix")

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Working with API | H | 3hrs| | |
| Set up localstorage for saving text | H | 3hrs | | |
| Figure out how to display chord diagram | H | 3hrs | | |
| Integrate lyrics API | H | 3hrs| | |
| Display Lyrics on the page| H | 3hrs| |  |
| Integrating user search for lyrics | H | 3hrs| | |
| Integrating user search for chords and rhymes| H | 3hrs| | |
| Style search container with flexbox | H | 3hrs | | |
| Style results containers with flex | H | 3hrs | | |
| Continue styling pages | H | 3hrs | | |
| Add extra data on song page | L | 3hrs | | |
| Display extra data | L | 3hrs | | |
|Stylize extra data | L | 3hrs | | |
| Total | H | 39hrs |  | |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```

```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
