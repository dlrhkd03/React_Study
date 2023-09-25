# 리액트

## API 호출하기

```javascript
const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments").then(
    (res) => {
      return res.json();
    }
  );
};
```

## useEffect

컴포넌트 Mount, UnMount, 오브젝트 변화를 감지하는 함수

```javascript
//컴포넌트가 처음 렌더링 되는 순간
useEffect(() => {
  console.log("Mount!");

  //컴포넌트가 Unmount 되는 순간
  return () => {
    console.log("Unmount!");
  };
}, []);

//컴포넌트가 업데이트 되는 순간
useEffect(() => {
  console.log("Update");
});

//특정 Object가 변경되는 순간
useEffect(() => {
  console.log(`count is update : ${count}`);
}, [count]);
```

## React.memo

자식 컴포넌트가 변할 때 부모 컴포넌트를 건드리고 변하지 않아도 될 자식 컴포넌트들 모두 건드리는 경우

```javascript
//React.memo를 이용해서 count가 변하지 않는 경우 컴포넌트 렌더링이 일어나지 않도록 설정
const CountComponent = React.memo(({count}) => {
  return <div>{count}</div>
});

//React.memo를 이용해서 count가 변하지 않는 경우 컴포넌트 렌더링이 일어나지 않도록 설정
const TextComponent = React.memo(({text}) => {
  return <div>{text}</div>
});

const Component = () => {

  return (
    <CountComponent count={count} />
    <TextComponent text={text} />
  )
}

```

비교 대상이 object인 경우 얕은 비교를 하기 때문에 비교를 하는 함수를 따로 설정해줘야한다.

```javascript
const CounterB = ({ obj }) => {
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }

  return false;
};
export default React.memo(CounterB, areEqual);
```

```javascript
const Component = () => {
  return <CounterB obj={obj} />;
};
```

## useCallback

부모에서 자식 컴포넌트한테 함수를 전달하는 경우 위 `React.memo`로는 비교를 통해서 필요없는 렌더링을 없앨 수 없다.

```javascript
const App = () => {
  const [text, setText] = useState('');
  const onCreate = () => {
    ...
    setData([newItem, ...data]);
  }

  return (
    <div>
      <ComponentA onCreate={onCreate} />
      <ComponentB text={text}/>
    </div>
   );
}
```

위의 경우 `text` 변경시 부모 컴포넌트가 재 생성되고, `onCreate`함수가 다시 만들어지면서 `ComponentA`가 재 생성된다.

불필요한 렌더링이 일어나기 때문에 이걸 없애고자 한다.

```javascript
const App = () => {
  const [text, setText] = useState('');

  //컴포넌트가 마운트 될 때 한번만 함수를 생성시키는 방법
  const onCreate = useCallback(() => {
    ...

    //useCallback을 쓸 때 useState에서 사용한 상태인 현재 상태 내용을 모르기 때문에 함수형을 업데이트를 통해 현재 상태를 같이 전달해줘야한다.
    //setData([newItem, ...data]);
    setData((data) => [newItem, ...data]);
  }, [])

  return (
    <div>
      <ComponentA onCreate={onCreate} />
      <ComponentB text={text}/>
    </div>
   );
}
```
