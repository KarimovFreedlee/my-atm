import './App.css';
import React from 'react'
import ButtonGrid from './components/ButtonGrid';
import Button from './components/Button';
import Outputs from './components/Outputs';
import Info from './components/Info';
import Form from './components/Form';
import { useStore } from './store/Context';


function App() {

  const { value } = useStore()
  const { showInfo } = useStore()
  const { btnValues } = useStore()
  const { textInput } = useStore()
  const { textOutput } = useStore()
  const { cashSpend } = useStore()
  const { cashamount } = useStore()
  const { cashback } = useStore()
  const { cash } = useStore()

  const { handleShowInfo } = useStore()
  const { handleChange } = useStore()
  const { handleClick } = useStore()
  const { handleSubmit } = useStore()
  const { handleOptionChange } = useStore()



  return (
    <div className="App">
      <div>
      {showInfo ? 
        <div className = 'close-btn'><div>наличные в банкомате</div>
          <Info>
            {cashamount.map((obj,i) => {
              return (
                <Outputs
                  key={i}
                  value={cash[i]}
                  obj={obj}
                />
              )
            })}
          </Info>
          <Button value = {'скрыть справку'} onClick={handleShowInfo}/>
        </div> 
      :<div className = 'info-btn'>
        <Button value={'показать справку'} onClick={handleShowInfo}/>
      </div>}
      </div>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        textInput={textInput}
      />
      <input type="number" placeholder = 'остаток' readOnly = {true} ref={textOutput} value = {cashback.toFixed(2)}/>
      <ButtonGrid>
        {btnValues.flat().map((btn,i) => {
          return (
            <Button
              key={i}
              value={btn}
              onClick={handleClick}
            />
          )
        })}
      </ButtonGrid>
      <div>Ваши наличные</div>
      <Info>
        {cashSpend.map((obj,i) => {
          return (
            <Outputs
              key={i}
              value={cash[i]}
              obj={obj}
            />
          )
        })}
      </Info>
      <div>Варианты наличных</div>
      <ButtonGrid>
        {btnValues.slice(0,2).flat().map((btn,i) => {
          return (
            <Button
              key={i}
              value={btn}
              onClick={handleOptionChange}/>
          )
        })}
      </ButtonGrid>
    </div>
  );
}

export default App;
