'use strict'

function onSetSavedMemes(){
 setSavedMemes()
}

function onSaveMeme(){
    saveMeme(gElMemeCanvas)
  }

function renderSavedMemes(savedMemes){
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.innerHTML = ''
    if(!savedMemes)return elSavedMemes.innerHTML = 'Your saved gallery is empty'
    savedMemes.forEach(savedMeme=> elSavedMemes.innerHTML += `<div class = "saved-meme-img"><img onclick="onSetSavedMeme(this)" src = "${savedMeme.url}" /> </div>`
    )
}

function onSetSavedMeme(memeImg){
    const savedMemes = getSavedMemesForDisplay()
    let savedMeme = savedMemes.find(meme => meme.url === memeImg.src)
    renderMeme(savedMeme.meme)
    setEditor()
}