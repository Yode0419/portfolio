let myImage = document.querySelector('#pekoImage');

myImage.onclick = function () {
    let myScr = myImage.getAttribute('src');
    if (myScr === 'img/peko.gif') {
        myImage.setAttribute('src', 'img/peko2.png');
    } else {
        myImage.setAttribute('src', 'img/peko.gif');
    }
}

//
//let myButton = document.querySelector('button');
//let myHeading = document.querySelector('h2');
//  
//function setUserName() {
//    let myName = prompt('請輸入您ㄉ暱稱');
//    if (!myName) {
//        setUserName();
//    } else {
//        localStorage.setItem('name', myName);
//        myHeading.textContent = '尼好! ' + myName + ' 歡迎光臨 ~ ~ (つ´ω`)つ';
//    }
//}
//
//if (!localStorage.getItem('name')) {
//    setUserName();
//} else {
//    let storedName = localStorage.getItem('name');
//    myHeading.textContent = '尼好! ' + storedName + ' 歡迎光臨 ~ ~ (つ´ω`)つ';
//}
//
//myButton.onclick = function () {
//    setUserName();
//    localStorage.clear();
//}
