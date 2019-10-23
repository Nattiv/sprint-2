'use strict'


var KEY_IMG = 'img'
var KEY_MEME = 'meme'

var gCanvas = document.querySelector('#my-canvas')
var gCtx = gCanvas.getContext('2d');
var gFontSize = 20
var gYaxis = 50
var gIsSecondLine = false
var gImg
var gTxtAlign = "center"


function init() {
    gImg = getImgFromStorage()
    loadImgToEditor(gImg.url)
    displayFontSize()
    displayYaxis()
    createMeme(gImg)
}

function loadImgToEditor(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        console.log(gCanvas.width)
    }
}

function onAddTxt() {
    var txt = document.querySelector('.txt-input').value;
    if (!gImg) return
    addTxtTogMeme(txt);
    drawTxt(txt)
}

function addTxtTogMeme(txt) {
    addTxt(txt)
    console.log(gMeme)
}

function drawTxt(txt) {
    console.log(gTxtAlign)
    console.log(gCanvas.width)
    gCtx.font = `bold ${gFontSize}px Impact`;
    gCtx.fillStyle = "#fff"
    gCtx.strokeStyle = "black"
    gCtx.textAlign = gTxtAlign;
    gCtx.fillText(txt, (gCanvas.width / 2), gYaxis);
    gCtx.strokeText(txt, (gCanvas.width / 2), gYaxis);
}

function onChangeSize(btn) {
    if (btn.value === 'increase') gFontSize++
    else gFontSize--;
    displayFontSize()
}

function displayFontSize() {
    document.querySelector('.display-font-size').innerText = gFontSize;
}

function onChangeYaxis(btn) {
    if (btn.value === 'up') gYaxis--
    else gYaxis++;
    console.log(gYaxis)
    displayYaxis(gYaxis)
}

function displayYaxis() {
    document.querySelector('.display-Y-axis').innerText = gYaxis;
}

function onSwitchLine() {
    gIsSecondLine = true;
    gYaxis = 135
}

function onUpdategTxtAlign(val) {
    if (val === 'center') gTxtAlign = 'center';
    if (val === 'right') gTxtAlign = 'right';
    if (val === 'left') gTxtAlign = 'left'
}

function onSaveMemeToStorage() {
    savegMemeToStorage()
}

function savegMemeToStorage() {
    saveToStorage(KEY_MEME, gMeme)
}

function onUpdategFillColor(val) {
console.log(val)
}

function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
    console.log(imgContent)
    getImg(imgContent)
}

function onUploadImg(elForm, ev) {
    uploadImg(elForm, ev)
}


