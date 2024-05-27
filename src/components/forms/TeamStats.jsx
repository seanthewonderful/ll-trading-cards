import { useState } from 'react'

import InputNumber from './InputNumber.jsx'

function TeamStats() {

  const [teamStats, setTeamStats] = useState({
    batting: {
      W: 0,
      L: 0,
      AVG: 0,
      HR: 0,
      RBI: 0,
      SB: 0,
      R: 0,
      OBP: 0,
      SLG: 0,
      OPS: 0,
      H: 0,
      '2B': 0,
      '3B': 0,
      BB: 0,
      HBP: 0,
      SO: 0,
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Team Stats: ", teamStats)
  }

  return (
    <form 
      id='team-stats-batting'
      onSubmit={handleSubmit}
      >
      <h3>Team Stats:</h3>
      <InputNumber
        inputVal={teamStats.batting.W}
        setInputVal={(w) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, W: w } })
        }}
        min={0}
        max={1000}
        formName={"w"}
        className={"batting batting-w"}
        labelName={"Wins"}
        />

      <InputNumber
        inputVal={teamStats.batting.L}
        setInputVal={(l) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, L: l } })
        }}
        min={0}
        max={1000}
        formName={"l"}
        className={"batting batting-l"}
        labelName={"Losses"}
        />

      <InputNumber
        inputVal={teamStats.batting.AVG}
        setInputVal={(avg) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, AVG: avg } })
        }}
        min={0}
        max={1000}
        formName={"avg"}
        className={"batting batting-avg"}
        labelName={"Batting Average"}
        />

      <InputNumber
        inputVal={teamStats.batting.HR}
        setInputVal={(hr) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, HR: hr } })
        }}
        min={0}
        max={1000}
        formName={"hr"}
        className={"batting batting-hr"}
        labelName={"Home Runs"}
        />

      <InputNumber
        inputVal={teamStats.batting.RBI}
        setInputVal={(rbi) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, RBI: rbi } })
        }}
        min={0}
        max={1000}
        formName={"rbi"}
        className={"batting batting-rbi"}
        labelName={"RBIs"}
        />

      <InputNumber
        inputVal={teamStats.batting.SB}
        setInputVal={(sb) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, SB: sb } })
        }}
        min={0}
        max={1000}
        formName={"sb"}
        className={"batting batting-sb"}
        labelName={"Stolen Bases"}
        />

      <InputNumber
        inputVal={teamStats.batting.R}
        setInputVal={(r) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, R: r } })
        }}
        min={0}
        max={1000}
        formName={"r"}
        className={"batting batting-r"}
        labelName={"Runs"}
        />

      <InputNumber
        inputVal={teamStats.batting.OBP}
        setInputVal={(obp) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, OBP: obp } })
        }}
        min={0}
        max={1000}
        formName={"obp"}
        className={"batting batting-obp"}
        labelName={"On-Base Percentage"}
        />

      <InputNumber
        inputVal={teamStats.batting.SLG}
        setInputVal={(slg) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, SLG: slg } })
        }}
        min={0}
        max={1000}
        formName={"slg"}
        className={"batting batting-slg"}
        labelName={"Slugging Percentage"}
        />

      <InputNumber
        inputVal={teamStats.batting.OPS}
        setInputVal={(ops) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, OPS: ops } })
        }}
        min={0}
        max={1000}
        formName={"ops"}
        className={"batting batting-ops"}
        labelName={"On-Base Plus Slugging"}
        />

      <InputNumber
        inputVal={teamStats.batting.H}
        setInputVal={(h) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, H: h } })
        }}
        min={0}
        max={1000}
        formName={"h"}
        className={"batting batting-h"}
        labelName={"Hits"}
        />

      <InputNumber
        inputVal={teamStats.batting['2B']}
        setInputVal={(doubles) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, '2B': doubles } })
        }}
        min={0}
        max={1000}
        formName={"2b"}
        className={"batting batting-2b"}
        labelName={"Doubles"}
        />

      <InputNumber
        inputVal={teamStats.batting['3B']}
        setInputVal={(triples) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, '3B': triples } })
        }}
        min={0}
        max={1000}
        formName={"3b"}
        className={"batting batting-3b"}
        labelName={"Triples"}
        />

      <InputNumber
        inputVal={teamStats.batting.BB}
        setInputVal={(bb) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, BB: bb } })
        }}
        min={0}
        max={1000}
        formName={"bb"}
        className={"batting batting-bb"}
        labelName={"Walks"}
        />

      <InputNumber
        inputVal={teamStats.batting.HBP}
        setInputVal={(hbp) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, HBP: hbp } })
        }}
        min={0}
        max={1000}
        formName={"hbp"}
        className={"batting batting-hbp"}
        labelName={"Hit By Pitch"}
        />

      <InputNumber
        inputVal={teamStats.batting.SO}
        setInputVal={(so) => {
          setTeamStats({ ...teamStats, batting: { ...teamStats.batting, SO: so } })
        }}
        min={0}
        max={1000}
        formName={"so"}
        className={"batting batting-so"}
        labelName={"Strikeouts"}
        />

      <button type="submit">Submit</button>
      
    </form>
  )
}

export default TeamStats