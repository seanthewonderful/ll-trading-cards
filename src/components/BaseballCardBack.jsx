import { useSelector } from "react-redux"

import position from '../functions/position.js'
import toTitleCase from '../functions/toTitleCase.js'

function BaseballCardBack() {

  const playerInfo = useSelector(state => state.playerInfo)
  const playerStats = useSelector(state => state.playerStats)

  return (
    <div id="baseball-card-back">

      <div id="baseball-card-back-nameplate">
        <p 
          id="nameplate-back-name"
          className="permanent-marker-regular"
          >
            {playerInfo.firstName.toUpperCase()} {playerInfo.lastName.toUpperCase()}
        </p>
        <p 
          id="nameplate-back-dot"
          className="permanent-marker-regular"
          >
            •
        </p>
        <p 
          id="nameplate-back-position"
          className="permanent-marker-regular"
          >
          {position(+playerInfo.position1).toUpperCase()}
        </p>
      </div>

      <div id="baseball-card-back-body">

            <table id="baseball-card-back-table">
              <thead>
                <tr>
                  <th colSpan="16">COMPLETE BATTING RECORD</th>
                </tr>
                <tr id="head-categories">
                  <th>YR</th>
                  <th>Club</th>
                  <th>G</th>
                  <th>AB</th>
                  <th>R</th>
                  <th>H</th>
                  <th>2B</th>
                  <th>3B</th>
                  <th>HR</th>
                  <th>RBI</th>
                  <th>BB</th>
                  <th>SB</th>
                  <th>OBP</th>
                  <th>SLG</th>
                  <th>OPS</th>
                  <th>AVG</th>
                </tr>
              </thead>
              <tbody>

                {/* {playerStats.batting.map((stat) => (
                  <tr>
                    <td>{stat}</td>
                  </tr>
                ))} */}
                <tr>
                  <td>24</td>
                  <td>DODGERS</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0.000</td>
                </tr>
                <tr id="totals-row">
                  <td colSpan="2">TOTALS</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0.000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="16" align="right">©2024 PopCards Trading Inc.</th>
                </tr>
                
              </tfoot>
            </table>

      </div>

      <div id="baseball-card-back-info-plate">

        <div id="baseball-card-back-info-plate-left">
          <p>THROWS: {playerInfo.throws}</p>
          <p>BATS: {playerInfo.bats}</p>
          <p>BORN: {playerInfo.birthmonth} {playerInfo.hometown}</p>
          <p>POS1: {playerInfo.position1}</p>
          <p>POS2: {playerInfo.position2}</p>
        </div>
        <div id="baseball-card-back-info-plate-right">
          <span className="danfo" id="company-logo-back">
            <p>Lower</p>
            <p>Deck</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default BaseballCardBack