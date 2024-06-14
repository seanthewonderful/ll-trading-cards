import '../styles/playerCard.css'

function PlayerCard({ player }) {

  console.log(player)

  return (
    <div className="player-card">
      <img className="player-card-img" src="../assets/sf.png" alt="player-card-img" />
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