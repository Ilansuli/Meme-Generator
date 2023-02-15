'use strict'

let gElMemeCanvas
let gCtx

function init() {
    gElMemeCanvas = document.querySelector('#edited-meme-canvas')
    gCtx = gElMemeCanvas.getContext('2d')
    renderMeme(getMeme())
    renderGallery()
}

function renderMeme(meme) {
    const { selectedImgId, lines, selectedLineIdx } = meme
    const { txt, size, align, color } = lines[selectedLineIdx]



    const newImg = new Image()
    const imgs = getImgsForDisplay()
    const img = imgs.find((img) => {
        return img.id === selectedImgId
    })
    newImg.src = img.url
    newImg.onload = () => {
        gCtx.drawImage(newImg, 0, 0, gElMemeCanvas.width, gElMemeCanvas.height)
        renderLines(lines)
    }

}

function renderLines(lines) {
    let idx = 0
    lines.forEach(line => {
        const { txt, size, align, color } = line
        const x = gElMemeCanvas.width / 2
        let y
        if (!idx) y = 50
        else if (idx === 1) y = 350
        else y = gElMemeCanvas.height / 2
        renderLine(x,y,size,color,txt,align)
        idx++
    });

}
function renderLine(x, y, size, color, txt, align) {
    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
    gCtx.font = `${size}px serif`
    gCtx.textAlign = align
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

function onSetLineTxt(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="new-line-txt"')
    setLineTxt(elInput.value)
    elInput.value = ''
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     // Note: changing the canvas dimension this way clears the canvas
//     gElCanvas.width = elContainer.offsetWidth
//     // Unless needed, better keep height fixed.
//     // gElCanvas.height = elContainer.offsetHeight
// }