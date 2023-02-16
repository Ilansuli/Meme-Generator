'use strict'


function renderGallery(){
    const gallery = document.querySelector('.gallery-container')
    const imgs = getImgsForDisplay()
     imgs.forEach((img) =>{
        return gallery.innerHTML += `<div class = "gallery-meme"> <img src="${img.url}" id = ${img.id} onclick="onImgSelect(this)"> </div>`
     })
}

function onImgSelect(elImg){
    setImg(+elImg.id)
}