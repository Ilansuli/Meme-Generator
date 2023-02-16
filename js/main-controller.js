'use strict'

let gElMemeCanvas
let gCtx

function mainInit() {
    gElMemeCanvas = document.querySelector('#edited-meme-canvas')
    gCtx = gElMemeCanvas.getContext('2d')
    renderMeme(getMeme())
    renderGallery()

}
resizeCanvas()

function renderMeme(meme) {
    const { selectedImgId, lines, selectedLineIdx } = meme
    const newImg = new Image()
    const imgs = getImgsForDisplay()
    let img = imgs.find(img => img.id === selectedImgId)
    newImg.src = img.url
    newImg.onload = () => {
        gCtx.drawImage(newImg, 0, 0, gElMemeCanvas.width, gElMemeCanvas.height)
        renderTxtLines(lines, selectedLineIdx)
    }
}

function renderTxtLines(lines, selectedLineIdx) {
    let idx = 0
    lines.forEach(line => {
        const { txt, size, align, color,font } = line
        let x = gElMemeCanvas.width / 2
        let y
        if (!idx) y = 50
        else if (idx === 1) y = 500
        else y = gElMemeCanvas.height / 2
        updateTxtLinePos(x, y, idx)
        renderTxtLine(x, y, size, color, txt, align,font, idx, selectedLineIdx)
        idx++
    })

}
function renderTxtLine(x, y, size, color, txt, align,font, idx, selectedLineIdx) {
    if (idx === selectedLineIdx) return renderTxtBorder(x,y,size,color,txt,align,font)
    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

function renderTxtBorder(x,y,size,color,txt,align,font) {
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseLine = 'alphabetic'
    gCtx.strokeText(txt, x , y )
    gCtx.fillText(txt,x,y)

    const txtWidth = gCtx.measureText(txt).width + 20
    const txtHeight = gCtx.measureText(txt).fontBoundingBoxAscent +
    gCtx.measureText(txt).fontBoundingBoxDescent  + 10
    
    gCtx.strokeStyle = 'darkslateblue'
    gCtx.strokeRect(x - (txtWidth/2) , y - (txtHeight/2 + 5),txtWidth ,txtHeight)



}
function onAddNewTextLine(){
    addNewTextLine()
}
function onSetLineTxt(ev) {
    ev.preventDefault()
    const meme = getMeme()
    const {lines} = meme
    if(lines.length === 0 ) addNewTextLine()
    const elInput = document.querySelector('input[name="new-line-txt"')
    setTxtToLine(elInput.value)
    // elInput.value = ''
}
function onDeleteLine(){
    deleteLine()
}
function onChangeColor(color) {
    changeColor(color)
}
function onDecreaseFont() {
    decreaseFont()
}
function onIncreaseFont() {
    increaseFont()
}
function onToggleLines() {
    toggleLines()
}
function onChangeFont(elFont){
    changeFont(elFont)
}
function onUploadImg() {
    const imgDataUrl = gElMemeCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function downloadCanvas(elLink) {
    // Protect the image soo attacker could not download imgs from diff domain
    const data = gElMemeCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
  }


function onSetEditor() {
    setEditor()
}
function onSetGallery() {
    setGallery()
}
function resizeCanvas() {
    // const elCanvasContainer = document.querySelector('.edited-meme-container')
    // // Note: changing the canvas dimension this way clears the canvas
    // gElMemeCanvas.width = elCanvasContainer.offsetWidth
    // // Unless needed, better keep height fixed.
    // gElMemeCanvas.height = elContainer.offsetHeight
    var canvas = document.querySelector('#edited-meme-canvas');
var heightRatio = 1;
canvas.height = canvas.width * heightRatio;
}

function onToggleMenu() {
    document.body.classList.toggle('opened-menu')
}
