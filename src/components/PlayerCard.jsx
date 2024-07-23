import { useContext, useEffect } from 'react'

import '../styles/playerCard.css'
import { DugoutContext } from '../functions/contexts.js'

import { IoIosBaseball } from 'react-icons/io'
import rangersEmblem from '../assets/team_logos/TEX/texas-rangers-logo.png'
import defaultImage from '../assets/defaultPlayer.png'

function PlayerCard({ player }) {

  const { playerSelected, setPlayerSelected } = useContext(DugoutContext)
  
  const handleClick = () => {
    if (playerSelected.selected) {
      setPlayerSelected({
        selected: false,
        player: null
      })
    } else {
      setPlayerSelected({
        selected: true,
        player: player
      })
    }
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
              src={player.playerImageFront?.url || defaultImage}
              alt={defaultImage} 
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