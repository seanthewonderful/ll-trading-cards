import { useState, useContext, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import InputNumber from './forms/InputNumber.jsx'
import notify from '../functions/toasts.js'
import { DugoutContext } from '../functions/contexts.js'
import axios from 'axios'

function PlayerStats({ player }) {

  // console.log("PlayerStats player: ", player)

  const { setPlayerSelected } = useContext(DugoutContext)

  const [playerStats, setPlayerStats] = useState({
    batting: {
      G: player.playerBattingStat?.G || 0,
      AB: player.playerBattingStat?.AB || 0,
      PA: player.playerBattingStat?.PA || 0,
      HR: player.playerBattingStat?.HR || 0,
      RBI: player.playerBattingStat?.RBI || 0,
      SB: player.playerBattingStat?.SB || 0,
      R: player.playerBattingStat?.R || 0,
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

  const inputRef = useRef(null)

  // console.log("PlayerStats: ", playerStats)

  let battingAverage = (
    playerStats.batting.H
    / playerStats.batting.AB
  ).toFixed(3)

  let onBasePercentage = (
    (parseFloat(playerStats.batting.H)
      +
      parseFloat(playerStats.batting.BB)
      +
      parseFloat(playerStats.batting.HBP))
    /
    parseFloat(playerStats.batting.PA)
  ).toFixed(3)


  let sluggingPercentage = (
    // how many singles
    ((playerStats.batting.H - playerStats.batting['2B'] - playerStats.batting['3B'] - playerStats.batting.HR)
      +
      // how many doubles and triples
      (playerStats.batting['2B'] * 2) + (playerStats.batting['3B'] * 3)
      +
      // how many home runs
      (playerStats.batting.HR * 4))
    /
    // average
    playerStats.batting.AB
  ).toFixed(3)

  let onBasePlusSlugging = (
    parseFloat(sluggingPercentage)
    + parseFloat(onBasePercentage)
  ).toFixed(3)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const bodyObj = {
      playerId: player.playerId,
      teamId: player.teamId,
      stats: playerStats.batting,
    }
    axios.put('/api/editPlayerBattingStats', bodyObj)
      .then(res => {
        console.log("Response:", res.data)
        dispatch({
          type: "SET_TEAM",
          payload: res.data.team
        })
        dispatch({
          type: "SET_USER",
          payload: res.data.user
        })
        setPlayerSelected({
          selected: true,
          player: res.data.player
        })
        notify('success', 'Batting Stats Updated')
        inputRef.current = null
      })
      .catch(err => console.log(err))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setPlayerSelected({
      selected: false,
      player: null
    })
  }


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

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

      {/* BATTING AVERAGE */}
      <section id='input-number'>
        <input
          id="batting-avg-non-input"
          className="batting batting-avg"
          name='avg'
          type="text"
          value={battingAverage}
          readOnly
        />

        <label htmlFor="batting-avg-input">Batting Average</label>
      </section>

      {/* ON-BASE PERCENTAGE */}
      <section id='input-number'>
        <input
          id="on-base-percentage-non-input"
          className='batting batting-obp'
          type="text"
          value={onBasePercentage}
          readOnly
        />
        <label htmlFor="on-base-percentage-input">On Base %</label>
      </section>

      {/* SLUGGING PERCENTAGE */}
      <section id='input-number'>
        <input
          id="slugging-percentage-non-input"
          className='batting batting-slg'
          type="text"
          value={sluggingPercentage}
          readOnly
        />
        <label htmlFor="slugging-percentage-input">Slugging %</label>
      </section>

      {/* ON-BASE PLUS SLUGGING */}
      <section id='input-number'>
        <input
          id="on-base-slugging-non-input"
          className='batting batting-ops'
          type="text"
          value={onBasePlusSlugging}
          readOnly
        />
        <label htmlFor="on-base-percentage-input">On Base + Slugging</label>
      </section>

      {/* HITS */}
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