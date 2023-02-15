'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 1,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'black',
            pos: { x: null, y: null }
        }
    ]
}

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['donald', 'trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['puppy', 'dog'] },
    { id: 5, url: 'img/5.jpg', keywords: ['puppy', 'dog'] },
    { id: 6, url: 'img/6.jpg', keywords: ['puppy', 'dog'] },
    { id: 7, url: 'img/7.jpg', keywords: ['puppy', 'dog'] },
    { id: 8, url: 'img/8.jpg', keywords: ['puppy', 'dog'] },
    { id: 9, url: 'img/9.jpg', keywords: ['puppy', 'dog'] },
    { id: 10, url: 'img/10.jpg', keywords: ['puppy', 'dog'] },
    { id: 11, url: 'img/11.jpg', keywords: ['puppy', 'dog'] },
    { id: 12, url: 'img/12.jpg', keywords: ['puppy', 'dog'] },
    { id: 13, url: 'img/13.jpg', keywords: ['puppy', 'dog'] },
    { id: 14, url: 'img/14.jpg', keywords: ['puppy', 'dog'] },
    { id: 15, url: 'img/15.jpg', keywords: ['puppy', 'dog'] },
    { id: 16, url: 'img/16.jpg', keywords: ['puppy', 'dog'] },
    { id: 17, url: 'img/17.jpg', keywords: ['puppy', 'dog'] },
    { id: 18, url: 'img/18.jpg', keywords: ['puppy', 'dog'] }
]

function getImgsForDisplay() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    setEditor()
    renderMeme(gMeme)
}
function getMeme() {
    return gMeme
}
function setTxtLine(txtValue) {
    // console.log(txtValue)
    // console.log(gMeme)
    const newLine = {
        txt: txtValue,
        size: 20,
        align: 'center',
        color: 'red',
        pos: { x: null, y: null }
    }
    gMeme.lines.push(newLine)
    renderMeme(gMeme)
    // gMeme.lines[gMeme.lines.length - 1].txt = txtValue
}
function updateTxtPos(x, y, idx) {
    // gMeme.lines[idx].pos.x = x
    console.log(gMeme.lines[idx])
    // gMeme.lines[idx].pos.y = y

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

function setEditor() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'block'
}
function setGallery() {
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'none'
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'block'
}
