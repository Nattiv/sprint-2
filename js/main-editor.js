'use strict'
var KEY_IMG = 'img'
var KEY_MEME = 'meme'
var gCanvas = document.querySelector('#my-canvas')
var gCtx = gCanvas.getContext('2d');
var gTxtAlign = "center"
var gFillColor = '#ffffff'
var gStrokeColor = '#000000'
var gFontSize = 40
var gYaxis = getRect()
var gImg
var gCurrTxt
var gIsYaxisChanged = false

function init() {
    gImg = getImgFromStorage()
    createMeme(gImg)
    loadImgToEditor(gImg.url)
    displayFontSize()
    displayYaxis()
    displayTxtBorder()
    addListener()
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
    var txt = document.querySelector('.txt-input').value;
    if (!gImg) return;
     checkIsOnTxt(gYaxis)
    var txtObj = checkIsNewTxt(txt)
    renderMeme(txtObj)
    gCurrTxt = false;
    //TO DO: jump a line automatically (top, bottom,center)
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
        drawTxt(txt)
    })
}

function addTxtTogMeme(txt) {
    return createTxt(txt)
}

//TO DO: update every style according the txtObj
function drawTxt(txtObj) {
    gCtx.font = `bold ${txtObj.size}px Impact`;
    gCtx.fillStyle = txtObj.fillColor
    gCtx.strokeStyle = txtObj.strokeColor
    gCtx.textAlign = txtObj.align;
    gCtx.fillText(txtObj.line, (gCanvas.width / 2), txtObj.yPos);
    gCtx.strokeText(txtObj.line, (gCanvas.width / 2), txtObj.yPos);
}

function onChangeSize(img) {
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
    // let height=     //TO DO: height is not intuitive
    gIsYaxisChanged = true;
    displayYaxis(gYaxis)
    displayTxtBorder()

}

function displayYaxis() {
    document.querySelector('.display-Y-axis').innerText = Math.floor(gYaxis);
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
    displayYaxis(gYaxis)
    displayTxtBorder()
    gIsYaxisChanged = true
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
    gIsYaxisChanged = true;
    var rect = gCanvas.getBoundingClientRect();
    var y = ev.clientY - rect.top
    checkIsOnTxt(y)
    gYaxis = y + gFontSize / 2
    displayTxtBorder()
    displayYaxis()
}

function checkIsOnTxt(y) {
    let txt = gMeme.txts.find((txt) => {
        return (
            y < txt.yPos + 5 &&
            y > txt.yPos - txt.size
        )
    })
    if (txt) {
        if(gIsYaxisChanged)uploadTxtPref(txt)
        y = txt.yPos - txt.size
        gCurrTxt = txt;
    } else {
        document.querySelector('.txt-input').value = '';
    }
}

function uploadTxtPref(txt) {
    document.querySelector('.txt-input').value = txt.line
    gFillColor = txt.fillColor;
    document.querySelector('.fill-color').value = txt.fillColor
    gStrokeColor = txt.strokeColor
    document.querySelector('.stroke-color').value = txt.strokeColor
    gFontSize = txt.size
    displayFontSize()
    gTxtAlign = txt.align
    document.querySelector('.text-align').value = txt.align
}

function displayTxtBorder() {
    let top = getTop();
    let left = getLeft()
    var elBorder = document.querySelector('.txt-border')
    elBorder.style.top = top + "px"
    elBorder.style.left = left + "px"
    elBorder.style.width = gCanvas.maxWidth + "px"
    elBorder.classList.remove('txt-border-off');
    removeBorder(elBorder)
}


function getRect() {
    let rect = gCanvas.getBoundingClientRect()
    return rect.top
}

function getTop() {
    let rect = gCanvas.getBoundingClientRect()
    return (gYaxis + rect.top - gFontSize + 6)
}

function getLeft() {
    let rect = gCanvas.getBoundingClientRect()
    return (rect.left)
}

function removeBorder(elBorder) {
    setTimeout(function () {
        elBorder.classList.add('txt-border-off');
    }, 3000)
}

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
    document.querySelector('.txt-input').value = ''
    onAddTxt()
}

function onSaveMemeToStorage() {
    savegMemeToStorage()
}

function savegMemeToStorage() {
    saveToStorage(KEY_MEME, gMeme)
}

function addListener() {
    var input = document.querySelector(".txt-input");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) onAddTxt()
    })
}

// <---Modal-Share--->
function onToggleModal() {
    var elModal = document.querySelector('.screen');
    if (elModal.classList.contains('display')) {
        elModal.classList.remove('display')
    } else {
        elModal.classList.add('display')
    }
}

// <---Modal-Share--->

function onToggleMenu() {
    var elMenu = document.querySelector('.links')
    var elCloseSign = document.querySelector('.close-menu')
    var elHamburgerMenu = document.querySelector('.hamburger-menu')
    if (elMenu.classList.contains('display-flex')) {
        elMenu.classList.remove('display-flex');
        elHamburgerMenu.classList.remove('hidden')
        elCloseSign.classList.remove('display')
    } else {
        elMenu.classList.add('display-flex');
        elCloseSign.classList.add('display')
        elHamburgerMenu.classList.add('hidden')

    }

}