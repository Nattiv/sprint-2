'use strict'

var gIdx = 101

function getImgs() {
    return
}

var gImgs = [
    {
        id: gIdx++,
        url: 'img/1.jpg',
        keywords: ['happy']
    },
    {
        id: gIdx++,
        url: 'img/2.jpg',
        keywords: ['happy']
    },
    {
        id: gIdx++,
        url: 'img/3.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/4.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/5.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/6.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/7.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/8.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/9.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/10.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/11.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/12.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/13.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/14.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/15.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/16.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/17.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/18.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/19.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/20.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/21.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/22.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/23.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/24.jpg',
        keywords: ['happy'],
    },
    {
        id: gIdx++,
        url: 'img/25.jpg',
        keywords: ['happy'],
    },
   
];


function findImg(imgId) {
    return gImgs.find(img => imgId === img.id)
}

function addTxtToImgData(txt) {
gImg.txts.push(txt);
console.log(gImgs)
setTxt(txt) //Better name?
}
