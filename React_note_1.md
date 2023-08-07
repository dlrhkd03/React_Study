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
//{count}가 값이 같다면 리렌더링이 일어나지 않는다! 이 때 같은지 비교하는 방법은 얕은비교
const CounterA = React.memo(({ count }) => {
  //렌더링 됐는지 확인
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });

  return <div>{count}</div>;
});

//아래의 경우 obj의 얖은 비교로 인해 React.memo가 제대로 일어나지 않는다.
const CounterB = React.memo(({ obj }) => {
  return <div>{obj.count}</div>;
});

//객체의 깊은 비교를 위해 개발자가 건드리는 방법
const CounterC = ({ obj }) => {
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.count === nextProps.count;
};

const MemoizedCountB = React.memo(CounterC, areEqual);
```

독립적인 자식 컴포넌트1과 2가 있을 때 2가 렌더링 되면서 부모 컴포넌트를 렌더링 시키고, 부모 컴포넌트가 렌더링되면서 자식 컴포넌트1이 렌더링 될 필요가 없음에도 렌더링이 되는 모습을 볼 수 있다.

그래서 우리는 `useMemo`로 연산이 계속 안되도록 하는 방법도 사용하였고, `React.memo`로 `props`로 넘어가는 객체를 비교하면서 리렌더가 안일어나도록 하는 방법도 사용하였다.

그러나 `useMemo`로는 컴포넌트 객체에 사용할 수 없고, `React.memo`로는 `props`가 함수인 경우에 사용할 수 없었다.

`useCallback`을 이용해서 컴포넌트 리렌더를 막아보자.

아래와 같은 부모컴포넌트와 자식 컴포넌트 둘이 있을 때, 2번 자식으로인해 부모 컴포넌트가 변하고 1번 컴포넌트가 리렌더링이 된다고 생각해보자.

```javascript
const ParentComponent = () => {
  const [data, setData] = useState([]);

  const onCreate = (a, b, c) => {
    ...
    const newData = {
      keyA: a,
      keyB: b,
      keyC: c
    };

    setData([newData, ...data]);
  }

  return (
    <ChildComponent1 onCreate={onCreate} />
    <ChildComponent2 dataList={data} />
  )
}
```

위의 경우 `onCreate`함수가 부모 컴포넌트가 리렌더링 되면서 다시 호출된다는 건데, 그럼에 따라 자식 컴포넌트1이 리렌더링이 된다. 즉, `onCreate`함수만 최적화를 시켜주면 된다는 것이다.

- `useCallback`은 컴포넌트가 만들어지는 `Mount`과정에서 한 번 이루어지고 다음 조건에 충족할 때 까지 재사용한다는 것이다.

```javascript
const ParentComponent = () => {
  const [data, setData] = useState([]);

  const onCreate = useCallback(
    (a, b, c) => {
    ...
    const newData = {
      keyA: a,
      keyB: b,
      keyC: c
    };

    //아래와 같이 setData에 함수를 넣어준 이유는, 처음 부모가 렌더링 됐을 때 data는 빈 배열이다. 그 후 여기서는 없지만, getData를 통해 서버에 저장된 데이터를 받아오는데, 그 때의 data는 현재 onCreate 함수에 없기 때문에 data를 props로 던져주어서 새로운 data를 가지고 있도록 설정한 것이다.
    setData((data) => [newData, ...data]);
  }, []);

  return (
    <ChildComponent1 onCreate={onCreate} />
    <ChildComponent2 dataList={data} />
  )
}
```

컴포넌트 중에 List가 있고, List의 Item이 들어있는 컴포넌트가 있다. 필자는 Item이 수정되거나 삭제가 되기 때문에 관련 메서드를 부모 컴포넌트로부터 `props`로 내려받는다.

아래 처럼 List에 자식 컴포넌트로 Item 컴포넌트가 있는데, 수정이 되거나 삭제가 되면, Item이 리렌더리이 되고, 모든 아이템들이 다 리렌더링이 된다.

```javascript
const Item = ({ a, b, c, onUpdate, onRemove }) => {
  useEffect(() => {
    console.log(`${a}번 째 아이템 렌더링`);
  });

  const handleUpdate = () => {
    onUpdate(data);
  };

  const handleRemove = () => {
    onRemove(data);
  };

  return (
    <div>
      <div>~~~</div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default Item;
```

이렇게 됐을 때 부모의 `onUpdate`, `onRemove` 함수를 수정해야한다.

```javascript
const onRemove = (id) => {
  const newData = data.filter((el) => {
    return el.id !== id;
  });
  console.log(`${id}가 삭제되었습니다.`);
  setData(newData);
};

//======>

//onRemove를 정의한 상위 부모 컴포넌트에서 useCallback 수정
const onRemove = useCallback((id) => {
  console.log(`${id}가 삭제되었습니다.`);
  setData((data) => {
    return data.filter((el) => {
      return el.id !== id;
    });
  });
}, []);

//onRemove를 받아서 쓰는 자식 컴포넌트에는 React.memo를 쓰는 것을 표기
export default React.memo(Item);
```
