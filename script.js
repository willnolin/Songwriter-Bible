//=============GLOBAL VARIABLES ====================//
//songterr
const BASE_URL = "https://www.songsterr.com/a/ra/songs.json?pattern="
const ARTIST_URL = "https://www.songsterr.com/a/ra/songs/byartists.json?artists="

const artist = document.querySelector('#artist') //<----artist input
const artistForm = document.querySelector('.lyrics-form') // <----artist search button
const chordForm = document.querySelector('.chord-form')//<----chord search button
const chordDiv = document.querySelector('#modal-chord-div') // <------chord div containing diagram

const wordInput = document.querySelector('#rhyme') // <-----word to rhyme input
const rhymeForm = document.querySelector('.rhyme-form')//<----rhyme search button
const lyricsPTag = document.createElement('p.lyrics') // <----need to style, make space between lines consistent

const mainDiv = document.querySelector('#main-content')

const placeholderMessage = `
    WELCOME TO SONGWRITER BIBLE!

  Use this area to jot down
  ideas, copy and paste rhymes,
  chords and inspirational lyrics.
  When searching for a chord
  above, type 'sound' after the
  chord name to listen to the chord.
  Keep clicking 'save' to save
  this most recent note in the
  browser. When you're done,
  copy and paste into your
  text editor, notepad or whetever
  you use to write down song ideas.

      Have Fun! Happy Writing!`

const textArea = document.querySelector('#writing-area')
textArea.setAttribute('placeholder', placeholderMessage)
// Get the modal
const modal = document.querySelector("#myModal");

// get modal div tag within content div   
const modalInnerDiv = document.querySelector("#inside-modal")

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//to display errors
const noResultsPTag = document.createElement('p')

//tag for loading animation
const loader = `<div class="loading"></div>`

// ====================== Event Listeners for Forms ======================//
// ===MODAL FUNCTIONALITY===//

// When the user clicks the button, open the modal, fill MODAL with content
artistForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // removeChords()
  clearAll()
  getArtistSongs()
  modal.style.display = "block"
})

chordForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // removeChords()
  clearAll()
  displayChords()
  modal.style.display = "block"
})

rhymeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // removeChords()
  clearAll()
  getRhymes()
  modal.style.display = "block"
})


// When the user clicks on (x), close the modal, clear inputs
span.onclick = function () {
  modal.style.display = "none";
  artist.value = ""
  chord.value = ""
  wordInput.value = ""
}

// When the user clicks anywhere outside of the modal, close it, clear inputs
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    artist.value = ""
    chord.value = ""
    wordInput.value = ""
  }
}



//=================SONGS========================================//
//API call to songsterr
const getArtistSongs = async () => {
  try {
    const url = (`${BASE_URL}${artist.value}`)
    const res = await axios.get(url)
    const data = res.data

    if (data.length === 0) {   //check if results exist in database
      noResultsPTag.textContent = `Sorry, There are no results for ${artist.value}...`
      modalInnerDiv.append(noResultsPTag)

    } else {    // sort and display songs
      let sortedSongs = sortSongs(data)
      displaySongs(sortedSongs, artist)
    }

  } catch (error) {
    console.error(error)
  }
}

//function to display songs
const displaySongs = (songs, artist) => {

  //declare variables for list and list items
  const songList = document.createElement('ul')

  //loop through songs array forEach song
  songs.forEach(function (song) {

    //get artist name for search
    const artistName = song.artist.name
    const songTitle = song.title
    const songTitleTag = document.createElement('li')

    if (songTitle.includes(artistName) == false && songTitle.includes("-") == false) {
      songTitleTag.textContent = `${artistName}: ${song.title} `

      //add event listener for each link
      songTitleTag.addEventListener('click', function () {

        removeSongs()
        getLyrics(song.title, artistName)

      })
      //append song titles to song list
      songList.append(songTitleTag)

    }

  })
  //append song list to the div after for loop
  modalInnerDiv.appendChild(songList)
}

//sort the song titles in alphabetical order
const sortSongs = (songs) => {
  songs.sort((a, b) => (a.title > b.title) ? 1 : -1)
  return songs
}

//removes song list from Modal

function removeSongs() {
  while (modalInnerDiv.lastChild) {
    modalInnerDiv.removeChild(modalInnerDiv.lastChild)
  }
}


//===================LYRICS===========================//
// //API call
const getLyrics = async (song, artistName) => {

  try {
    // load animation
    modalInnerDiv.innerHTML = loader
    
    //check for AC/DC
    if (artistName.includes("/")) {
      artistName = artistName.replace("/", " ")
      console.log(artistName)
    }

    const lyric_url = (`https://api.lyrics.ovh/v1/${artistName}/${song}`)

    const res = await axios.get(lyric_url, { timeout: 20000 })

    const lyrics = res.data.lyrics

    //remove loader from the Modal
    modalInnerDiv.innerHTML = ""

    displayLyrics(lyrics)

  } catch (error) {
    console.error(error)
    modalInnerDiv.innerHTML = ""
    noResultsPTag.textContent = `We are unable to display these lyric results at this time..They may be unavailable.  Apologies for the inconvenience`
    modalInnerDiv.appendChild(noResultsPTag)
  }
}

//Format and append to DOM
function displayLyrics(lyrics) {

  //add lyrics into div
  lyricsPTag.textContent = `${lyrics}`
  lyricsPTag.style.whiteSpace = 'pre';

  //append lyricsPTag to  Modal
  modalInnerDiv.append(lyricsPTag)
}

//remove lyrics
function removeLyrics() {
  while (modalInnerDiv.lastChild) {
    modalInnerDiv.removeChild(modalInnerDiv.lastChild)
  }
}

// =============== CHORDS =======================//

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

}
// remove chords
function removeChords() {
  while (chordDiv.lastChild) {
    chordDiv.removeChild(chordDiv.lastChild)
  }
}

//=================Rhymes ===========//
const getRhymes = async () => {
  try {
    modalInnerDiv.innerHTML = loader
    const rhyme_url = (`https://rhymebrain.com/talk?function=getRhymes&word=${wordInput.value}&maxResults=30`)
    const res = await axios.get(rhyme_url, { timeout: 10000 })
    const data = res.data
    // console.log(data)

    modalInnerDiv.innerHTML = ""
    displayRhymes(data)

  } catch (error) {
    console.error(error)
    noResultsPTag.textContent = `Sorry, We're having a hard time finding rhymes for ${wordInput.value} right now...`
    modalInnerDiv.append(noResultsPTag)
  }
}
// Display The rhymes in the Modal
const displayRhymes = (words) => {
  const rhymesDiv = document.createElement('div')   // <------div containing rhymes
  // variables for copyright url
  const brainURL = `<a href="https://rhymebrain.com">RhymeBrain.com</a>`
  // brainURLTag.setAttribute('href', brainURL)
  rhymesDiv.append(`Words that rhyme with ${wordInput.value}`)
  //loops through data and display words
  words.forEach(word => {
    const wordItem = document.createElement('h4')
    if (words.indexOf(word) == 20) {
      rhymesDiv.append(`Consider using there near-rhymes or slant-rhymes`)
    }
    wordItem.textContent = word.word

    rhymesDiv.append(wordItem)
  })
  rhymesDiv.insertAdjacentHTML('beforeend', `Rhyme results are provided by ${brainURL} \n`)
  modalInnerDiv.append(rhymesDiv)

}

function removeRhymes() {
  while (modalInnerDiv.lastChild) {
    modalInnerDiv.removeChild(modalInnerDiv.firstChild)
  }
}

//clears all from Modal
function clearAll() {

  modalInnerDiv.innerHTML = ""
  const chordTag = document.querySelector('ins')
  chordTag.innerHTML = ""
}

//------------local storage --------- */

//----check if browser supports localstorage <----- Didn't implement this
function isSupportingStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (ex) {
    return false;
  }
}

// create prompts in div when hovering over buttons SAVE and LOAD (different messages)
const messageArea = document.querySelector('#message-area')

const saveBtn = document.querySelector('.save-button')
const loadBtn = document.querySelector('.load-button')

saveBtn.addEventListener('mouseover', () => {
  messageArea.innerHTML = `Click to save your note in the browser.
  <br>CAUTION: This will overwrite your previous save!`
})

saveBtn.addEventListener('mouseout', () => {
  messageArea.textContent = ""
})

loadBtn.addEventListener('mouseover', () => {
  messageArea.textContent = "Click to load your most recently saved note"
})

loadBtn.addEventListener('mouseout', () => {
  messageArea.textContent = ""
})

function noteSave() {
  if (isSupportingStorage()) {
    var content = document.getElementById("writing-area").value;
    window.localStorage.setItem("content", content);
  }
  else {
    textArea.textContent = "Sorry.  Your browser does not support local storage"   
  }
}
function noteLoad() {
  var content = window.localStorage.getItem("content");
  document.getElementById("writing-area").value = content;
}

