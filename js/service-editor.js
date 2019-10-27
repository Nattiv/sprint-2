'use strict'

var gMeme

var gTxtIdx = 1

function getImgFromStorage() {
    return loadFromStorage(KEY_IMG)
}

function createMeme() {
    gMeme = {
        selectedImgId: gImg.id,  //Delete
        txts: []
    }
}

function createTxt(txt) {
    console.log('gYaxis txt', gYaxis)
    var txtObj = {
        idx: gTxtIdx++,
        line: txt,
        size: gFontSize,
        align: gTxtAlign,
        fillColor: gFillColor,
        strokeColor: gStrokeColor,
        yPos: gYaxis
    }
    gMeme.txts.push(txtObj);
    console.log(gMeme)
    return txtObj
}

function addTxt(txt) {
    gMeme.txts.push(txt)
}

function removeLine() {
    let idx = findIdx()
    gMeme.txts.splice(idx, 1)
    console.log(gMeme)
    gCurrTxt = false
    updateImg()
}

function findIdx() {
    return gMeme.txts.findIndex(txt => txt.idx === gCurrTxt.idx)
}



//Share with FB
function uploadImg(elForm, ev) {
    console.log(elForm, ev)
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
               Share   
            </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })

        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}




// facebook api
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));