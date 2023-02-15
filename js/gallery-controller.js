'use strict'


function renderGallery(){
    const gallery = document.querySelector('.gallery-container')
    const imgs = getImgsForDisplay()
    // console.log(imgs);
     imgs.forEach((img) =>{
        return gallery.innerHTML += `<img src="${img.url}" id = ${img.id} onclick="onImgSelect(this)">`
     })
}

function onImgSelect(elImg){
    setImg(+elImg.id)
}