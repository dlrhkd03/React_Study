# msw

api가 개발되지 않았을 때 상상 코딩으로 하지 않고 다른 방법을 찾는 나를 찾으며 msw를 접했다.

대부분 블로그에서는 최신 버전이 아닌 낮은 버전을 쓰기에 많은 시행착오를 거치며 msw 사용법을 정리한다.

## msw 1 버전

handler.js를 사용할 때 rest를 사용하는 모습을 본다.

최신 버전을 다운받고 rest에서 오류나는 당신... 최신 버전으로 올려보자

## msw 2 버전

1. msw 디펜던시 다운

   > npm install msw --save-dev

2. msw 필요 js 생성?
   > npx msw init ./public --save

public 밑에 mockServiceWorker.js 파일 생성 확인

3. mocks 폴더

   src 밑에 mocks 폴더를 만들고 handlers.js와 worker.js 를 만든다.

   handlers에 원하는 mock http 내용을 생성한다.

   ```javascript
   //handlers.js

   import { http, HttpResponse } from "msw";

   export const handler = [
     http.get("/user", () => {
       return HttpREsponse.json({ name: "팡떡", statue: "성공" });
     }),
   ];
   ```

   ```javascript
   //worker.js

   import { handlers } from "./handlers";
   import { setupWorker } from "msw/browser";

   export const worker = setupWorker(...handlers);
   ```

4. index.js에 worker 시작 내용 생성

   ```javascript

   if (process.env.NODE_ENV === "development") {
    const {worker} = require("./mocks/worker");
    worker.start();
   }

   const root = Re...
   ```
