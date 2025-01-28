import { useState, useEffect } from 'react'
import { Display} from "react-7-segment-display";
import alarma from "./assets/alarmafin.mp3"

const ClockApp = () => {
  const [portrait, setPortrait]  = useState(false)  
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [minutes, setMinutes] = useState(sessionLength)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timerId, setTimerId] = useState(null);
  const [clockType, setClockType] = useState('session')
  const alarm = new Audio(alarma);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          if (prevSeconds === 1) {
            if (minutes === 0) {
              if(clockType == 'session'){
                alarm.play();
                setClockType('break')
                setMinutes(breakLength)
              }
              else {
                alarm.play();
                setClockType('session')
                setMinutes(sessionLength)
              }
              return 0;
            } else {
                return 0;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
      setTimerId(intervalId);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, minutes]);

  useEffect(() => {
    resetTimer()
  }, [sessionLength, breakLength])

  useEffect(() => {
    getWindowSize()
  }, [])

  const getWindowSize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (height>width) {
      setPortrait(true)
    }
  };

  const toggleTimer = () =>{
    if (isRunning) {
      clearInterval(timerId);
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }

  const resetTimer = () =>{
    setClockType('session')
    clearInterval(timerId);
    setIsRunning(false);
    setMinutes(sessionLength)
    setSeconds(0)
  }

  const incSes = () =>{
    if(!isRunning  && sessionLength < 120 ){
      setSessionLength (prevLength => prevLength+1)
    }

  }

  const decSes = () =>{
    if(!isRunning && sessionLength >1 ){
      setSessionLength (prevLength => prevLength-1)
    }

  }

  const incBrk = () =>{
    if(!isRunning && breakLength < 60){
      setBreakLength (prevLength => prevLength+1)
    }

  }

  const decBrk = () =>{
    if(!isRunning && breakLength >1){
      setBreakLength (prevLength => prevLength-1)
    }

  }


  return (
    <div className='container'>
      <div className='timers'>
        <div className='timer-edit'>
          <p>Session time: {sessionLength} min.</p>
          <div className='timer-change'>
            <button className={isRunning ? 'button-dissabled' : ''} onClick={incSes}>+</button>
            <button className={isRunning ? 'button-dissabled' : ''} onClick={decSes}>-</button>
          </div>
        </div>
        <div className='timer-edit'>
          <p>Break time: {breakLength} min.</p>
          <div className='timer-change'>
            <button className={isRunning ? 'button-dissabled' : ''} onClick={incBrk}>+</button>
            <button className={isRunning ? 'button-dissabled' : ''} onClick={decBrk}>-</button>
          </div>
        </div>
      </div>
      <div className='clock-block'>
      <div className= "displayblockleft">
        {clockType=='session' ? 
        <Display 
            value="5e"
            skew="true"
            height={portrait== true ? 50 : 100}/> :
        <><Display 
            value="b-"
            skew="true"
            height={portrait== true ? 50 : 100}/>
          <div className='custom-segment'></div>
        </>}
        </div>
      <div className= "displayblockleft">          
        <Display 
          value="-"
          skew="true"
          count={1}
          height={portrait== true ? 50 : 100}/>
        </div>
        <div className='clock'>
          <div className= "displayblockleft">
          <Display           
            value={minutes == 0? "0" : minutes}
            skew="true"
            height={portrait== true ? 50 : 100}/>
          </div>
          <div class="dots"></div>
          <div className= "displayblockleft">
          <Display 
            value={seconds  == 0? "0" : seconds} 
            skew="true"
            height={portrait== true ? 50 : 100}/>
          </div>
        </div>
      </div>
      <div className='controls'>
      {!isRunning && <button onClick={toggleTimer}>START</button>}      
      {isRunning && <button onClick={toggleTimer}>PAUSE</button>}
      <button onClick={resetTimer}>RESET</button>
      </div>
    </div>
  )
}

export default ClockApp
