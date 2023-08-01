# JS 부족했던 문법

## 객체 리터럴

```Javascript
const 객체 = {
    속성이름: 속성값,
    속성이름2: 속성값2,
}
```

문자열이라 생각하며 접근하는 방법이 두 가지다.

1. 객체.속성이름;

2. 객체['속성이름'];
   
* 특수문자나 숫자가 들어가있는 경우 대괄호로 접근, 아니면 기본방식으로 접근
* 없는 속성에 접근시 undefined
* delete로 객체 내부를 삭제할 수 있다.

## 함수와 배열은 객체이다.

```Javascript
    function hello() {}
    hello.a = 'hi';

    const array = [];
    array.b = 'baba';

    console.log(hello.a); // hi
    console.log(array.b); // baba
```

위 처럼 함수와 배열에서 속성을 넣을 수 있는 것처럼 객체의 성질을 모두 다 사용할 수 있다.


## 배열 반복문 forEach, map, fill

```Javascript
    const answer = [3, 1, 2, 5];

    answer.forEach((element, index) => {

    });

    answer.map((element, index) => {
        return element * 2;
    });

    //예시
    const arr = Array(9).fill(0).map((el, idx) => {
        return idx + 1;
    }); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 배열 정렬

```Javascript
    array = [1, 2, 4, 6, 8, 5, 3, 7, 9, 10];

    array.slice() // => 똑같은 배열이 나옴 (본인을 변경하는 함수 사용시 새로 만들기 편함)

    const array2 = array.slice().sort((a, b) => a - b); // 오름차순
    const array3 = array.slice().sort((a, b) => b - a); // 내림차순
```

## 유사배열

```Javascript
    document.querySelector('table').children // children은 배열이지만 배열이 아니다.
```
`Array.from(유사배열)` 사용시 배열로 변경해준다.


## 스코프

var와 let의 큰 차이로 var는 함수 스코프이고 let은 블록 스코프이다.

```Javascript

    //함수임
    function () {
        var a = 1;
    }
    console.log(a); // undefined

    //함수가 아님
    if (true) {
        var b = 1;
    }
    console.log(b); // 1

    //함수가 아님
    for (var i = 0; i < 5; i++) {}
    console.log(i); // 5
```

var는 함수 스코프이기 때문에 var를 사용하지 않고 let을 사용하는 것이 옳은 방향이다.

## 이벤트 버블링
```HTML
    <body>
        <table onClcik=...>
            <tr>
                <td></td>
            </tr>
        </table>
    </body>
```
`td`를 클릭시 이벤트는 `td`, `tr`, `table`, `body` 모두 이벤트가 발생한다. 

```Javascript
    event.target; // td
    event.currentTarget; // table
```
이벤트 캡쳐링도 있는데, 보통은 사용하지 않는다.

>사용하는 부분은 팝업이 생겼을 때 바깥 부분 클릭시 팝업 닫게하고 싶을 때 부모에서 일어난 이벤트를 자식에게 이벤트 줄 때 사용한다.
## 이벤트 막기

```Javascript
    event.preventDefault(); //태그의 기본동작 막기
    event.stopPropagation(); //이벤트 버블링 막기
```


## 깊은 복사, 얕은 복사

깊은 복사는 배열, 배열 내 객체 또한 복사한다면, 얕은 복사는 배열, 배열 내 원시 값만 복사한다.

```Javascript
    const a = [];
    const b = 'he'; //원시 값
    const c = {};

    const arr = [a, b, c];

    //깊은 복사
    const m1 = JSON.parse(JSON.stringify(arr[0])); // JSON 깊은 복사는 성능 안좋음

    //얕은 복사
    const m2 = arr[0];
    
    //얕은 복사( ... )
    const m3 = { ...arr[0] };   //객체 얕은 복사
    const arr2 = [...arr];      //배열 얕은 복사
```

## this


`this`는 기본적으로 `window`이다. `this`가 `window`가 아닌 경우만 확인하자

```Javascript
    //객체 안에 this
    const a = {
        name: "1",
        h: 10,
        c: '',
        fn1() {
            this.name; // 1
        },
        fn2: () => {
            this.name; // 화살표 함수인 경우 this는 브라우저에서 window임
        }
    }


    //생성자의 경우

```

## 화살표 함수와 this

```Javascript
    class game {
        constructor(name, hp) {
            this.name = name;
            this.hp = hp;
        }

        // start1의 this와 addEventListener 안에 있는 this는 다르다.
        start1() {
            console.log(this); //game

            $gameMenu.addEventListener('submit', function(event) {
                //addEvetnListener의 this는 예외적으로 객체가 된다. 
                cosnole.log(this); // $gameMenu
            })
        }

        // start2 의 this를 쓰기 위해 변수를 선언하지만 화살표 함수로 변경하면 간단해진다.
        start2() {
            console.log(this);
            const _this = this; //game

            // function() {} 안에 this는 자기만의 this를 가진다.
            $gameMenu.addEventListener('submit', function(event) {
                console.log(_this); //game
            })
        }

        //화살표 함수 안에서 this와 start3 메서드안에 this와 같아진다.
        start3() {
            console.log(this); //game

            $gameMenu.addEventListener('submit', (event) => {
                console.log(this); //game
            })
        }
    }
```