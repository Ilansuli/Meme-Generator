'use strict'

function renderGallery(){
    const gallery = document.querySelector('.gallery')
    for (let i = 0; i < 17; i++) {
            gallery += `<img src="img/${i}.jpg" alt="">`
    }
    
}