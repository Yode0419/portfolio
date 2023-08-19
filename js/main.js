// 按hamberger下拉連結選擇、按地球下拉語言選擇時，再按下裡面的按鈕、左上角Logo、導航欄外面範圍時，要縮回去
// 連結選擇和語言選擇不能同時下拉
const links = document.querySelectorAll('.navbarItem a, .langOptions a, .navbarLogo');
const itemCheckbox = document.getElementById('itemCheck');
const langCheckbox = document.getElementById('langCheck');
const navbar = document.querySelector('.navbar');

links.forEach(link => {
    link.addEventListener('click', () => {
        itemCheckbox.checked = false; // 關閉連結選擇
        langCheckbox.checked = false; // 關閉語言選擇
    });
});

itemCheckbox.addEventListener('change', () => {
    if (itemCheckbox.checked) {
        langCheckbox.checked = false; // 關閉語言選擇
    }
});

langCheckbox.addEventListener('change', () => {
    if (langCheckbox.checked) {
        itemCheckbox.checked = false; // 關閉連結選擇
    }
});

// 監聽頁面上的點擊事件
document.addEventListener('click', event => {
    // 點擊導航欄外部時，關閉導航欄
    if (!navbar.contains(event.target)) {
        itemCheckbox.checked = false; // 關閉連結選擇
        langCheckbox.checked = false; // 關閉語言選擇
    }
});





////中英切換
//// 載入 language.json 檔案
fetch("./js/language.json")
    .then(response => response.json())
    .then(langData => {
        // 預設語言為中文
        let currentLanguage = "zh";

        // 切換語言的事件處理程序
        const langZhBtn = document.getElementById("langZh");
        const langEnBtn = document.getElementById("langEn");

        langZhBtn.addEventListener("click", function (event) {
            event.preventDefault(); // 阻止點擊事件的預設行為
            currentLanguage = "zh";
            updatePageLanguage(langData, currentLanguage);
        });

        langEnBtn.addEventListener("click", function (event) {
            event.preventDefault(); // 阻止點擊事件的預設行為
            currentLanguage = "en";
            updatePageLanguage(langData, currentLanguage);
        });


        // 更新頁面語言
        //    console.log(langData);
        function updatePageLanguage(data, lang) {
            Object.keys(data[lang]).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    const newValue = data[lang][id];

                    // 判斷是否是 input 元素或 textarea 元素且具有 placeholder 屬性
                    if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") &&
                        element.hasAttribute("placeholder")) {
                        element.setAttribute("placeholder", newValue);
                    } else {
                        element.innerHTML = newValue;
                    }

                    // 取消 <p> 標籤的左右對齊（僅適用於英文語言）
                    if (lang === "en" && element.tagName === "P") {
                        element.style.textAlign = "left"; // 或者設定其他適當的對齊方式
                    }
                }
            });
        }
        // 頁面載入時初始更新語言
        updatePageLanguage(langData, currentLanguage);
    });




//按導航列的按鈕時，畫面跳轉並淡入
const welcomePage = document.querySelector('.welcomePage'); // welcome 元素
const navAboutBtn = document.getElementById('navAboutBtn');
const navContactBtn = document.getElementById('navContactBtn');
const sections = document.querySelectorAll('.section'); // 所有的 section 元素



navAboutBtn.addEventListener('click', function (event) {
    event.preventDefault(); // 防止點擊時的默認行為
    sections.forEach(section => section.style.opacity = 0); // 隱藏所有 section
    welcomePage.style.opacity = 0; //隱藏 welcomePage

    setTimeout(() => {
        window.location.href = '#section2'; // 跳轉到目標 section
        sections.forEach(section => section.style.opacity = 1); // 顯示所有 section
        welcomePage.style.opacity = 1; //顯示 welcomePage
    }, 300); // 延遲 0.3 秒後執行
});

navContactBtn.addEventListener('click', function (event) {
    event.preventDefault(); // 防止點擊時的默認行為
    sections.forEach(section => section.style.opacity = 0); // 隱藏所有 section
    welcomePage.style.opacity = 0; //隱藏 welcomePage
    
    setTimeout(() => {
        window.location.href = '#section3'; // 跳轉到目標 section
        sections.forEach(section => section.style.opacity = 1); // 顯示所有 section
        welcomePage.style.opacity = 1; //顯示 welcomePage
    }, 300); // 延遲 0.3 秒後執行
});




//歡迎頁面捲動動畫
const bgCanvas = document.querySelector(".bgCanvas");
const scrollToHide = document.querySelector(".scrollToHide");
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;
const bgContext = bgCanvas.getContext("2d");
const frameCount = 125;

const currentFrame = (index) => `./images/bgImage/${(index + 1).toString()}.jpg`;

const bgImages = [];
let bg = {
    frame: 0
};

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    bgImages.push(img);
}

gsap.to(bg, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "600%",
    },
    onUpdate: render,
});

bgImages[0].onload = render;

function render() {
    bgContext.canvas.width = bgImages[0].width;
    bgContext.canvas.height = bgImages[0].height;
    bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    //    // 計算透明度
    //    const opacity = 1;

    // 設定透明度
    if (bg.frame >= frameCount - 5) {
        // 如果是最後五張圖，透明度遞減
        const opacityDecrease = (frameCount - bg.frame - 1) / 5;
        bgContext.globalAlpha = opacityDecrease;
        //        console.log('變透明!' + bgContext.globalAlpha);
    } else {
        // 其他圖像保持透明度為100%
        bgContext.globalAlpha = 1;
    }

    // 繪製圖像
    bgContext.drawImage(bgImages[bg.frame], 0, 0);

    // 還原透明度
    bgContext.globalAlpha = 1;
    console.log(bg.frame);
}


//從歡迎頁按導覽列的作品集或向下箭頭按鈕時，撥放動畫後跳轉到作品集section，撥放時間是依據剩餘的frame數量而定
function playAnimationAndScroll() {
    const currentFrameNumber = bg.frame;
    const durationTime = 2.5 * (1 - currentFrameNumber / frameCount);
    console.log('duration:Time' + durationTime);

    // 淡出 .scrollToHide 元素
    const durationTimeOfHide = Math.max(0, 2.5 * (45 - currentFrameNumber) / frameCount);
    //    console.log('durationTimeOfHide:' + durationTimeOfHide);
    gsap.to(scrollToHide, {
        opacity: 0,
        duration: durationTimeOfHide, // 根据您的需求调整淡出的时间
    });

    gsap.to(bg, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: durationTime,
        onUpdate: render,
        onComplete: () => {
            // 播放完动画后，直接跳转到下一部分
            sections.forEach(section => section.style.opacity = 0); // 隱藏所有 section
            const targetSection1 = document.getElementById("section1");
            setTimeout(() => {
                //            document.documentElement.style.scrollBehavior = "smooth";
                targetSection1.scrollIntoView();
                sections.forEach(section => section.style.opacity = 1); // 顯示所有 section
            }, 300); // 延遲 0.3 秒後執行
        },
    });
}

const navPortfolioBtn = document.getElementById("navPortfolioBtn");
const arrowDownButton = document.getElementById("arrowDown");

navPortfolioBtn.addEventListener("click", playAnimationAndScroll);
arrowDownButton.addEventListener("click", playAnimationAndScroll);


//歡迎台詞， 使用 fromTo 方法来实现淡出动画并显示标记
gsap.fromTo(
    scrollToHide, {
        opacity: 1, // 起始透明度为 1
    }, {
        opacity: 0, // 结束透明度为 0
        scrollTrigger: {
            trigger: ".welcomePage", // 触发滚动的元素
            start: "10% 50%", // 触发动画的位置
            end: "30% 100%", // 结束动画的位置
            scrub: true, // 使动画与滚动同步
            //                        markers: true, // 启用标记以显示滚动位置和触发点
        },
    }
);









//GSAP飛入淡入動畫
//const sections = document.querySelectorAll('.section');
//
//sections.forEach((section, index) => {
//
//    const container = section.querySelector('.container');
//    const cards = section.querySelectorAll('.card');
//    const aboutMe1 = section.querySelectorAll('.aboutMe1');
//    const aboutMe2 = section.querySelectorAll('.aboutMe2');
//
//    gsap.set(container, {
//        y: 150,
//        opacity: 1
//    });
//
//    gsap.to(
//        container, {
//            y: 0,
//            opacity: 1,
//            duration: 1.5,
//            ease: 'power2.easeInOut',
//            scrollTrigger: {
//                trigger: section,
//                start: "top 90%",
//                //                end: "bot 10%",
//                toggleActions: "play none none reset",
//                //                markers: true,
//            },
//        }
//    );
//
//
//    //    cards.forEach(card => {
//    //        gsap.set(card, {
//    //            x: window.innerWidth < 768 ? 0 : 50, // 螢幕寬度小於 768px 時設為 0，否則設為 50
//    //            opacity: 1
//    //        });
//    //
//    //        gsap.to(
//    //            card, {
//    //                opacity: 1,
//    //                x: 0,
//    //                duration: 1,
//    //                scrollTrigger: {
//    //                    trigger: card,
//    //                    start: "0 100%",
//    //                    toggleActions: "play none none reset",
//    //                    //                  markers: true,
//    //                },
//    //            }
//    //        );
//    //    });
//    //
//    //    gsap.set(aboutMe1, {
//    //        x: window.innerWidth < 768 ? 0 : -50, // 螢幕寬度小於 768px 時設為 0，否則設為 -50
//    //        opacity: 1
//    //    });
//    //
//    //    gsap.to(
//    //        aboutMe1, {
//    //            x: 0,
//    //            opacity: 1,
//    //            duration: 1.5,
//    //            scrollTrigger: {
//    //                trigger: section,
//    //                start: "top 90%",
//    //                toggleActions: "play none none none",
//    //            },
//    //        }
//    //    );
//    //
//    //    gsap.set(aboutMe2, {
//    //        x: window.innerWidth < 768 ? 0 : 50, // 螢幕寬度小於 768px 時設為 0，否則設為 50
//    //        opacity: 0
//    //    });
//    //
//    //    gsap.to(
//    //        aboutMe2, {
//    //            x: 0,
//    //            opacity: 1,
//    //            duration: 1.5,
//    //            scrollTrigger: {
//    //                trigger: section,
//    //                start: "top 90%",
//    //                toggleActions: "play none none none",
//    //            },
//    //        }
//    //    );
//
//});






// 紀錄評價的數值
const rating = document.querySelectorAll('input[name="score"]');
let score = 0;
rating.forEach(input => {
    input.addEventListener('click', function () {
        score = this.value;
    });
});

//聯繫我表單提交至Google Form
document.getElementById('googleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止默认事件

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const FORM_ID = '1FAIpQLSfT4XMewlRDUyiANUsIc3cAqNQOkwT28xCaEOaAC0q5oE6Jbw';
    const query = {
        'entry.670740193': name,
        'entry.905490443': email,
        'entry.711108969': message,
        'entry.342017208': score,
        'submit': 'SUBMIT' // 添加 submit 参数
    };

    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${new URLSearchParams(query)}`, {
            method: 'POST',
            mode: 'no-cors', // Google 只接受 'no-cors' 模式
        })
        .then(() => {
            alert("THANK YOU!!!");
            // 完成后清空表单字段
            rating.forEach(input => {
                input.checked = false;
            });
            console.log("send success!");
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch(() => {
            // 提交失败时处理
        });
});






//土法煉鋼的捲動SNAP，只有往下滑動時觸發，往上滑不會，section在視窗頂部下方視窗高度20%以內時觸發
let timeoutId = null;

window.addEventListener('scroll', function () {
    clearTimeout(timeoutId); // 清除之前的計時器

    timeoutId = setTimeout(function () {
        const windowHeight = window.innerHeight; // 取得視窗高度
        //        const sections = document.querySelectorAll('.section'); // 選取所有的section元素

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top; // 取得section頂緣相對於視窗的位置

            if (sectionTop > 0 && sectionTop <= windowHeight * 0.20) {
                //                console.log("Scroll!");
                const startScrollY = window.scrollY;
                const scrollToPosition = startScrollY + sectionTop;
                const duration = 300; // 捲動的總時間（毫秒）
                let startTime;

                function scrollToEaseOut(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const elapsedTime = timestamp - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3); // 使用 ease-out 函數
                    const scrollDistance = scrollToPosition - startScrollY;
                    const scrollAmount = scrollDistance * easeProgress;

                    window.scrollTo({
                        top: startScrollY + scrollAmount,
                        behavior: 'auto'
                    });

                    if (elapsedTime < duration) {
                        requestAnimationFrame(scrollToEaseOut);
                    }
                }

                requestAnimationFrame(scrollToEaseOut);
            }
        });
    }, 500); // 0.5秒延遲後執行
});
