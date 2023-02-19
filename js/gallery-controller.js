'use strict'


function renderGallery(){
    let elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = ''
    // console.log(elImgsContainer)
    const imgs = getImgsForDisplay()
    imgs.forEach(img => elImgsContainer.innerHTML += `<div class = "gallery-meme"> <img src="${img.url}" id = ${img.id} onclick="onImgSelect(this)"> </div>`)
}

function onImgSelect(elImg){
    setImg(+elImg.id)
}

function onSetGallery() {
    setGallery()
}