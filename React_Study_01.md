# React

## MVC

- 디자인 패턴
  - Model
    - 데이터 관리하는 역할, 데이터를 가져와 어플리케이션에서 사용할 수 있는 모양으로 만듦
  - View
    - 사용자가 볼 수 있는 화면 관리하는 역할, 데이터를 돔에 출력 및 이벤트 처리기능 수행
  - Controller
    - 역할에 따라 격리되어 있는 모델과 뷰를 연결하고 움직이는 주체

---

## 리액티브

VM을 이용해서 Controller 역할을 View Model에 조금 넘김

상태 관리만 하는 코드를 넣음으로서 코드 간략화

## 가상돔

데이터만 관리하면 값의 변화가 UI가 반영되는 것이 장점이다. 코드 간략화

돔 제어는 필수적이다. 그러나 너무 자주 호출되면 성능에 영향을 준다. 그래서 매번 DOM에 접근하지 않고 필요할 때만 접근하는 방식으로 성능을 개선시킨다.

돔은 트리 자료구조로 이루어져있기 때문에 가상돔과 비교하는 것은 무거운 계산을 요구한다. 리액트는 계산 복잡도를 줄이기 위해 몇 제약사항을 두었다.

- 리스트의 경우 key 속성을 사용해서 변화된 내용에 대해서만 리스트를 없애고 생성한다.

## React DOM

```javascript
React.createElement("h1", null, "Hello world");
```

리액트가 만든 가상돔은 일반 객체이다. 그렇기 때문에 브라우저만에서 사용하지 않고 어디서든 사용할 수 있다.

가상돔으로 DOM을 생성하고자 한다면, reactDOM 라이브러리를 사용해서 DOM을 만들어주는 것이다. 즉, react + reactDOM을 사용하는 것이다.

```html
<body>
  react 최상위 API
  <script
    crossorigin
    src="https://unpkg.com/react@17/umd/react.development.js"
  ></script>

  react DOM API
  <script
    crossorigin
    src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  ></script>

  babel 라이브러리 ES6와 오래된 브라우저 지원
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</body>
```

## babel API

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

ES6도 사용할 수 없고, babel API도 사용할 수 없다면 class 문법을 사용할 수 없다.

그 경우에 create-react-class 모듈을 사용할 수 있다.

```javascript
var crateReactClass = require("create-react-class");
var Greeting = createReactClass({
  render: function () {
    return <h1>Hello, {this.props.name}</h1>;
  },
});
```

ES6없이 React를 사용할 수 있다는 뜻이지만, 한계를 많이 느낀다. 리액트 컴포넌트는 클래스 문법을 사용하는 것이 보다 편하고, 최신 자바스크립트를 사용할 때, JSX 문법을 사용할 때에도 바벨이 필요하다.

보통은 이러한 환경을 구성할 때 터미널 명령어를 실행하거나 웹팩같은 번들러로 통합해서 사용한다.

```html
babel 라이브러리는 스크립트 안에 type이 text/babel로 되어있는 부분을 바꿔준다
<script type="text/babel">
  const element = React.createElement("h1", null, "Hello world");
  ReactDOM.render(element, document.querySelector("#app"));
</script>
```

## 템플릿 언어

엘리먼트를 생성할 때 `document.createElement()` 함수를 사용한다.

```javascript
const h1 = document.createElement("h1");
const header = document.createElement("header");
header.appendChild(h1);
```

트리 형태의 웹 문서 구조상 부모 자식 관계를 알기 어려운 코드가 나온다.

그래서 대안으로 나오는 것이 템플릿 언어이다.

그러나 리액트 자체는 템플릿 언어를 지원하지 않는다.

```javascript
const h1 = React.createElement("h1", null, "Hello world");
const header = React.createElement("header", null, h1);
```

## JSX

JSX(JavaScript XML)는 자바스크립트의 확장 문법이다. 바벨을 이용하면, XML을 리액트에서 사용하는 함수 호출로 대체된다.

```javascript
<h1>Hello world</h1>
// => React.createElement('h1', null, 'Hello world');
```

- index.html

  ```html
  <div id="app"></div>
  <script
    type="text/babel"
    data-presets="react"
    data-type="module"
    src="js/main.js"
  ></script>
  ```

- main.js

  ```javascript
  const element = (
    <>
      <header>
        <h2 className="container">검색</h2>
      </header>
      <div className="container">
        <form>
          <input type="text" placeholder="검색어를 입력하세요" autoFocus />
          <button type="reset" className="btn-reset"></button>
        </form>
      </div>
    </>
  );

  ReactDOM.render(element, document.querySelector("#app"));
  ```

## 리액트 컴포넌트

### 리액트 컴포넌트 생명주기

- 컴포넌트 상태 등 초기화 작업을 완료하면 컴포넌트 객체가 생성된다(constructor)
- 그리고 리액트 엘리먼트를 이용해 가상돔을 그리고 이걸 실제 돔에 반영한다(render)
- 돔에 반영되는 것을 마운트 된다라고 표현하는데 마운트가 완료되면(componentDidMount 메서드가 발생) 이벤트를 바인딩하거나 외부 데이터를 가져오는 등 작업을 수행한다.
- 컴포넌트가 사라지기 전에 즉 마운트 직전에는(componentWillUnmount) 이벤트 핸들러를 제거하는 등 리소스를 작업을 한다.
- 마지막으로 컴포넌트는 본인의 삶을 마감하는 순서를 따른다.

위와 다르게 리액트 컴포넌트 형태로 만들어보자

```javascript
class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form>
            <input type="text" placeholder="검색어를 입력하세요" autoFocus />
            <button type="reset" className="btn-reset"></button>
          </form>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
```

## state

리액트 컴포넌트 구성요소 중 state는 컴포넌트의 상태를 저장하기 위한 용도이다. 브라우저가 관리하던 것들을 리액트가 관리하도록 수정할 것이다.

```javascript
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
    };
  }

  //setState 메서드는 비동기식으로 일어나기 때문에 마지막에서 state 값이 변경된다. 즉, 변경된 값을 바로 읽기 위해선 callback 함수를 지정해주어야 한다.
  handleReset() {
    this.setState(
      () => {
        //변경함수
        return { searchKeyword: "" };
      },
      () => {
        //callback 함수
        console.log(this.state.searchKeyword);
      }
    );
  }
  render() {
    return (
      <>
        <form
          onSubmit={(event) => this.handleSubmit(event)}
          onReset={() => this.handleReset()}
        >
          <input type="text" />
          <button type="reset"></button>
        </form>
      </>
    );
  }
}
```

## 제어 컴포넌트

그러나 현재 상태에서는 `input` 오브젝트가 값만 가지고있고, 이벤트는 아직 브라우저가 관리한다. 이벤트들을 리액트가 관리하도록 수정하자.

```javascript
class App extends React.Component {
    constructor() {
        super();

        //클래스로 제공하는 리액트 컴포넌트는 상태 관리를 위한 내부 변수  state를 가지고 있다.
        //input 엘리먼트 자체의 상태를 관리하지 않고, 리액트 컴포넌트가 관리하는 state 상태 관리 메서드인 setState()를 통해 관리한다. => 제어 컴포넌트
        this.state = {
            searchKeyword: "",
        }
    }

    handleChangeInput(event) {
        this.setState({
            searchKeyword: event.target.value,
        })
    }
    render() {
        return (
            ...

            <input
                type="text"
                value={this.state.searchKeyword}
    />
                onChange={this.handleChangeInput(event => this.handleChangeInput(event))}
        )
    }
}
```

## 조건부 렌더링

- 엘리먼트 변수
- 상항 연산자
- && 연산자

### 엘리먼트 변수

오브젝트을 보여주는 방식 중 엘리먼트 변수를 통한 방법이다.

리액트에서는 렌더링 메서드 안에 null을 무시하기 때문에 사용할 수 있는 방법이다.

```javascript
render() {
    let resetButton = null;

    if (this.state.searchKeyword.length > 0) {
        resetButton = <button type="reset" className="btn-reset"></button>;
    }

    return (
    	<>
        	...
        	{resetButton}
        </>
    )
}
```

위 내용은 `input` 에 입력을 했을 때 `resetButton`이 생기도록 하는 로직이다. 더 위에서 만든 내용으로 인해 `state`가 변경되고, `render`함수가 호출된다.

1. `input` 데이터 입력
2. `value` 변경
3. onChange 이벤트 발생 및 `handleChangeInput` 함수 호출
4. `handleChangeInput` 함수에서 `setState` 함수 호출
5. `state` 변경으로 인한 `render`함수 호출

### 삼항연산자

변수 사용없이 상항연산자도 할 수 있다.

```javascript
render() {

    return (
        <>
        	...
        	{this.state.searchKeyword.length > 0 ? (
             	<button type="reset" className="btn-reset"></button>
             ) : null}
        </>
    )
}
```

### &&연산자

`&&` 연산자가 앞에 조건이 참이 아니면 뒤 조건을 실행시키지 않는 일을 이용한 방법이다.

```javascript
render() {
    return (
    	<>
        	...
        	{this.state.searchKeyword.length > 0 && (
             	<button type="reset" className="btn-reset"></button>
             )}
        </>
    )
}
```

### import, require 차이

노드에서는 `const react = require('react')`

리액트에서는 `import React from 'react'`

노드는 `require`을 써야하고, 리액트에서는 `babel`이 `import`를 `require`로 바꿔줌

```javascript
class comp1 extends Component {}

export const hel = "hello"; // import { hello }
export const bye = "bye"; // import { bye }

export default comp1; // import comp1
```
