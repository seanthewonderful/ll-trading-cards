import '../styles/playerCard.css'

import { IoIosBaseball } from 'react-icons/io'
import rangersEmblem from '../assets/team_logos/TEX/texas-rangers-logo.png'
import { useNavigate } from 'react-router-dom'

function PlayerCard({ player }) {

  const navigate = useNavigate()

  console.log(player)
  const handleClick = () => {
    navigate('/lockerroom', { state: { player: player }})
  }

  return (
    <div 
      className="player-card"
      onClick={handleClick}
      >
      <section className='player-card-team-logo-section'>
        <img 
          className='player-card-team-logo' 
          src={rangersEmblem} 
          alt="" />
      </section>

      <div className="player-card-front-body">
        <div className="player-card-image-div-black">
          <div className="player-card-image-div-white">

            <img 
              className="player-card-image" 
              src="../assets/sf.png"
              alt="player-card-img" 
              />

          </div>
        </div>
      </div>

      <section className='player-card-name-box'>
        <p className='permanent-marker-regular player-card-name'>{player.firstName} {player.lastName}</p>
      </section>

    </div>
  )
}

export default PlayerCard