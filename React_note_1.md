# 리액트

## 단방향 데이터 전달

리액트의 컴포넌트들은 트리 형태로 이어져있다.

ㅡㅡApp.jsㅡㅡ
| |
| |
Editor.js DataList.js

부모 컴포넌트가 기준이 되고 자식 컴포넌트들은 데이터를 사용하거나 수정하기 위해서는 옆에 보이는 자식 컴포넌트에서 바로 보는게 아닌 부모를 이용해서 데이터가 움직이게 된다.

```javascript
  function App() {
    const [data, setData] = useState([]);

    const onCreate = (a, b, c) => {
      ...
    }

    return (
      <>
        <Editor onCreate={onCreate}/>
        <DataList dataList={data}/>
      </>
    )
  }
```

위 처럼 DataList.js에 있는 데이터를 수정하기 위해서는 기존에 있던 state를 부모로 올리고, 데이터를 관리한다.
Editor의 경우 데이터를 수정하는 함수를 부모 컴포넌트에서 받아서 사용하고,
DataList의 경우 부모 컴포넌트에서 수정된 데이터를 받아서 사용한다.

## Lifecycle

- 탄생 => 변화 => 죽음
- 화면에 나타나는 것 => 업데이트 => 화면에서 사라짐
- Mount => Update => UnMount
- 초기화 작업 => 예외 처리 작업 => 메모리 정리 작업

리액트에선...

클래스형 컴포넌트의 경우 메서드를 지원함

`ComponentDidMount` => `ComponentDidUpdate` => `ComponentWillUnmount`

함수형 컴포넌트의 경우는 이러한 메서드를 지원하지 않고, 상태 관리 또한 지원하지 않는다.

하지만 우리는 함수형 컴포넌트에서 다른 방식으로 사용하고 있다.

## React Hooks

클래스형 컴포넌트에서는 지원하지만, 함수형 컴포넌트에서 지원하지 않는 메서드들을 낚아채서(Hook) 사용하는 방법이다.

- React Hooks
  - `useState`
  - `useEffect`
  - `useRef`

> 클래스형 컴포넌트의 길어지는 문제, 중복 코드, 가독성 문제 등 해결하기 위해 React Hooks를 지원한다.

```javascript
import React, { useState, useEffect, useRef } from "react";

const Compo = () => {
  //useState 사용법
  const [data, setData] = useState(0); //초기화

  const handleFunc = () => {
    console.log(data);

    setData(10);
  };

  //useRef 사용법
  const contentInput = useRef();

  return <input ref={contentInput} />;

  //useEffect 사용법

  //Mount 화면에 나타남
  useEffect(() => {}, []);

  //Update 수정됨
  useEffect(() => {}); //컴포넌트에 대한 Update
  useEffect(() => {}, [data]); //data 객체에 대한 Update

  //UnMount 화면에서 사라짐
  //useEffect 내부에서 return시 UnMount 상태임
  useEffect(() => {
    return () => {
      console.log("Unmount");
    };
  }, []);
};
```

## API 호출

```javascript
const getDate = async () => {
  const res = await fetch("https://...").then((res) => {
    return res.json();
  });
};
```

## 메모리 낭비 최적화

API로 가져오는 데이터들이 계속 변할 때 어느 컴포넌트가 렌더링이 되는 경우 어떤 조건에서는 렌더링이 될 필요가 없을 때가 있다.

어떠한 데이터가 변할 때만 데이터가 변하도록 설정하는 `useMemo`

```javascript
  //useMemo 메모제이션 이용해서 연산 최적화(반복 연산 못하도록)
  const getData = useMemo(() => {
    ...
    return { data.a ,data.b, data.c};
  }, [data.length]); //무엇이 변할 때 이 연산을 할지 설정하는 함수라 생각하면 된다.

  const { a, b, c } = getData;
```

부모 컴포넌트가 렌더링되면, 자식 컴포넌트는 모두 렌더링이 된다.

자식 컴포넌트1이 렌더링 될 때, 부모 컴포넌트가 렌더링 되지만 1과 관련없는 자식 컴포넌트2가 렌더링 된다면 메모리 낭비가 된다.

함수형 컴포넌트에게 업데이트(렌더링)되는 조건 `memo`

```javascript

```
