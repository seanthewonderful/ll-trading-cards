import "../styles/topps87.css"

import angelsEmblem from "../assets/team_logos/LAA/los-angeles-angels-emblem.png"

const BaseballCard = ({ playerInfo, playerStats }) => {


  return (
    <div id="card-container">

      <section id="team-logo-section">
        <img id="team-logo-img" src={angelsEmblem} alt="angels logo" />
      </section>
      <div id="baseball-card">
        <div id="card-image-div-black">
          <div id="card-image-div-white">

            <img id="card-image" src="/src/assets/sf.png" alt="sean" />

          </div>
        </div>
      </div>

      <span className="danfo" id="company-logo">
        <p>Lower</p>
        <p>Deck</p>
      </span>

      <section id="player-name-box">
        <p className="permanent-marker-regular">{playerInfo.firstName}</p>
        <p className="permanent-marker-regular">{playerInfo.lastName}</p>
      </section>

    </div>

  )
}

export default BaseballCard