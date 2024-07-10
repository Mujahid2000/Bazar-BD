import React, { useCallback, useEffect, useRef, useState } from 'react';

const CardTimer = () => {
    const [countDownTime, setCountDownTIme] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      const secondTimer = useRef(null);
      const getTimeDifference = (countDownDate) => {
        const currentTime = new Date().getTime();
        const timeDiffrence = countDownDate - currentTime;
        const days = Math.floor(timeDiffrence / (24 * 60 * 60 * 1000));
        const hours = Math.floor(
          (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDiffrence % (60 * 1000)) / 1000);
        if (timeDiffrence < 0) {
          if (secondTimer.current) {
            secondTimer.current.className = "relative top-5";
          }
          setCountDownTIme({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          clearInterval();
        } else {
          if (secondTimer.current) {
            secondTimer.current.className = "";
            secondTimer.current.className = "animate-timer";
          }
          setCountDownTIme({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          });
        }
      };
      const startCountDown = useCallback(() => {
        const customDate = new Date();
        const countDownDate = new Date(
          customDate.getFullYear(),
          customDate.getMonth(),
          customDate.getDate() + 50,
          customDate.getHours() + 18,
          customDate.getMinutes() + 25,
          customDate.getSeconds() + 8
        );
        setInterval(() => {
          getTimeDifference(countDownDate.getTime());
        }, 1000);
      }, []);
      useEffect(() => {
        startCountDown();
      }, [startCountDown]);
   
    return (
        <div className="flex justify-center bg-white lg:justify-start items-start  lg:rounded-l-xl  border px-9">
      <div className="  p-5 rounded-md flex justify-center flex-col gap-6  my-4">
        <div className="flex flex-col gap-1">
          <h1 className="  text-center lg:text-left text-[1.25rem] font-bold  text-black">
          Deals and offers
          </h1>
          <span className="text-[1rem] font-semibold text-center lg:text-left  text-[#959AAE]">
          Hygiene equipments
          </span>
        </div>
        <div className="flex  gap-3 ">
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-2 px-2 flex flex-col justify-center items-center bg-[#606060] text-[#ffff] text-sm text-center font-semibold rounded-md">
              <p>{countDownTime?.days}</p>
              <p>{countDownTime?.days == 1 ? "Day" : "Days"}</p>
            </span>
            
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-2 px-2 flex flex-col bg-[#606060] text-[#ffff] text-sm text-center font-semibold rounded-md">
                <p> {countDownTime?.hours}</p>
                <p>{countDownTime?.hours == 1 ? "Hou" : "Hour"}</p>
             
              
            </span>
            
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-2 px-2 bg-[#606060] text-[#ffff] text-sm text-center font-semibold rounded-md">
                <p>{countDownTime?.minutes}</p>
                <p> {countDownTime?.minutes == 1 ? "Min" : "Min"}</p>
              
             
            </span>
            
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-2 px-2 flex flex-col bg-[#606060] text-[#ffff] text-sm text-center font-semibold rounded-md">
                <p>{countDownTime?.seconds}</p>
                <p>{countDownTime?.seconds == 1 ? "Sec" : "Sec"}</p>
            </span>
            
          </div>
        </div>
      </div>
    </div>
    );
};

export default CardTimer;