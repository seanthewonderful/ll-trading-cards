import '../styles/playerCard.css'

function PlayerCard({ player }) {

  return (
    <div className="player-card">
      <ul>
        <li>{player.firstName}</li>
        <li>{player.lastName}</li>
        <li>{player.birthMonth}</li>
        <li>{player.homeTown}</li>
        <li>{player.recoveryEmail}</li>
      </ul>
    </div>
  )
}

export default PlayerCard