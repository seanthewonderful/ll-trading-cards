import { useState, useContext, useRef } from 'react'
import { useDispatch } from 'react-redux'

import InputNumber from './InputNumber.jsx'
import InputPercentage from './InputPercentage.jsx'
import { DugoutContext } from '../../functions/contexts.js'
import axios from 'axios'

function PlayerStats({ player }) {

  console.log("PlayerStats player: ", player)

  const { setPlayerSelected } = useContext(DugoutContext)

  const [playerStats, setPlayerStats] = useState({
    batting: {
      G: player.playerBattingStat?.G || 0,
      AB: player.playerBattingStat?.AB || 0,
      PA: player.playerBattingStat?.PA || 0,
      AVG: player.playerBattingStat?.AVG || "000",
      HR: player.playerBattingStat?.HR || 0,
      RBI: player.playerBattingStat?.RBI || 0,
      SB: player.playerBattingStat?.SB || 0,
      R: player.playerBattingStat?.R || 0,
      OBP: player.playerBattingStat?.OBP || 0,
      SLG: player.playerBattingStat?.SLG || 0,
      OPS: player.playerBattingStat?.OPS || 0,
      H: player.playerBattingStat?.H || 0,
      '2B': player.playerBattingStat ? player.playerBattingStat['2B'] : 0,
      '3B': player.playerBattingStat ? player.playerBattingStat['3B'] : 0,
      BB: player.playerBattingStat?.BB || 0,
      HBP: player.playerBattingStat?.HBP || 0,
      SO: player.playerBattingStat?.SO || 0,
    },
    pitching: {
      ERA: 0,
      W: 0,
      L: 0,
      SO: 0,
      SV: 0,
      WHIP: 0,
      BAA: 0,
      IP: 0,
      H: 0,
      R: 0,
      BB: 0,
      HBP: 0,
    }
  })
  const [editMode, setEditMode] = useState({
    AVG: false,
  })
  const inputRef = useRef(null)

  console.log("PlayerStats: ", playerStats)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const bodyObj = {
      playerId: player.playerId,
      playerStats: playerStats.batting
    }
    axios.put('/api/editPlayerBattingStats', bodyObj)
    dispatch({
      type: "SET_TEAM",
      payload: res.data.team
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setPlayerSelected({
      selected: false,
      player: null
    })
  }

  return (
    <form 
      id='player-stats-batting'
      onSubmit={handleSubmit}
      >
      <h3>Player Stats:</h3>

      <InputNumber
        inputVal={playerStats.batting.AB}
        setInputVal={(ab) => {
          setPlayerStats({ 
            ...playerStats, 
            batting: { 
              ...playerStats.batting, 
              AB: ab 
            } 
          })
        }}
        min={0}
        max={1000}
        formName={"ab"}
        className={"batting batting-ab"}
        labelName={"At Bats"}
      />

      <InputNumber
        inputVal={playerStats.batting.PA}
        setInputVal={(pa) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, PA: pa } })
        }}
        min={0}
        max={1000}
        formName={"pa"}
        className={"batting batting-pa"}
        labelName={"Plate Appearances"}
      />


      <InputNumber
        inputVal={playerStats.batting.HR}
        setInputVal={(hr) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, HR: hr } })
        }}
        min={0}
        max={1000}
        formName={"hr"}
        className={"batting batting-hr"}
        labelName={"Home Runs"}
      />

      <InputNumber
        inputVal={playerStats.batting.RBI}
        setInputVal={(rbi) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, RBI: rbi } })
        }}
        min={0}
        max={1000}
        formName={"rbi"}
        className={"batting batting-rbi"}
        labelName={"RBI"}
      />

      <InputNumber
        inputVal={playerStats.batting.SB}
        setInputVal={(sb) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, SB: sb } })
        }}
        min={0}
        max={1000}
        formName={"sb"}
        className={"batting batting-sb"}
        labelName={"Stolen Bases"}
      />

      <InputNumber
        inputVal={playerStats.batting.R}
        setInputVal={(r) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, R: r } })
        }}
        min={0}
        max={1000}
        formName={"r"}
        className={"batting batting-r"}
        labelName={"Runs"}
      />

      <InputNumber
        inputVal={playerStats.batting.OBP}
        setInputVal={(obp) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, OBP: obp } })
        }}
        min={0}
        max={1000}
        formName={"obp"}
        className={"batting batting-obp"}
        labelName={"On-Base Percentage"}
      />

      <InputNumber
        inputVal={playerStats.batting.SLG}
        setInputVal={(slg) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, SLG: slg } })
        }}
        min={0}
        max={1000}
        formName={"slg"}
        className={"batting batting-slg"}
        labelName={"Slugging Percentage"}
      />

      {/* BATTING AVERAGE */}
      {editMode.AVG ? 
      <input 
        id="batting-avg-input" 
        type="text" 
        value={playerStats.batting.AVG}
        onChange={(e) => {
          if (/^\d{0,3}$/.test(e.target.value)) {
            setPlayerStats({ 
              ...playerStats, 
              batting: { 
                ...playerStats.batting, 
                AVG: e.target.value 
              } 
            })
          } else {
            console.log('invalid Batting Average')
          }
        }}
        onBlur={() => {
          setPlayerStats({ 
          ...playerStats, 
            batting: { 
              ...playerStats.batting, 
              AVG: playerStats.batting.AVG.padStart(3, '0') 
            } })
            setEditMode({ ...editMode, AVG: false })
          }}
        onFocus={e => e.target.select()}
        />
      :
      <input 
        id="batting-avg-non-input"
        type="text"
        value={parseFloat(playerStats.batting.AVG) / 1000}
        onFocus={() => setEditMode({ ...editMode, AVG: true })}
        readOnly
        />
      }
      <label htmlFor="batting-avg-input">Batting Average</label>

      <InputNumber
        inputVal={playerStats.batting.OPS}
        setInputVal={(ops) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, OPS: ops } })
        }}
        min={0}
        max={1000}
        formName={"ops"}
        className={"batting batting-ops"}
        labelName={"On-base Plus Slugging"}
      />

      <InputNumber
        inputVal={playerStats.batting.H}
        setInputVal={(h) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, H: h } })
        }}
        min={0}
        max={1000}
        formName={"h"}
        className={"batting batting-h"}
        labelName={"Hits"}
      />

      <InputNumber
        inputVal={playerStats.batting['2B']}
        setInputVal={(h) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, '2B': h } })
        }}
        min={0}
        max={1000}
        formName={"2b"}
        className={"batting batting-2b"}
        labelName={"Doubles"}
      />

      <InputNumber
        inputVal={playerStats.batting['3B']}
        setInputVal={(h) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, '3B': h } })
        }}
        min={0}
        max={1000}
        formName={"3b"}
        className={"batting batting-3b"}
        labelName={"Triples"}
      />

      <InputNumber
        inputVal={playerStats.batting.BB}
        setInputVal={(h) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, BB: h } })
        }}
        min={0}
        max={1000}
        formName={"bb"}
        className={"batting batting-bb"}
        labelName={"Walks"}
      />

      <InputNumber
        inputVal={playerStats.batting.HBP}
        setInputVal={(h) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, HBP: h } })
        }}
        min={0}
        max={1000}
        formName={"hbp"}
        className={"batting batting-hbp"}
        labelName={"Hit-by-Pitch"}
      />

      <InputNumber
        inputVal={playerStats.batting.SO}
        setInputVal={(so) => {
          setPlayerStats({ ...playerStats, batting: { ...playerStats.batting, SO: so } })
        }}
        min={0}
        max={1000}
        formName={"so"}
        className={"batting batting-so"}
        labelName={"Strikeouts"}
      />

      <button type='submit'>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  )
}

export default PlayerStats