'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme = {
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

var gImgs = [
    { id: 1, url: 'memes-imgs/1.jpg' },
    { id: 2, url: 'memes-imgs/2.jpg' },
    { id: 3, url: 'memes-imgs/3.jpg' },
    { id: 4, url: 'memes-imgs/4.jpg' },
    { id: 5, url: 'memes-imgs/5.jpg' },
    { id: 6, url: 'memes-imgs/6.jpg' },
    { id: 7, url: 'memes-imgs/7.jpg' },
    { id: 8, url: 'memes-imgs/8.jpg' },
    { id: 9, url: 'memes-imgs/9.jpg' },
    { id: 10, url: 'memes-imgs/10.jpg' },
    { id: 11, url: 'memes-imgs/11.jpg' },
    { id: 12, url: 'memes-imgs/12.jpg' },
    { id: 13, url: 'memes-imgs/13.jpg' },
    { id: 14, url: 'memes-imgs/14.jpg' },
    { id: 15, url: 'memes-imgs/15.jpg' },
    { id: 16, url: 'memes-imgs/16.jpg' },
    { id: 17, url: 'memes-imgs/17.jpg' },
    { id: 18, url: 'memes-imgs/18.jpg' }
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
    console.log(gMeme.lines[idx].width)
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
        console.log('Got back live url:', url)
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
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'flex'
}
function setGallery() {
    const elEditorContainer = document.querySelector('.meme-editor-container')
    elEditorContainer.style.display = 'none'
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'block'
}

