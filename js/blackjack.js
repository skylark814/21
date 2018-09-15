let cardsArr = [];
let CARD_SET = 4;
let players = [];
let numOfPlayers = 0;
let hideBtn = [];
let countDown = 5;
let winImg = [];
let loseImg = [];
let pushImg = [];
let bjImg = [];

//img array to show win or lose
for (let i = 0; i < 5; i++) {
    winImg.push(document.createElement("img"));
    loseImg.push(document.createElement("img"));
    pushImg.push(document.createElement("img"));
    bjImg.push(document.createElement("img"));
}

for (let i = 0; i < 5; i++) {
    winImg[i].src = "picture/win.png";
    loseImg[i].src = "picture/lose.png";
    pushImg[i].src = "picture/push.png";
    bjImg[i].src = "picture/blackjack.png";

}
//choose how many players
let onChange = function () {
    numOfPlayers = document.getElementById("howMany").value;
    players = [];
    hideBtn = [];

    //players array
    for (let i = 0; i < numOfPlayers; i++) {
        players.push(Object.assign({}, player));
    }

    //the group of hide button
    for (let i = 0; i < numOfPlayers; i++) {
        hideBtn.push("hideBtn" + i);
    }

};
//player object
let player = {
    money: 100,
    bet: 0,
    handCard: [],
    totalPoint: 0

};

//create cardsArray
for (let i = 1; i <= 52 * CARD_SET; i++) {
    cardsArr.push(i);
}


//house object
let house = {
    money: 100,
    handCard: [],
    totalPoint: 0,
    tempCardBox: [],
    //print card
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
    //shuffle card
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
    //initial round
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
    //hit card
    getCard(players, cardsArr) {
        this.tempCardBox.push(cardsArr[0]);
        players.handCard.push(cardsArr[0]);
        players.totalPoint = house.count(players.handCard);
        cardsArr.shift(cardsArr[0]);

    },
    //calculate  point
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
    //show point after hit
    result(arr, num) {
        let tmp = Math.max(...arr);

        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] > 21) {
                arr.splice(i, 1);
            }
        }
        if (arr[0] === 21 || arr[1] === 21) {
            document.getElementById("show" + num).innerHTML = '21!' + "<br>";
            passBtn(num);
        }
        else if (arr.length === 2) {
            document.getElementById("show" + num).innerHTML = arr[1] + "<br>";
        }
        else if (arr.length === 1) {
            document.getElementById("show" + num).innerHTML = arr[0] + "<br>";
        }
        else if (arr.length === 0) {
            document.getElementById("show" + num).innerHTML = tmp + "<br>";
            document.getElementById("bomb" + num).style.opacity = 1;
            passBtn(num);
        }
    },
    //check if any player get blackjack
    blackJack(arr, num) {
        if (arr[1] === 21) {
            document.getElementById("show" + num).innerHTML = 'Black Jack!!!' + "<br>";

        }
        else {
            document.getElementById("show" + num).innerHTML = arr[1] + "<br>";
        }
    },
    //judge win or lose with house
    judgeWhoWin(players) {

        //house bust
        if (this.totalPoint.length === 0) {
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {
                //player get blackjack
                if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("show" + i).innerHTML = "";
                    document.getElementById("result" + i).appendChild(bjImg[i]);
                    players[i].money += 2.5 * players[i].bet;
                }

                else if (players[i].totalPoint.length > 0) {
                    document.getElementById("result" + i).appendChild(winImg[i]);
                    players[i].money += 2 * players[i].bet;
                }
                else {
                    document.getElementById("result" + i).appendChild(loseImg[i]);
                    document.getElementById("bomb" + i).style.opacity = 0;

                }
            }
        }

        //house get blackjack
        else if (this.handCard.length === 2 && this.totalPoint[1] === 21) {
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {
                //player get blackjack
                if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("show" + i).innerHTML = "";
                    document.getElementById("result" + i).appendChild(bjImg[i]);
                    players[i].money += 2.5 * players[i].bet;
                }
                else {
                    document.getElementById("bomb" + i).style.opacity = 0;
                    document.getElementById("result" + i).appendChild(loseImg[i]);
                }
            }
        }
        //house's point large than 17
        else if (Math.max(...this.totalPoint) >= 17) {
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("househit").style.visibility = "hidden";
            for (let i = 0; i < numOfPlayers; i++) {

                //player bust
                if (players[i].totalPoint.length === 0) {
                    document.getElementById("bomb" + i).style.opacity = 0;
                    document.getElementById("result" + i).appendChild(loseImg[i]);
                }
                //player get blackjack
                else if (players[i].handCard.length === 2 && players[i].totalPoint[1] === 21) {
                    document.getElementById("show" + i).innerHTML = "";
                    document.getElementById("result" + i).appendChild(bjImg[i]);
                    players[i].money += 2.5 * players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) > Math.max(...this.totalPoint)) {
                    document.getElementById("result" + i).appendChild(winImg[i]);
                    players[i].money += 2 * players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) === Math.max(...this.totalPoint)) {
                    document.getElementById("result" + i).appendChild(pushImg[i]);
                    players[i].money += players[i].bet;
                }
                else if (Math.max(...players[i].totalPoint) < Math.max(...this.totalPoint)) {
                    document.getElementById("bomb" + i).style.opacity = 0;
                    document.getElementById("result" + i).appendChild(loseImg[i]);
                }
            }

        }


    },
    // bet money button
    betmoney(e, i, playermoney) {
        let moneyMax = 50;
        let moneyMin = 10;
        x = parseInt(document.getElementById("bet" + i).innerText);
        if (playermoney <= 0) {
            alert("You have no money!!!");

        }
        else {
            if (e === 1) {
                x += 10;
                if (x >= moneyMax || x >= playermoney) {
                    document.getElementById("bet" + i).innerText = Math.min(moneyMax, playermoney);
                }
                else {
                    document.getElementById("bet" + i).innerText = x;

                }
            }
            else {
                x -= 10;
                if (x <= moneyMin) {
                    document.getElementById("bet" + i).innerText = moneyMin;
                }
                else {
                    document.getElementById("bet" + i).innerText = x;

                }

            }
        }

    }


};
// opening >>> bet money >>> player hit or stand >>> house hit >>> win or lose >>> restart


//opening check howmany players and count down for bet
function openBtn() {
    if (numOfPlayers === 0) {
        alert("Please choose how many person want to play!!");
    }
    else {
        for (let i = 0; i < numOfPlayers; i++) {
            document.getElementById("moneyInput" + i).style.visibility = "visible";
            document.getElementById("betValue" + i).innerHTML = "Total:" + players[i].money;
            document.getElementById("bet" + i).innerText = 10;

        }
        document.getElementById("open").style.visibility = "hidden";
        document.getElementById("howMany").style.visibility = "hidden";
        fiveCountDown();
    }
}


//house start
let houseStartBtn = function () {
    house.shuffleCards(cardsArr);
    house.initialRound(players, cardsArr);

    for (let i = 0; i < numOfPlayers; i++) {
        players[i].bet = parseInt(document.getElementById("bet" + i).innerText);
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
//player hit
let getCardBtn = function (num) {
    house.getCard(players[num], cardsArr);
    house.printCards(players[num].handCard, num);
    house.result(players[num].totalPoint, num);
};

//player stand
function passBtn(num) {
    if (num === numOfPlayers - 1) {
        document.getElementById(hideBtn[num]).style.visibility = "hidden";
        document.getElementById("househit").style.visibility = "visible";
    }
    else if (num === "house") {
        document.getElementById("restart").style.visibility = "visible";
    }
    else {
        document.getElementById(hideBtn[num]).style.visibility = "hidden";
        document.getElementById(hideBtn[num + 1]).style.visibility = "visible";
    }
}

//house hit
let houseGetBtn = function () {
    house.getCard(house, cardsArr);
    house.printCards(house.handCard, "house");
    house.result(house.totalPoint, "house");
    house.judgeWhoWin(players);
};

//restart Btn
let restart = function () {

    document.getElementById("restart").style.visibility = "hidden";
    document.getElementById("showhouse").innerHTML = "";
    document.getElementById("imgshowhouse").innerHTML = "";
    document.getElementById("bombhouse").style.opacity = 0;
    house.totalPoint = [];
    house.handCard = [];
    cardsArr = cardsArr.concat(house.tempCardBox);
    house.tempCardBox = [];

    for (let i = 0; i < numOfPlayers; i++) {
        document.getElementById("show" + i).innerHTML = "";
        document.getElementById("result" + i).innerHTML = "";
        document.getElementById("imgshow" + i).innerHTML = "";
        document.getElementById("betValue" + i).innerHTML = "";
        document.getElementById("bomb" + i).style.opacity = 0;
        document.getElementById("bet"+i).innerHTML = 10;
        players[i].handCard = [];
        players[i].totalPoint = [];
        players[i].bet = 0;
    }
    countDown = 5;
    openBtn();
};
// 5 seconds count down and than start
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