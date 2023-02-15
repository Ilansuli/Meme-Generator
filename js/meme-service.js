'use strict'


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'black',
        }
    ]
}


function getMeme() {
    return gMeme
}
function setLineTxt(txtValue) {
    // console.log(txtValue)
    console.log(gMeme)
    const newLine = {
        txt: txtValue,
        size: 20,
        align: 'center',
        color: 'red',
    }
    gMeme.lines.push(newLine)
    renderMeme(gMeme)
    // gMeme.lines[gMeme.lines.length - 1].txt = txtValue
} 
