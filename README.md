# Songwriter-Bible
A tool to help write a song.


## Project Description

This app will aid in the songwriting process.  Use will have the ability to look up a specific artist's song lyrics for inspiration, a chord diagram search and a rhyming dictionary.  Additionally there will br a text area to jot down ideas.

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
All other API functionality will be embedded into the website. (RhymeBrain.com, scales-chords.com/api/)

https://rhymebrain.com/api.html

```html
<form action="javascript:RhymeBrainSubmit()">
    <input type=text id="RhymeBrainInput">
    <input type=submit value="Rhyme">
</form>
<script type="text/javascript">
    var RhymeBrainMaxResults = 50;
</script>
<script type="text/javascript" src="https://rhymebrain.com/external.js"></script>
Rhyme results are provided by <a href="https://rhymebrain.com">RhymeBrain.com</a>

```

https://www.scales-chords.com/api/

```html
<script async type="text/javascript" src="https://www.scales-chords.com/api/scales-chords-api.js"></script>
<!-- chord attribute will be taken from user input  -->
<ins class="scales_chords_api" chord="D#m(maj9)"></ins>
```

## Wireframes

![alt text](https://res.cloudinary.com/willnolin/image/upload/v1621277714/Songwriter_Bible_mc6nwp.png "board")


#### MVP 

  * Allow user to search for Artist
  * Allow user to choose Song
  * Allow user to search for chord diagram and rhyming words.
  * Incorporate modal pop-up for lyrics, chord diagrams and rhymes.
  * Get lyrics from lyrics.ovh API and display.
  * Display diagrams and rhymes on the page by embedding the scripts.
  
    
#### PostMVP  
  * Add prompts that appear when hovering over labels.
  * Add "loading.." notification in Modal when fetching data
  * Allow user to write lyrics/chords and save. 
  * hovering over songs displays availability of tablature.
  * once song is chosen, display album art and other metadata from that song
  * add option to hear chord sound in chord modal
  * display tablature link on the website in songs Modal
  * allow user to display chord diagrams in song text. When they type a chord, the chord diagram displays.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|May 14-16| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|May 17| Project Approval / Core Application Structure (HTML,CSS. js) / API calls working properly | Complete
|May 18| Pseudocode / actual code / functionality / MVP | Complete
|May 19| Style Style Style / Start Post-MVP | Complete
|May 20| Post-MVP| Incomplete
|May 21| Presentations | Incomplete

## Priority Matrix
![alt text](https://res.cloudinary.com/willnolin/image/upload/v1621275730/Songwriter-bible-matrix_plz7ju.png "priority matrix")

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Getting API data from songsterr and from Lyrics.ovh | H | 3hrs| 3hrs| 3hrs|
| Create Artist search funtionality for songs | H | 3hrs | 2hrs | 2hrs|
| Create Search functionality for Chords and rhymes | H | 3hrs | 4hrs | 4hrs |
| Traversing data to display songs on the songs modal | H | 3hrs | 2hrs | 2hrs | 
| Display chord diagram in chord modal | H | 3hrs | 7hrs | 7hrs |
| Add onclick event listener to each song | H | 3hrs | 2.5hrs | 2.5hrs |
| Make API call for lyrics for each song | H | 3hrs| 3 hrs | 3hrs |
| Display Lyrics in lyric modal | H | 3hrs| 2.5hrs | 2.5 hrs |
| Style search container with flexbox | M | 3hrs | 2hrs | 2hrs |
| Style song results modal containers with flex | M | 3hrs | 3hrs | 3hrs |
| Style lyrics results modal | M | 3hrs | 3hrs | 3hrs |
| Style chord results modal | M | 3hrs | 1hr | 1hr |
| Style rhymes results modal | M | 3hrs | 1hr | 1hr |
| Continue styling pages | L | 3hrs | 4hrs | 4hrs |
| Deploy on Github Pages | H | 3hrs | | |
| Total | H | 45hrs |  | |

## Code Snippet
 
This is how I pulled chord diagrams and sounds onto the DOM.  I used an embedded script.  The problem was that the script executes when the page loads.  So when the user tried to search for the chord, the information (and subsequently the generated <img> tag) was never generated.  The solution was to pull out the onload() function in the built in javascript code and execute it after the search button click event.

Additionally I added the option to pull a chord sound from the API.  This is accomplished through a contional that checks for the substring "sound" in the user input.  User is instructed to optionally include this substring when searching. 
```
const displayChords = async () => {

  const chord = document.querySelector('#chord') // <-----chord input
  console.log(typeof chord.value)
  if (chord.value.includes("sound")) { 
    const chordTag = document.querySelector('ins')
    chordTag.setAttribute('chord', chord.value)
    chordTag.setAttribute('output', "sound")
  }
  else {
    const chordTag = document.querySelector('ins')
    chordTag.setAttribute('chord', chord.value)
  }

    await scales_chords_api_onload()

}```

## Change Log
 
 The embedding scripts proved to be challenging and didn't work as expected.  I ended up making an API call to the rhyme API   instead of embedding it.  I manually added headings and link to RhymeBrain.com. 
 
 I learned about keyframes and used them to create a css animation when loading..
 
 I did not end up incorporating tablature links or album art.
 
 
 
 
