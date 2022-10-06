/* eslint-disable */ 
import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';


function App(){
  const [list, setList] = useState([])
  const [isDoneList, setIsDoneList] = useState([])
  const [isNotDoneList, setIsNotDoneList] = useState([])
  const [제목,제목변경] = useState('')
  const [내용,내용변경] = useState('')

  const handleOnChange = (e, type)=>{
    if (type==="제목"){
        제목변경(e.target.value)
    } else if (type==="내용"){
        내용변경(e.target.value)
    }
}

const handleOnClick = (e)=>{
  e.preventDefault()
  const card = {id: uuidv4(), title: 제목, content: 내용, isDone: false}
  setList([...list, card]) // list 뒤에다가 카드를 넣어준다
  //input 창을 공백으로 초기화시켜준다.
  제목변경("")
}

const handleisDone = (target, id)=>{
  // 바꾸고자 하는 card 를 찾는다 (filter 사용)
  const result = list.filter((item)=>{
      return item.id === id
  })
  // 하지만 filter 는 본래 결과를 배열로 배출한다 
  // 필터된 (item.id === id) 는 하나이므로 
  // 우리가 찾는 카드는 무조건 result[0] 에 있다 (id 가 중복되지 않는한...)
  const selectedCard = result[0]
  // 우리가 찾는 카드 말고 나머지들을 rest 에 저장한다  
  const rest = list.filter((item)=>{
      return item.id !==id
  })
  // isDone을 true로 바꾸고 싶을때: 
  if (target === "done"){
      // spread 문법 : 객체 또는 배열에 사용할 수 있다. 
      // selectedCard 는 객체이고, spread 문법을 사용해서 
      // selectedCard 객체의 모든 key를 가져온다 
      // 그리고 isDone: true 를 추가한다 
      // 이때, 객체일 경우, 객체는 key 가 무조건 고유여야 하기 때문에 (중복 key는 애초에 있을 수 없다)
      // isDone과 같이 이미 존재하는 키를 추가 하게 되면 overwrite 되 버린다 (즉, 업데이트 된다)
      const changedCard = {...selectedCard, isDone: true}
      // 바꾼카드를 rest 배열 (즉, 우리가 selectedCard를 뺀 나머지 카드들을 담고있는 배열에)
      // push 로 추가해준다 
      rest.push(changedCard)
      // 마지막으로 원래의 list를 "업데이트" 된 rest 배열로 바꿔준다  
      setList(rest)
  } else if (target === "notDone"){
      const changedCard = {...selectedCard, isDone: false}
      rest.push(changedCard)
      setList(rest)
  }
}


// 집으로 가져오기
  return (
    <>
        <div className="App">

        <div className="input-group">
            <label className="form-label"></label>
            <input onChange={(e)=>handleOnChange(e, "제목")} type="text" name="title" className="add-input input-body" />
        </div>
        <button onClick={(e)=>handleOnClick(e)} className="add-button">추가하기</button>
        <h1>Todo List</h1>
                {isNotDoneList.map((card)=>{
                // {title: "a", content: "b", isDone: false}
                    return <Todo item={card} handleDelete={handleDelete} handleisDone={handleisDone}/> // {item: card}
                })}
              
      </div>
      </>



  );
  }





export default App;