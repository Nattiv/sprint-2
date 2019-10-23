'use strict'

var gCanvas = document.querySelector('#my-canvas')
var gCtx = gCanvas.getContext('2d');
var gFontSize = 20
var gYaxis = 50
var gImg
var gIsSecondLine = false


function init() {
    // gImgs = getImgs()
    displayFontSize()
    renderImgs()
}

function renderImgs() {
    var strHtmls = gImgs.map(img => `<img src=${img.url} onclick="onLoadImgtoEditor(${img.id})"> `)
    document.querySelector('.gallery').innerHTML = strHtmls;
}

function onLoadImgtoEditor(imgId) {
    gImg = findImg(imgId);
    loadImgToEditor(gImg.url);
    // setTimeout(drawTxt, 200)
}

function loadImgToEditor(imgUrl) {
    var img = new Image();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = imgUrl
}

function setTxt(txt) {
    drawTxt(txt)
    console.log(gYaxis)
}

function drawTxt(txt) {
    gCtx.font = `bold ${gFontSize}px Impact`;
    gCtx.fillStyle = "#fff"
    gCtx.fillText(txt, gCanvas.width / 2, gYaxis);
}

function onAddTxt() {
    var txt = document.querySelector('.txt-input').value;
    if (!gImg) return
    //TO DO: Modal choose img first
    addTxtToImgData(txt);
    //TO DO: create object txt

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

function displayYaxis(gYaxis) {
    document.querySelector('.display-Y-axis').innerText = gYaxis;
}

function onSwitchLine() {
    gIsSecondLine = true;
    gYaxis = 135
}
