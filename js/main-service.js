'use strict'
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const MEMES_STORAGE_KEY = 'user-memes'

let gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'YOUR FUNNY TEXT',
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: null, y: null },
        },
        {
            txt: 'YOUR FUNNY TEXT',
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: null, y: null },
        }
    ]
}
let gSavedMemes = (loadFromStorage(MEMES_STORAGE_KEY)) ? loadFromStorage(MEMES_STORAGE_KEY) : []
let gImgs = [
    { id: 1, url: 'memes-imgs/1.jpg', keyWords: ['politics', 'funny'] },
    { id: 2, url: 'memes-imgs/2.jpg', keyWords: ['puppy', 'animal', 'dog', 'cute'] },
    { id: 3, url: 'memes-imgs/3.jpg', keyWords: ['cute', 'puppy', 'baby', 'dog'] },
    { id: 4, url: 'memes-imgs/4.jpg', keyWords: ['animal', 'cat'] },
    { id: 5, url: 'memes-imgs/5.jpg', keyWords: ['baby', 'funny'] },
    { id: 6, url: 'memes-imgs/6.jpg', keyWords: ['aliens', 'television'] },
    { id: 7, url: 'memes-imgs/7.jpg', keyWords: ['baby', 'funny'] },
    { id: 8, url: 'memes-imgs/8.jpg', keyWords: ['television'] },
    { id: 9, url: 'memes-imgs/9.jpg', keyWords: ['funny', 'baby'] },
    { id: 10, url: 'memes-imgs/10.jpg', keyWords: ['politics'] },
    { id: 11, url: 'memes-imgs/11.jpg', keyWords: ['funny', 'wrestling'] },
    { id: 12, url: 'memes-imgs/12.jpg', keyWords: ['ma atem ha`yitem osim'] },
    { id: 13, url: 'memes-imgs/13.jpg', keyWords: ['television'] },
    { id: 14, url: 'memes-imgs/14.jpg', keyWords: ['television'] },
    { id: 15, url: 'memes-imgs/15.jpg', keyWords: ['television'] },
    { id: 16, url: 'memes-imgs/16.jpg', keyWords: ['funny', 'television'] },
    { id: 17, url: 'memes-imgs/17.jpg', keyWords: ['politics'] },
    { id: 18, url: 'memes-imgs/18.jpg', keyWords: ['cartoon', 'television'] }
]
let gFilterBy = { searchWords: '' }

let gTxtOptions = [
    'They turned us into an old meme',
    'My lower back is killing me',
    'Le me Coding',
    'Paid money to suffer daily',
    'Everybody Likes it',
    'Makes old meme',
    'Types with One Finger',
    'Feeling Flexible?',
    'I see You are very flexible today',
    'Im on a seafood diet',
    'I see food and i eat it',
    'I am a meme',
    'When you find out',
    'You have no money',
    'That moment',
    'Well There`s your problem',
]

function getImgsForDisplay() {
    const { searchWords } = gFilterBy
    // console.log(searchWords)
    if (!searchWords) return gImgs
    const imgs = gImgs.filter(img => img.keyWords.includes(searchWords))
    console.log(imgs)
    return imgs
}
function getSavedMemesForDisplay() {
    return gSavedMemes
}
function setImg(imgId) {
    gMeme.selectedImgId = imgId
    setEditor()
    renderMeme(gMeme)
}
function getMeme() {
    return gMeme
}
function setMeme(meme){
    return gMeme = meme
}
function addNewTextLine() {
    const elInput = document.querySelector('input[name="new-line-txt"')
    elInput.value = ''
    const newLine = {
        txt: ' ',
        size: 50,
        align: 'center',
        color: 'white',
        font: 'impact',
        pos: { x: null, y: null },
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme(gMeme)
}
function setTxtToLine(txtValue) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txtValue
    renderMeme(gMeme)
}
function updateTxtLinePos(x, y, idx) {
    gMeme.lines[idx].pos.x = x
    gMeme.lines[idx].pos.y = y
}
function updateTxtLineWidth(idx, txtWidth) {
    gMeme.lines[idx].width = txtWidth
}
function changeColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].color = color
    renderMeme(gMeme)
}
function increaseFont() {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].size += 1
    renderMeme(gMeme)
}
function decreaseFont() {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].size -= 1
    renderMeme(gMeme)
}
function setRandomMeme() {
    const randomImgId = getRandomImgURL()
    const topRandomTxt = getRandomTxt()
    const bottomRandomTxt = getRandomTxt()
    if (topRandomTxt === bottomRandomTxt) setRandomMeme()
    gMeme.selectedImgId = randomImgId
    gMeme.lines[0].txt = topRandomTxt
    gMeme.lines[1].txt = bottomRandomTxt
    setEditor()
    renderMeme(gMeme)
}
function setFilter(filterBy) {
    gFilterBy.searchWords = filterBy
    console.log(gFilterBy)
}

function getRandomImgURL() {
    const randomIdx = getRandomIntInclusive(0, gImgs.length - 1)
    return gImgs[randomIdx].id
}
function getRandomTxt() {
    const randomIdx = getRandomIntInclusive(0, gTxtOptions.length - 1)
    return gTxtOptions[randomIdx]
}
function toggleLines() {

    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    renderMeme(gMeme)

    const elFont = document.querySelector('.font')
    elFont.value = gMeme.lines[gMeme.selectedLineIdx].font
    const elInput = document.querySelector('input[name="new-line-txt"')
    elInput.value = ''
}
function deleteLine() {
    const elInput = document.querySelector('input[name="new-line-txt"')
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    renderMeme(gMeme)
    elInput.value = ''
}
function changeFont(elFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = elFont.value
    renderMeme(gMeme)
    elFont.value = gMeme.lines[gMeme.selectedLineIdx].font
}
function saveMeme(canvas) {
    const canvasData = canvas.toDataURL()
    const meme = {
        url: canvasData,
        meme: gMeme
    }
    gSavedMemes.push(meme)
    saveToStorage(MEMES_STORAGE_KEY, gSavedMemes)
    renderSavedMemes(getSavedMemesForDisplay())
    setSavedMemes()
}
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
function setEditor() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.style.display = 'none'
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'flex'
}
function setGallery() {
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'none'
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.style.display = 'none'
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'block'
}
function setSavedMemes() {
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'none'
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.style.display = 'block'
}
/*
to save canvas i need:
to save to local storage
*/