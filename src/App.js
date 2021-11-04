import './App.css';
import React , {useState} from 'react'

function App() {

  const [value, setValue] = useState('')
  const [cashamount, setCashAmount] = useState([100,200,300,400,500,600,700])
  const [cashSpend, setCashspend] = useState([0,0,0,0,0,0,0])
  const [showInfo, setShowInfo] = useState(false)
  const [cashback, setCashback] = useState(0)
  const btnValues = [
    [1, 2, 3,],
    [4, 5, 6,],
    [7, 8, 9,],
    ['',0,'.']
  ]

  let cback = 0
  let cash = [5000,2000,1000,500,200,100,50]
  let textInput = React.createRef();
  let textOutput = React.createRef();

  function greedy(amount, coins, camount){
   
    var coincount = [0,0,0,0,0,0,0];
    var creminder = amount + cashback; 
    var ccoin;
    var cbackIsTradable = false;
    
    do{
      if(cbackIsTradable){
        creminder = cback
      }
      var i = 0; 
      var j = 0
      while( i < coins.length )
      { 
          while ( coins[i] <= creminder && camount[i] > 0) // cash giving
          {
            if(camount[i+1] < camount[i] || i === coins.length - 1)
            {
              creminder = creminder - coins[i];
              camount[i]--
              ccoin = coincount[i];
              ccoin += 1;
              coincount[i] = ccoin;
            } else break
          }   
        i++;
      }
      setCashback(creminder)
      cback = creminder
      setCashAmount(camount)
      while ( j < coins.length)
      {
        if(camount[j] > 0 && cback >= coins[j]){
          cbackIsTradable = true
          break
        } else 
        { 
          cbackIsTradable = false 
        }
        j++
      }
    }
    while(cbackIsTradable)
    setCashspend(arrayAction(cashSpend,coincount))
  }

  function arrayAction(currentAmount, amountToDicrement){
    for(let i = 0; i < currentAmount.length; i++){
      currentAmount[i] += amountToDicrement[i]
    }
    return currentAmount
  }

  function countCash(cashArray, cashValueArray){
    var cash = 0
    for (let i = 0; i < cashArray.length; i++){
      cash += cashArray[i] * cashValueArray[i]
    }
    return cash
  }

  function handleChange(e){
    const re = /^\d{1,}(\.\d{0,2})?$/;
    const amount = e.target.value;

    if (!amount || amount.match(re)) {
      setValue(amount)
    } 
  }
 
  function handleClick(e){
    // e.preventDefault();
    
    const buttonValue = e.target.value;
    // textInput.current.value += buttonValue
    setValue(textInput.current.value += buttonValue)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(countCash(cashamount, cash) - value  > 0){
      greedy(+value,cash,cashamount)
    } else alert('не хватает средств в банкомате!')
    textInput.current.value = ''
    setValue('')
  }

  function handleOptionChange(e){
    // e.preventDefault()
    const buttonValue = e.target.innerHTML;
    switch (buttonValue){
      case '1':
        setCashAmount([100,400,1000,3000,5000,8000,10000])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      case '2':
        setCashAmount([476,345,6741,4362,234,1643,3450])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      case '3':
        setCashAmount([234,678,845,2451,9654,2345,234])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      case '4':
        setCashAmount([546,562,2543,4365,2154,124,342])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      case '5':
        setCashAmount([2732,347,479,7556,3296,1257,3854])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      case '6':
        setCashAmount([73,147,279,356,696,857,854])
        setCashspend([0,0,0,0,0,0,0])
        setCashback(0)
        break;
      default:
        break;
    }
  }

  function handleShowInfo(){
    setShowInfo(!showInfo)
  }

  return (
    <div className="App">
      <div>
      {showInfo ? 
        <div className = 'close-btn'><div>наличные в банкомате</div>
          <div className = 'outputs'>
            {cashamount.map((obj,i) => {
              return (
                <div className = 'elem' key = {i}>
                  {cash[i]}
                  <input className = 'amountOuput' readOnly = {true} value ={obj}/>
                </div>
              )
            })}
          </div>
          <button className = 'btn' onClick={handleShowInfo}>скрыть справку</button>
        </div> 
      :<div className = 'info-btn'>
        <button className ='btn' onClick= {handleShowInfo}>показать справку</button>
      </div>}
      </div>
      <form onSubmit ={handleSubmit}>
        <input value = {value}  ref={textInput} placeholder = 'сумма' onChange = {handleChange}/>
        <input type="submit" value="Выдача" />
      </form>
        <input type="number" placeholder = 'остаток' readOnly = {true} ref={textOutput} value = {cashback.toFixed(2)}/>
      <div className = 'btnBox'>
      {
        btnValues.flat().map((btn, i) => {
          return (
            <button key={i} value={btn} className = 'btn' onClick = {handleClick}>{btn}</button>
          );
        })
      }
      </div>
      <div>Ваши наличные</div>
      <div className = 'info'>
        {cashSpend.map((obj,i) => {
          return (
            <div className = 'elem' key = {i}>{cash[i]}<input className ='amountOuput' readOnly = {true} value ={obj}/></div>
          )
        })}
      </div>
      <div>Варианты наличных</div>
      <div className = 'optionBtnBox'>
        {
          btnValues.slice(0,2).flat().map((btn, i) => {
            return (
              <button key={i} value={btn} className = 'btn' onClick = {handleOptionChange}>{btn}</button>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
