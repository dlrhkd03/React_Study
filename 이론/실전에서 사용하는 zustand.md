# zustand

## Store 생성

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { State } from "../types/types";

interface DiaryState {
  diaryList: State[];
  dataId: number;
  setDataId: (dataId: number) => void;
  onInit: (diaryList: State[]) => void;
  onCreate: (date: number, content: string, emotion: number) => void;
  onEdit: (
    targetId: number,
    date: number,
    content: string,
    emotion: number
  ) => void;
  onRemove: (targetId: number) => void;
}

export const diaryStore = create<DiaryState>()(
  devtools((set, get) => ({
    diaryList: [],
    dataId: 0,
    setDataId: (dataId) => set((state) => ({ dataId: dataId })),
    onInit: (diaryList) => set((state) => ({ diaryList: diaryList })),

    onCreate: (date, content, emotion) => {
      set((state) => ({
        diaryList: [
          ...state.diaryList,
          {
            id: state.dataId,
            date: new Date(date).getTime(),
            content,
            emotion,
          },
        ],
        dataId: state.dataId + 1,
      }));
      console.log("다이어리", get().diaryList);
      localStorage.setItem("diary", JSON.stringify(get().diaryList));
    },

    onEdit: (targetId, date, content, emotion) =>
      set((state) => ({
        diaryList: state.diaryList.map((it) =>
          it.id === targetId
            ? { id: targetId, date: new Date(date).getTime(), content, emotion }
            : it
        ),
      })),

    onRemove: (targetId) =>
      set((state) => ({
        diaryList: state.diaryList.filter((it) => it.id !== targetId),
      })),
  }))
);

// const diaryStore = devtools(store);

// export default diaryStore;
```

## 컴포넌트에서 사용

```javascript
/**
 * 기본적인 사용법
 */
const Home = () => {
  const diaryList = diaryStore((state) => state.diaryList);
};
```

```javascript
/**
 * 상태가 자주 변하는 경우 subscribe를 통해서 다시 렌더링하지 않고
 * 상태 부분에 바인딩 시키는 방법
 */
const Component = () => {
  // Fetch initial state
  const diaryList = useRef(diaryStore.getState().diaryList)
  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => diaryStore.subscribe(
    state => (diaryList.current = state.diaryList)
  ), [])
```
