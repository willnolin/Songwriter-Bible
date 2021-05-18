//=============GLOBAL VARIABLES ====================//
const BASE_URL = "http://www.songsterr.com/a/ra/songs.json?pattern="

const artist = document.querySelector('#artist') //<----artist input
const artistSearchBtn = document.querySelector('#artist_button') // <----artist search button

// const chord = document.querySelector('#chord') // <-----chord input
const chordSearchBtn = document.querySelector('#chord_button')//<----chord search button
const chordDiv = document.createElement('div') // <------chord div containing iframe

chordDiv.classList.add('chord-div')

const wordInput = document.querySelector('#rhyme') // <-----word to rhyme input
const rhymeSearchBtn = document.querySelector('#rhyme_button')//<----rhyme search button
// const rhymesDiv = document.createElement('div')   // <------div containing rhymes
// const brainURLTag = document.createElement('a')
// p tag for lyrics
const lyricsPTag = document.createElement('p') // <----need to style, make space between lines consistent


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

// ====================== Event Listeners for buttons ======================//
// ===MODAL FUNCTIONALITY===//

// When the user clicks the button, open the modal, fill MODAL with content
artistSearchBtn.addEventListener('click', () => {
  clearAll()
  getArtistSongs()
  modal.style.display = "block"
})

chordSearchBtn.addEventListener('click', () => {
  clearAll()
  
  // getUberChord()

  displayChords()
  modal.style.display = "block"
})

rhymeSearchBtn.addEventListener('click', () => {
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
    // console.log(data)
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

    //const song_url = (`http://www.songsterr.com/a/wa/song?id=${song.id}`)
    const songTitleTag = document.createElement('li')

    songTitleTag.textContent = song.title

    //add event listener for each link
    songTitleTag.addEventListener('click', function () {

      removeSongs()
      getLyrics(song.title)

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
const getLyrics = async (song) => {
  try {
    // const url = ("https://api.lyrics.ovh/v1/queen/bohemian rhapsody")
    const lyric_url = (`https://api.lyrics.ovh/v1/${artist.value}/${song}`) // <--figure out value
    // const url = (`https://api.lyrics.ovh/v1/${artist}`)
    const res = await axios.get(lyric_url, { timeout: 20000 })
    const obj = res.data
    console.log(obj)
    const lyrics = res.data.lyrics
 
    displayLyrics(lyrics)
    
  } catch (error) {
    console.error(error)
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

  // const chordTag = document.querySelector('ins')
  console.log(chordTag)
  chordTag.setAttribute('chord', chord.value)
 
  await scales_chords_api_onload()

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

    const rhyme_url = (`https://rhymebrain.com/talk?function=getRhymes&word=${wordInput.value}&maxResults=30`)
    const res = await axios.get(rhyme_url)
    const data = res.data
    console.log(data)
    displayRhymes(data)

  } catch (error) {
    console.error(error)

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
  while (modalInnerDiv.lastChild) {
    modalInnerDiv.removeChild(modalInnerDiv.lastChild)
  }
}