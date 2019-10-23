'use strict'

var gIdx = 101

function getImgs() {
    return
}

var gImgs = [
    {
        id: gIdx++,
        url: 'img/1.jpg',
        keywords: ['happy'],
        txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }, {line:'shalom'}]
    },
    {
        id: gIdx++,
        url: 'img/2.jpg',
        keywords: ['happy'],
        txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }, {line:'Shimshon'}]

    }
];

var gMeme = { selectedImgId: 5, selectedTxtIdx: 0, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }
var gKeywords = { 'happy': 12, 'funny puk': 1 }

function findImg(imgId) {
    return gImgs.find(img => imgId === img.id)
}

function addTxtToImgData(txt) {
gImg.txts.push(txt);
console.log(gImgs)
setTxt(txt) //Better name?
}
