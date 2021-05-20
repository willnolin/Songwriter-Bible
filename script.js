//=============GLOBAL VARIABLES ====================//
const BASE_URL = "http://www.songsterr.com/a/ra/songs.json?pattern="

const artist = document.querySelector('#artist') //<----artist input
const artistForm = document.querySelector('.lyrics-form') // <----artist search button

// const chord = document.querySelector('#chord') // <-----chord input
const chordForm = document.querySelector('.chord-form')//<----chord search button
const chordDiv = document.querySelector('#modal-chord-div') // <------chord div containing iframe

// chordDiv.classList.add('chord-div')

const wordInput = document.querySelector('#rhyme') // <-----word to rhyme input
const rhymeForm = document.querySelector('.rhyme-form')//<----rhyme search button
// const rhymesDiv = document.createElement('div')   // <------div containing rhymes
// const brainURLTag = document.createElement('a')
// p tag for lyrics
const lyricsPTag = document.createElement('p.lyrics') // <----need to style, make space between lines consistent
// lyricsPTag.classList.add('lyrics')

const mainDiv = document.querySelector('#main-content')
//ins tag for chord diagram
// const chordTag = document.createElement('ins') // <------insert tag chord diagram
// const chordTag = document.querySelector('ins')

// Get the modal
const modal = document.querySelector("#myModal");

// get modal div tag within content div    !!!This is where you'll change text content, add images, whatever
const modalInnerDiv = document.querySelector("#inside-modal")

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const noResultsPTag = document.createElement('p')

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
    const songTitleTag = document.createElement('li')
    console.log(artistName)
    songTitleTag.textContent = song.title

    //add event listener for each link
    songTitleTag.addEventListener('click', function () {

      removeSongs()
      getLyrics(song.title, artistName)

    })
    //append song titles to song list
    songList.append(songTitleTag)
    //add songList as value inside text area
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
    // console.log(loader)
    modalInnerDiv.innerHTML = loader
  
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
  // const chordDiv = document.querySelector('#modal-chord-div') // <------chord div containing
  console.log(chordDiv)
  // chordDiv.classList.add('chord-div')
  
  const chord = document.querySelector('#chord') // <-----chord input

  const chordTag = document.querySelector('ins')
  
  chordTag.setAttribute('chord', chord.value)
  
  await scales_chords_api_onload()
  

}

function removeChords() {
  while (chordDiv.lastChild) {
    chordDiv.removeChild(chordDiv.lastChild)
  }
}

//===============Uber Chords ================//
// const getUberChord = async () => {
  
//   const chordFrame = document.createElement('IFRAME')
  
//   try {
//     // get the data from API
//     const url = `https://api.uberchord.com/v1/embed/chords/${chord.value}#autosize`
//     const res = await axios.get(url)
//     //put HTML in srcdoc attribute of iframe
//     chordFrame.setAttribute('srcdoc', res.data)
//     //append to Modal
//     modalInnerDiv.append(chordFrame)
//   } catch (error) {
//     console.error(error)
//   }
// }

// const displayUberChord = () => {
//   const chord_url = `https://api.uberchord.com/v1/chords/${chord.value}`

//   console.log(chord_url)


// }

//=================Rhymes ===========//
const getRhymes = async () => {
  try {
    modalInnerDiv.innerHTML = loader
    const rhyme_url = (`https://rhymebrain.com/talk?function=getRhymes&word=${wordInput.value}&maxResults=30`)
    const res = await axios.get(rhyme_url, {timeout:10000})
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
  // while (modalInnerDiv.lastChild) {
    // modalInnerDiv.removeChild(modalInnerDiv.lastChild)
  // }
  modalInnerDiv.innerHTML = ""

  const chordTag = document.querySelector('ins')
  chordTag.innerHTML = ""
}

//------------local storage --------- */

//----check if browser supports localstorage 
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

function mySave() {
  var myContent = document.getElementById("writing-area").value;
  window.localStorage.setItem("myContent", myContent);
}
function myLoad() {
  var myContent = window.localStorage.getItem("myContent");
  document.getElementById("writing-area").value = myContent;
}

