import React, {useContext, useState} from 'react'

const MainContext = React.createContext()

export function useStore(){
    return useContext(MainContext)
}

export function MainProvider({ children }){

    const [value, setValue] = useState('')
    const [cashamount, setCashAmount] = useState([100,400,1000,3000,5000,8000,10000])
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

    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    
    function greedy(amount, coins, camount){    // выдача наличных
    
        let coincount = [0,0,0,0,0,0,0];
        let creminder = amount + cashback; 
        let ccoin;
        let cbackIsTradable = false;
        let maxIndex
        let newArr=[]
        do{
            if(cbackIsTradable){   // проверяем остаток
                creminder = cback
            }
            let i = 0; 
            let j = 0
            newArr = [...camount]

        while( i < coins.length ) 
        { 
            maxIndex = indexOfMax(newArr)

            console.log('maxIndex: '+maxIndex)
            console.log(newArr)
            console.log('creminder: '+creminder)
            while ( coins[maxIndex] <= creminder && camount[maxIndex] > 0) // cash giving
            {
                console.log('зашёл в ив')
                creminder = creminder - coins[maxIndex];
                camount[maxIndex]--
                maxIndex = indexOfMax(camount)
                ccoin = coincount[maxIndex];
                ccoin += 1;
                coincount[maxIndex] = ccoin;
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

    function arrayAction(currentAmount, amountToIcrement){
        for(let i = 0; i < currentAmount.length; i++){
        currentAmount[i] += amountToIcrement[i]
        }
        return currentAmount
    }

    function countCash(cashArray, cashValueArray){     // кол-во денег в банкомате
        let cash = 0
        for (let i = 0; i < cashArray.length; i++){
        cash += cashArray[i] * cashValueArray[i]
        }
        return cash
    }

    function handleChange(e){               // обработка ввода в инпут
        const re = /^\d{1,}(\.\d{0,2})?$/;
        const amount = e.target.value;

        if (!amount || amount.match(re)) {
        setValue(amount)
        } 
    }
    
    function handleClick(e){                 // обработка нажатия кнопок 
        const buttonValue = e.target.innerHTML;
        setValue(textInput.current.value += buttonValue)
    }

    function handleSubmit(e) {                     // отправка формы
        e.preventDefault();
        if(countCash(cashamount, cash) - value  > 0){
        greedy(+value,cash,cashamount)
        // greedyCheck(+value,cash,cashamount)
        } else alert('не хватает средств в банкомате!')
        textInput.current.value = ''
        setValue('')
    }

    function handleOptionChange(e){           // кнопки вариантов наличных
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


    const providerValue ={
        value,
        showInfo,
        btnValues,
        textInput,
        textOutput,
        cashSpend,
        cashamount,
        cashback,
        cback,
        cash,
        handleShowInfo,
        handleChange,
        handleClick,
        handleSubmit,
        handleOptionChange,
        greedy,
        countCash,
    }

    return(
        <MainContext.Provider value={providerValue}>
            {children}
        </MainContext.Provider>
    )
}
