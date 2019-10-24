'use strict'
var KEY_IMG = 'img'
var KEY_MEME = 'meme'
var gCanvas = document.querySelector('#my-canvas')
var gCtx = gCanvas.getContext('2d');
var gFontSize = 40
var gYaxis = 50
var gImg
var gTxtAlign = "center"
var gFillColor = '#ffffff'
var gStrokeColor = '#000000'
var gCurrTxt

function init() {
    gImg = getImgFromStorage()
    createMeme(gImg)
    loadImgToEditor(gImg.url)
    displayFontSize()
    displayYaxis()
    hideMemes()
}

function loadImgToEditor(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
}

function onAddTxt() {
    loadImgToEditor(gImg.url)
    var input = document.querySelector('.txt-input');
    var txt = input.value
    if (!gImg || !txt) return;
    var txtObj = checkIsNewTxt(txt)
    renderMeme(txtObj)
    gCurrTxt = false;
    input.value = '';
}

function checkIsNewTxt(txt) {
    if (gCurrTxt) {
        gCurrTxt.line = txt;
        return gCurrTxt
    } else {
        return addTxtTogMeme(txt);
    }
}

function renderMeme(txtObj) {
    setTimeout(
        function () {
            checkOtherTxts()
            drawTxt(txtObj)
        }, 50)
}

function checkOtherTxts() {
    if (gMeme.txts.length === 1) return
    gMeme.txts.forEach(txt => {
        uploadTxtPref(txt)
        drawTxt(txt)
    })
}

function addTxtTogMeme(txt) {
    return createTxt(txt)
}

//TO DO: update evry style according the txtObj
function drawTxt(txtObj) {
    gCtx.font = `bold ${gFontSize}px Impact`;
    gCtx.fillStyle = gFillColor
    gCtx.strokeStyle = gStrokeColor
    gCtx.textAlign = gTxtAlign;
    gCtx.fillText(txtObj.line, (gCanvas.width / 2), txtObj.yPos);
    gCtx.strokeText(txtObj.line, (gCanvas.width / 2), txtObj.yPos);
}

function onChangeSize(img) {
    console.log(img)
    // debugger
    if (img.dataset.val === '+') gFontSize++
    else gFontSize--;
    displayFontSize()
}

function displayFontSize() {
    document.querySelector('.display-font-size').innerText = gFontSize;
}

function onChangeYaxis(img) {
    if (img.dataset.val === '+') gYaxis--
    else gYaxis++;
    displayYaxis(gYaxis)
}

function displayYaxis() {
    document.querySelector('.display-Y-axis').innerText = gYaxis;
}

function onSwitchLine(val) {
    if (val === 'top') {
        gYaxis = 60;
    }
    if (val === 'center') {
        gYaxis = 240;
    }
    if (val === 'bottom') {
        gYaxis = 485;
    }
}

function onUpdategTxtAlign(val) {
    if (val === 'center') gTxtAlign = 'center';
    if (val === 'right') gTxtAlign = 'right';
    if (val === 'left') gTxtAlign = 'left'
}


function onUpdategFillColor(val) {
    gFillColor = val;
}

function onUpdategStrokeColor(val) {
    gStrokeColor = val;
}

function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
    getImg(imgContent)
}

function onUploadImg(elForm, ev) {
    document.querySelector('.btn-share').style.display = "none"
    uploadImg(elForm, ev)
}

function onCanvasclicked(ev) {
    var rect = gCanvas.getBoundingClientRect();
    var x = ev.clientX - rect.left
    var y = ev.clientY - rect.top
    checkClickOnTxt(y, ev)
    console.log(x, y)
    console.log(ev)
}

function checkClickOnTxt(y) {
    let txt = gMeme.txts.find((txt) => {
        return (
            y < txt.yPos + 5 &&
            y > txt.yPos - txt.size
        )
    })
    if (txt) {
        uploadTxtPref(txt)
        // drawTxtBgc(txt)
        y = txt.yPos - txt.size
        displayTxtBorder(y)
        gCurrTxt = txt;
    }
}

function uploadTxtPref(txt) {
    document.querySelector('.txt-input').value = txt.line
    document.querySelector('.fill-color').value = txt.fillColor
    document.querySelector('.stroke-color').value = txt.strokeColor
    gFillColor = txt.fillColor;
    gStrokeColor = txt.strokeColor
}

function displayTxtBorder(y) {
    var rect = gCanvas.getBoundingClientRect();
    var elBorder = document.querySelector('.txt-border')
    elBorder.style.top = (y + rect.top + 5) + 'px'
    elBorder.style.display = 'block'
    removeBorder(elBorder)
}

function removeBorder(elBorder) {
    setTimeout(function () {
        elBorder.style.display = 'none';
    }, 3000)
}

// function drawTxtBgc(txt) {
//     gCtx.beginPath();
//     gCtx.rect(0, txt.yPos - txt.size, gCanvas.width, txt.size);
//     gCtx.stroke();
// }

function onDelete() {
    if (!gCurrTxt) alert('choose Line');
    else deleteLine()
}

function deleteLine() {
    removeLine()
}

function updateImg() {
    renderImgs()
}

function renderImgs() {
    loadImgToEditor(gImg.url)
    setTimeout(
        function () {
            gMeme.txts.forEach(txt => {
                drawTxt(txt)
            })
        }, 50
    )

}

function onSaveMemeToStorage() {
    savegMemeToStorage()
}

function savegMemeToStorage() {
    saveToStorage(KEY_MEME, gMeme)
}

function hideMemes() {
    document.querySelector('.memes-link').style.display = 'none'
}