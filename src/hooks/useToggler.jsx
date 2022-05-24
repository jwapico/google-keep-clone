import { useState } from 'react';

function useToggler(initalState) {
  const [isToggled, setIsToggled] = useState(initalState)

  function toggle() {
    setIsToggled(prevToggled => !prevToggled)
  }

  function turnOn() {
    setIsToggled(true)
  }

  function turnOff() {
    setIsToggled(false)
  }

  return { isToggled, toggle, turnOn, turnOff}
}

export default useToggler