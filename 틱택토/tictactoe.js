'use strict';

let 바디 = document.body;
let 테이블 = document.createElement('table');
let 줄들 = [];
let 칸들 = [];
let 턴 = 'X';
let 결과 = document.createElement('div');

function 체크(몇줄, 몇칸) {
    // 세칸 다 채워졌나?
    let 승리여부 = false;
    //가로
    if (칸들[몇줄][0].textContent === 턴 && 칸들[몇줄][1].textContent === 턴 && 칸들[몇줄][2].textContent === 턴) {
        승리여부 = true;
    }
    //세로
    if (칸들[0][몇칸].textContent === 턴 && 칸들[1][몇칸].textContent === 턴 && 칸들[2][몇칸].textContent === 턴) {
        승리여부 = true;
    }
    //대각선

    if (칸들[0][0].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][2].textContent === 턴) {
        승리여부 = true;
    }
    if (칸들[0][2].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][0].textContent === 턴) {
        승리여부 = true;
    }
    return 승리여부;
}

function 초기화(무승부) {
    if (무승부) {
        결과.textContent = '무승부';
    } else {
        결과.textContent = 턴 + ' 승리 !';
    }
    setTimeout(function () {
        결과.textContent = '';
        턴 = 'X';
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                칸.textContent = '';
            });
        });
    }, 1000);

}

let 비동기콜백 = function (이벤트) {
    if (턴 === 'O') {
        return; //컴퓨터의 턴일 때 유저가 클릭하지 않도록
    }
    let 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    console.log('몇줄', 몇줄);
    let 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    console.log('몇칸', 몇칸);

    if (칸들[몇줄][몇칸].textContent === '') { //칸이 비워져 있을 때
        console.log('빈칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;
        let 승리여부 = 체크(몇줄, 몇칸);
        //모든 칸이 다 찼는 지 검사
        let 후보칸 = [];
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (칸) { return !칸.textContent });
        // 다 찼으면
        if (승리여부) {
            초기화(false);
        } else if (후보칸.length === 0) {
            초기화(true);
        } else {
            턴 = 'O'

            //컴퓨터 차례
            setTimeout(function () {
                console.log('컴퓨터의 턴입니다.');
                //빈칸 중 하나 고름
                let 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 'O';
                //컴퓨터가 승리했는지 체크
                let 승리여부 = 체크(몇줄, 몇칸);
                if (승리여부) {
                    초기화();
                }
                //턴을 넘김
                턴 = 'X';
            }, 1000);
        }
    } else {
        console.log('빈칸이 아닙니다');
    }

};

for (let i = 1; i <= 3; i++) {
    let 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for (let j = 1; j <= 3; j++) {
        let 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i - 1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
console.log(줄들, 칸들);
