import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sessionCheck from '../functions/sessionCheck.js'

import Explanation from './Explanation.jsx'
import Turnstyle from './auth/Turnstyle.jsx'
import Dugout from './Dugout.jsx'

function Welcome() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [register, setRegister] = useState(false)

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const loginClick = () => {
    openModal()
    setRegister(false)
  }

  const registerClick = () => {
    openModal()
    setRegister(true)
  }

  useEffect(() => {
    sessionCheck(dispatch)
  }, [])

  return user ? (
    <Dugout />
  ) : (
    <div>
      <h1>Welcome</h1>

      <Explanation />

      <Turnstyle 
        isOpen={modalOpen} 
        onClose={closeModal}
        register={register}
        loginClick={loginClick}
        registerClick={registerClick}
        />

      <button 
        onClick={loginClick}
        >
        Login
      </button>

      <button 
        onClick={registerClick}
        >
        Register
      </button>

      
    </div>
  )
}

export default Welcome