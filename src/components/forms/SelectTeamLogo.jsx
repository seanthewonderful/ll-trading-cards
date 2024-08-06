import { useState } from 'react'

function SelectTeamLogo() {

  const [selectedTeam, setSelectedTeam] = useState("MLB");

  return (
    <select
      id="team-logo-select"
      name="team-logo"
      value={teamInfo.logoIcon.url}
      onChange={(e) => setTeamInfo({ ...teamInfo, logo: e.target.value })}
    >
      <option value="MLB">MLB</option>
      <option value="AL">American League</option>
      <option value="NL">National League</option>
      <option value="ARI">Arizona Diamondbacks</option>
      <option value="ATL">Atlanta Braves</option>
      <option value="BAL">Baltimore Orioles</option>
      <option value="BOS">Boston Red Sox</option>
      <option value="CHC">Chicago Cubs</option>
      <option value="CHW">Chicago White Sox</option>
      <option value="CIN">Cincinnati Reds</option>
      <option value="CLE">Cleveland Indians</option>
      <option value="COL">Colorado Rockies</option>
      <option value="DET">Detroit Tigers</option>
      <option value="HOU">Houston Astros</option>
      <option value="KC">Kansas City Royals</option>
      <option value="LAA">Los Angeles Angels</option>
      <option value="LAD">Los Angeles Dodgers</option>
      <option value="MIA">Miami Marlins</option>
      <option value="MIL">Milwaukee Brewers</option>
      <option value="MIN">Minnesota Twins</option>
      <option value="NYM">New York Mets</option>
      <option value="NYY">New York Yankees</option>
      <option value="OAK">Oakland Athletics</option>
      <option value="PHI">Philadelphia Phillies</option>
      <option value="PIT">Pittsburgh Pirates</option>
      <option value="SD">San Diego Padres</option>
      <option value="SF">San Francisco Giants</option>
      <option value="SEA">Seattle Mariners</option>
      <option value="STL">St. Louis Cardinals</option>
      <option value="TB">Tampa Bay Rays</option>
      <option value="TEX">Texas Rangers</option>
      <option value="TOR">Toronto Blue Jays</option>
      <option value="WSN">Washington Nationals</option>
    </select>
  )
}

export default SelectTeamLogo