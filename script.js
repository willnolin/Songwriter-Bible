//=============GLOBAL VARIABLES ====================//
const BASE_URL = "http://www.songsterr.com/a/ra/songs.json?pattern="

const artist = document.querySelector('#artist') //<----artist input
const artistSearchBtn = document.querySelector('#artist_button') // <----artist search button

const chord = document.querySelector('#chord') // <-----chord input
const chordSearchBtn = document.querySelector('#chord_button')//<----chord search button

const wordInput = document.querySelector('#rhyme') // <-----word to rhyme input
const rhymeSearchBtn = document.querySelector('#rhyme_button')//<----rhyme search button
const rhymesDiv = document.createElement('div')
// const brainURLTag = document.createElement('a')
// p tag for lyrics
const lyricsPTag = document.createElement('p') // <----need to style, make space between lines consistent

//ins tag for chord diagram
// const chordTag = document.createElement('ins') // <------insert tag chord diagram
const chordTag = document.querySelector('ins')
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
  displayChords()
  modal.style.display = "block"
})

rhymeSearchBtn.addEventListener('click', () => {
  clearAll()
  getRhymes()
  modal.style.display = "block"
})


// When the user clicks on (x), close the modal, clear inputs
span.onclick = function() {
  modal.style.display = "none";
  artist.value = ""
  chord.value = ""
  wordInput.value = ""
}

// When the user clicks anywhere outside of the modal, close it, clear inputs
window.onclick = function(event) {
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
    console.log(data)
    if (data.length === 0 ) {   //check if results exist in database
      modalInnerDiv.textContent = `Sorry, There are no results for ${artist.value}...`
      

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
    const res = await axios.get(lyric_url)
    // console.log(res)
    const lyrics = res.data.lyrics
    
    displayLyrics(lyrics)
    
  } catch (error) {
    
    noResultsPTag.textContent = `Sorry, There are no results for ${song}...`
    modalInnerDiv.append(noResultsPTag)
    console.error(error)
    
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

const displayChords = () => {
  // const chordIns = `
  // <ins class="scales_chords_api" chord="${chord.value}"></ins>
  // `
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src = 'https://www.scales-chords.com/api/scales-chords-api.js';    
  // document.getElementsByTagName('head')[0].appendChild(script);
  
  // chordTag.classList.add('scales_chords_api')
  chordTag.setAttribute('chord', `"${chord.value}"`)
  console.log(chordTag)
  // console.log(chord.value)
  modalInnerDiv.appendChild(chordTag)
  // console.log(modalInnerDiv)
}



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
  rhymesDiv.insertAdjacentHTML('beforeend',`Rhyme results are provided by ${brainURL}`)
  modalInnerDiv.appendChild(rhymesDiv)

}

//removes song list from Modal

function clearAll() {
  while (modalInnerDiv.lastChild) {
    modalInnerDiv.removeChild(modalInnerDiv.lastChild)
  }
}