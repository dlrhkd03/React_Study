# 리액트



## 리액트 특징

* 리액트나 뷰 같은 UI 라이브러리의 큰 특징은 화면에 출력되는 유저 인터페이스를 상태로 관히랄 수 있다는 점이다.

---

1. 리액티브

   * 기존 자바스크립트를 사용할 때 돔을 통해 애플리케이션을 렌더링한다면

   ~~~javascript
   let data = "Hello world";
   document.body.innerHTML = `<p>${data}</p>`;
   
   data = "안녕"; //이 곳에서 data 값을 변경해도 위 p태그의 값이 변경되지 않는다.
   
   //그래서 우리는 다시 이걸 그린다.
   document.body.innerHTML = `<p>${data}</p>`;
   ~~~

   * 위와 같이 데이터 준비, 엘리먼트 생성, 문서에 추가, 엘리먼트 텍스트에 데이터 설정을 하였지만, 데이터를 수정하면 데이터를 다시 엘리먼트에 반영하는 작업이 필요하다.
   * 상태만 관리함으로써 돔 API를 직접 호출하지 않고 UI까지 제어하도록 개선해보자

   ~~~javascript
   //VM (View Model)
   const state = {
     _data: "Hello world",
   }
   
   const render = () => document.body.innerHTML = `<p>${state.data}</p>`;
   
   //객체에 프로퍼티를 생성해주는 메서드
   Object.defineProperty(state, "data", {
     //getter와 setter 메서드 자동으로 호출됨
     get() {
       return state._data;
     },
     set(value) {
       state._data = value;
       render();
     }
   });
   
   render();
   
   //아래 프로퍼티를 수정하면 위 set 메서드가 실행되고, render가 실행되면서 get 메서드가 또 실행된다.
   state.data = "안녕";
   ~~~

   

2. 가상돔