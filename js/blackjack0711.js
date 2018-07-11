let cardsArr = [];
let CARD_SET = 3;
let players = [];
let numOfPlayers = 0;
let hideBtn = [];
let countDown = 2;


let onChange = function () {
    numOfPlayers = document.getElementById("howMany").value;
    players = [];
    hideBtn = [];

    //玩家陣列
    for (let i = 0; i < numOfPlayers; i++) {
        players.push(Object.assign({}, player));
    }

    //按鍵陣列
    for (let i = 0; i < numOfPlayers; i++) {
        hideBtn.push("hideBtn" + i);
    }

};
//玩家物件
let player = {
    money: 100,
    bet: 0,
    handCard: [],
    totalPoint: 0
};

//創造一副牌
for (let i = 1; i <= 52 * CARD_SET; i++) {
    cardsArr.push(i);
}


//莊家物件
let house = {
    money: 100,
    handCard: [],
    totalPoint: 0,
    tempCardBox: [],
    //印牌
    printCards(arr, num) {
        let forPrint = [];
        let imgArr = [];
        for (let i = 0; i < arr.length; i++) {
            imgArr.push(document.createElement("img"));
        }

        for (let j = 0; j <= arr.length; j++) {
            if (arr[j] % 52 >= 1 && arr[j] % 52 <= 13) {
                forPrint[j] = '黑桃' + (arr[j] % 52) % 14;
            }
            else if (arr[j] % 52 >= 14 && arr[j] % 52 <= 26) {
                forPrint[j] = '紅心' + ((arr[j]) % 52 - 13) % 14;
            }
            else if (arr[j] % 52 >= 27 && arr[j] % 52 <= 39) {
                forPrint[j] = '方塊' + ((arr[j]) % 52 - 26) % 14;
            }
            else if (arr[j] % 52 >= 40 && arr[j] % 52 < 52) {
                forPrint[j] = '梅花' + ((arr[j] % 52) - 39) % 14;
            }
            else if (arr[j] % 52 === 0) {
                forPrint[j] = '梅花' + 13;
            }
        }
        for (let i = 0; i < arr.length; i++) {
            imgArr[i].src = "Modern/" + forPrint[i] + ".png";
            imgArr[i].width = "90";
            if (i === 0) {
                if (num === "house") {
                    imgArr[i].style = "position:absolute;left:" + 0 + "px;top:60px";
                }
                else {
                    imgArr[i].style = "position:absolute;left:" + 0 + "px;top:150px";
                }

            }
            else {
                if (num === "house") {
                    imgArr[i].style = "position:absolute;left:" + i * 20 + "px;top:60px";
                }
                else {
                    imgArr[i].style = "position:absolute;left:" + i * 20 + "px;top:150px";
                }
            }

        }

        document.getElementById("imgshow" + num).innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            document.getElementById("imgshow" + num).appendChild(imgArr[i]);
        }

    },
    //洗牌
    shuffleCards(arr) {
        let tmp = new Array();
        let t = 0;
        for (let i = 0; i < arr.length; i++) {
            t = Math.floor((Math.random() * (arr.length - 1) + 1));
            tmp = arr[i];
            arr[i] = arr[t];
            arr[t] = tmp;
        }
    },
    //開局發牌
    initialRound(players, cardsArr) {

        for (let i = 0; i < players.length; i++) {
            players[i].handCard = [cardsArr[0]];
            this.tempCardBox.push(cardsArr[0]);
            cardsArr.shift();
        }
        this.tempCardBox.push(cardsArr[0]);
        this.handCard.push(cardsArr.shift());

        for (let i = 0; i < players.length; i++) {
            players[i].handCard.push(cardsArr[0]);
            this.tempCardBox.push(cardsArr[0]);
            cardsArr.shift();
        }

        this.totalPoint = house.count(house.handCard);

        for (let i = 0; i < players.length; i++) {
            players[i].totalPoint = house.count(players[i].handCard);
        }
    },
    //補牌
    getCard(players, cardsArr) {
        this.tempCardBox.push(cardsArr[0]);
        players.handCard.push(cardsArr[0]);
        players.totalPoint = house.count(players.handCard);
        cardsArr.shift(cardsArr[0]);

    },
    //算點數
    count(arr) {
        let point = [];
        point[0] = 0;
        point[1] = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 13 === 1) {
                point[0] = point[0] + (arr[i] % 13);
                point[1] = point[0] + 10;
            }
            else if (arr[i] % 13 > 1 && arr[i] % 13 <= 9) {
                point[0] = point[0] + (arr[i] % 13);
                point[1] = point[1] + (arr[i] % 13);
            }
            else if (arr[i] % 13 >= 10 && arr[i] % 13 <= 12 || arr[i] % 13 === 0) {
                point[0] = point[0] + 10;
                point[1] = point[1] + 10;
            }
        }
        return point;
    },
    //補牌後顯示結果
    result(arr, num) { //秀結果
        let tmp = Math.max(...arr);

        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] > 21) {
                arr.splice(i, 1);
            }
        }
        if (arr[0] === 21 || arr[1] === 21) {
            document.getElementById("show" + num).innerHTML = 'Twenty-One!' + "<br>";
            passBtn(num);
        }
        else if (arr.length === 2) {
            document.getElementById("show" + num).innerHTML =arr[1] + "<br>";
        }
        else if (arr.length === 1) {
            document.getElementById("show" + num).innerHTML =arr[0] + "<br>";
        }
        else if (arr.length === 0) {
            document.getElementById("show" + num).innerHTML = tmp + '!Bust!' + "<br>";
            passBtn(num);
        }
    },
    //判斷發牌後的狀況
    blackJack(arr, num) {
        if (arr[1] === 21) {
            document.getElementById("show" + num).innerHTML = 'Black Jack!!!' + "<br>";

        }
        else {
            document.getElementById("show" + num).innerHTML =arr[1] + "<br>";
        }
    },
    //判斷勝負
    judgeWhoWin(players) {


        //莊家爆點
        if (this.totalPoint.length === 0) {
            // document.getElementById("restart").style.visibility = "visible";
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {
                //玩家拿到blackjack
                if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("result" + i).innerHTML += 'Win!Win!' + "<br>";
                    players[i].money += 2.5 * players[i].bet;
                }

                else if (players[i].totalPoint.length > 0) {
                    document.getElementById("result" + i).innerHTML += 'Win!' + "<br>";
                    players[i].money += 2 * players[i].bet;
                }
                else {
                    document.getElementById("result" + i).innerHTML += 'Lose!' + "<br>";
                }
            }
        }

        //莊家blackjack
        else if (this.handCard.length === 2 && this.totalPoint[1] === 21) {
            // document.getElementById("restart").style.visibility = "visible";
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {
                //玩家拿到blackjack
                if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("result" + i).innerHTML += 'Win!Win!' + "<br>";
                    players[i].money += 2.5 * players[i].bet;
                }
                else {
                    document.getElementById("result" + i).innerHTML += 'Lose!' + "<br>";
                }
            }
        }
        //莊家大於17點
        else if (Math.max(...this.totalPoint) >= 17) {
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {

                //玩家爆點
                if (players[i].totalPoint.length === 0) {
                    document.getElementById("result" + i).innerHTML += 'Lose!' + "<br>";
                }
                //玩家blackjack
                else if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("result" + i).innerHTML += 'Win!Win!' + "<br>";
                    players[i].money += 2.5 * players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) > Math.max(...this.totalPoint)) {
                    document.getElementById("result" + i).innerHTML += 'Win!' + "<br>";
                    players[i].money += 2 * players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) === Math.max(...this.totalPoint)) {
                    document.getElementById("result" + i).innerHTML += 'Push!' + "<br>";
                    players[i].money += players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) < Math.max(...this.totalPoint)) {
                    document.getElementById("result" + i).innerHTML += 'Lose!' + "<br>";
                }
            }

        }

    },
    // //判斷下一個玩家是否black jack
    // bjOrNot(num) {
    //     for (let i = num; i < numOfPlayers; i++) {
    //         if (players[i].totalPoint[1] !== 21) {
    //             document.getElementById("hideBtn" + i).style.visibility = "visible";
    //             break;
    //         }
    //         else {
    //             document.getElementById("hideBtn" + i).style.visibility = "hidden";
    //         }
    //     }
    // }


};


//開局Btn
function openBtn() {
    if (numOfPlayers === 0) {
        alert("Please choose how many person want to play!!");
    }
    else {
        for (let i = 0; i < numOfPlayers; i++) {
            document.getElementById("moneyInput" + i).style.visibility = "visible";
            document.getElementById("betValue" + i).innerHTML = "Money:" + players[i].money ;
            document.getElementById("moneyInput" + i).max = players[i].money;
            document.getElementById("moneyInput" + i).value = 10;

        }
        document.getElementById("open").style.visibility = "hidden";
        document.getElementById("howMany").style.visibility = "hidden";
        // document.getElementById("start").style.visibility = "visible";
        fiveCountDown();
    }
}


//開始botton
let houseStartBtn = function () {
    house.shuffleCards(cardsArr);
    house.initialRound(players, cardsArr);

    for (let i = 0; i < numOfPlayers; i++) {
        players[i].bet = document.getElementById("moneyInput" + i).value;
        house.printCards(players[i].handCard, i);
        house.blackJack(players[i].totalPoint, i);
        players[i].money = players[i].money - players[i].bet;
        document.getElementById("moneyInput" + i).style.visibility = "hidden";
        document.getElementById("betValue" + i).innerHTML = "BET:" + players[i].bet + "  Balance:" + players[i].money;
    }

    house.printCards(house.handCard, "house");
    house.blackJack(house.totalPoint, "house");
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("hideBtn0").style.visibility = "visible";


};
//玩家hit
let getCardBtn = function (num) {
    house.getCard(players[num], cardsArr);
    house.printCards(players[num].handCard, num);
    house.result(players[num].totalPoint, num);
};

//玩家pass
function passBtn(num) {
    if (num === numOfPlayers - 1) {
        document.getElementById(hideBtn[num]).style.visibility = "hidden";
        document.getElementById("househit").style.visibility = "visible";
        //houseGetBtn();
    }
    else if (num === "house") {
        document.getElementById("restart").style.visibility = "visible";
    }
    else {
        document.getElementById(hideBtn[num]).style.visibility = "hidden";
        document.getElementById(hideBtn[num + 1]).style.visibility = "visible";
    }
}

//莊家hit
let houseGetBtn = function () {


        house.getCard(house, cardsArr);
        house.printCards(house.handCard, "house");
        house.result(house.totalPoint, "house");


         house.judgeWhoWin(players);

};

//restart Btn
let restart = function () {
    // document.getElementById("open").style.visibility = "visible";
    document.getElementById("restart").style.visibility = "hidden";
    document.getElementById("showhouse").innerHTML = "";
    document.getElementById("imgshowhouse").innerHTML = "";
    house.totalPoint = [];
    house.handCard = [];
    cardsArr = cardsArr.concat(house.tempCardBox);
    house.tempCardBox = [];

    for (let i = 0; i < numOfPlayers; i++) {
        document.getElementById("show" + i).innerHTML = "";
        document.getElementById("result" + i).innerHTML = "";
        document.getElementById("imgshow" + i).innerHTML = "";
        document.getElementById("betValue" + i).innerHTML = "";
        players[i].handCard = [];
        players[i].totalPoint = [];
        players[i].bet = 0;
    }
    countDown = 2;
    openBtn();
};

let fiveCountDown = function () {

    document.getElementById("fiveSecond").style.visibility = "visible";
    document.getElementById('fiveSecond').innerHTML = "Bet Time:" + countDown;
    let x = setTimeout("fiveCountDown()", 1000);
    if (countDown === 0) {
        clearTimeout(x);
        houseStartBtn();
        document.getElementById("fiveSecond").style.visibility = "hidden";
    }
    countDown -= 1;
};