# 리액트

## react-router-dom

라우터 라이브러리는 리액트가 SPA(SinglePage Application)를 할 수 있도록 도와준다.

> npm install react-router-dom localforage match-sorter sort-by

터미널에 라우터 라이브러리를 다운받는다.

`BrowserRoute`로 컴포넌트들을 감싸고 `Routes`로 `Route`들을 정의하고 `Link`컴포넌트를 통해 경로 변경 내용을 만든다.

```javascript
const App = () => {
  return (
    <BrowserRoute>
      <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/new"} element={<New />} />
        </Routes>

        <Link to={"/"}>HOME</Link>
      </div>
    </BrowserRoute>
  );
};
```

## 페이지 이동

- Path Variable - useParams
- Query String - useSearchParams
- Page Moving - useNavigate

### Path Variable

파라미터를 소스에서 설정한 대로 받아서 사용하는 방법이다.

`.../page/29`

```javascript
//부모 컴포넌트
<Route path="/page/:id" element={<Page />} />;

//자식 컴포넌트
//아래처럼 리액트 자체에서 제공하는 것이 아닌 훅을 커스텀 훅이라 한다.
const { id } = useParams();
```

### Query String

파라미터를 url에서 제공한 대로 받아서 사용하는 방법이다.

`.../page?id=40&mode=dark`

```javascript
//자식 컴포넌트
const [searchParams, setSearchParams] = useSearchParams();

const id = searchParams.id;
const mode = searchParams.mode;
```

### Page Moving

소스에서 정한 방법대로 페이지를 이동하는 방법이다.

```javascript
const navigate = useNavigate();

return (
  <button onClick={() => {navigate('/home')}}>HOME</button>
  <button onClick={() => {navigate(-1)}}>뒤로가기</button>
)
```
