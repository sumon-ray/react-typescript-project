import { decrement, increment } from "./features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { Button } from "./components/ui/button";

const App = () => {
  const dispatch = useAppDispatch()
const {count} = useAppSelector((state)=>state.counter)

  const handleDecriment = ()=>{
    dispatch(decrement())
  }
  return (
    <div>
      <h1>Counter</h1>
      <Button onClick={()=> dispatch(increment(5))}>Increment</Button>
      <Button onClick={()=> dispatch(increment(1))}>Increment</Button>
      <div className="">{count}</div>
      <Button onClick={handleDecriment}>Decrement</Button>
    </div>
  );
};

export default App;