import Calendar from './components/Calendar';

function App() {
  // 튜터가 해당 시간대의 강의를 등록
  const createNewLectures = () => {
    return;
  };
  // 튜터가 해당 시간대의 강의를 취소
  const deleteLecture = () => {
    return;
  };
  ////dddd
  return (
    <div className='App'>
      <div>
        <button>next</button>
        <button>previous</button>
      </div>
      <div className='container md:mx-auto p-0 h-screen w-3/4'>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
