import { db, User, MLBTeam, TeamLogo, Player, Position, PlayerTeam } from "./models.js";

await db.sync({ force: true });

console.log("Seeing users...")
await User.create({
  email: "t",
  firstName: "Timmy",
  lastName: "Two-Base",
  password: "asdf",
});

await User.create({
  email: "s",
  firstName: "Billy",
  lastName: "Base-on-Balls",
  password: "asdf",
});
console.log("Users seeded")

console.log("Seeding Positions...")

const positions = ["Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Left Fielder", "Center Fielder", "Right Fielder", "Rover", "Designated Hitter"];
for (let position of positions) {
  await Position.create({ name: position })
}

console.log("Seeding MLB Teams...")
const mlbTeams = [
  {
    location: "Arizona",
    name: "Diamondbacks",
    abbreviation: "ARI",
    city: "Phoenix",
    state: "AZ",
  },
  {
    location: "Atlanta",
    name: "Braves",
    abbreviation: "ATL",
    city: "Atlanta",
    state: "GA",
  },
  {
    location: "Baltimore",
    name: "Orioles",
    abbreviation: "BAL",
    city: "Baltimore",
    state: "MD",
  },
  {
    location: "Boston",
    name: "Red Sox",
    abbreviation: "BOS",
    city: "Boston",
    state: "MA",
  },
  {
    location: "Chicago",
    name: "Cubs",
    abbreviation: "CHC",
    city: "Chicago",
    state: "IL",
  },
  {
    location: "Chicago",
    name: "White Sox",
    abbreviation: "CWS",
    city: "Chicago",
    state: "IL",
  },
  {
    location: "Cincinnati",
    name: "Reds",
    abbreviation: "CIN",
    city: "Cincinnati",
    state: "OH",
  },
  {
    location: "Cleveland",
    name: "Indians",
    abbreviation: "CLE",
    city: "Cleveland",
    state: "OH",
  },
  {
    location: "Colorado",
    name: "Rockies",
    abbreviation: "COL",
    city: "Denver",
    state: "CO",
  },
  {
    location: "Detroit",
    name: "Tigers",
    abbreviation: "DET",
    city: "Detroit",
    state: "MI",
  },
  {
    location: "Houston",
    name: "Astros",
    abbreviation: "HOU",
    city: "Houston",
    state: "TX",
  },
  {
    location: "Kansas City",
    name: "Royals",
    abbreviation: "KCR",
    city: "Kansas City",
    state: "MO",
  },
  {
    location: "Los Angeles",
    name: "Angels",
    abbreviation: "LAA",
    city: "Anaheim",
    state: "CA",
  },
  {
    location: "Los Angeles",
    name: "Dodgers",
    abbreviation: "LAD",
    city: "Los Angeles",
    state: "CA",
  },
  {
    location: "Miami",
    name: "Marlins",
    abbreviation: "MIA",
    city: "Miami",
    state: "FL",
  },
  {
    location: "Milwaukee",
    name: "Brewers",
    abbreviation: "MIL",
    city: "Milwaukee",
    state: "WI",
  },
  {
    location: "Minnesota",
    name: "Twins",
    abbreviation: "MIN",
    city: "Minneapolis",
    state: "MN",
  },
  {
    location: "New York",
    name: "Mets",
    abbreviation: "NYM",
    city: "New York",
    state: "NY",
  },
  {
    location: "New York",
    name: "Yankees",
    abbreviation: "NYY",
    city: "New York",
    state: "NY",  
  },
  {
    location: "Oakland",
    name: "Athletics",
    abbreviation: "OAK",
    city: "Oakland",
    state: "CA",
  },
  {
    location: "Philadelphia",
    name: "Phillies",
    abbreviation: "PHI",
    city: "Philadelphia",
    state: "PA",
  },
  {
    location: "Pittsburgh",
    name: "Pirates",
    abbreviation: "PIT",
    city: "Pittsburgh",
    state: "PA",
  },
  {
    location: "San Diego",
    name: "Padres",
    abbreviation: "SD",
    city: "San Diego",
    state: "CA",
  },
  {
    location: "San Francisco",
    name: "Giants",
    abbreviation: "SF",
    city: "San Francisco",
    state: "CA",
  },
  {
    location: "Seattle",
    name: "Mariners",
    abbreviation: "SEA",
    city: "Seattle",
    state: "WA",
  },
  {
    location: "St. Louis",
    name: "Cardinals",
    abbreviation: "STL",
    city: "St. Louis",
    state: "MO",
  },
  {
    location: "Tampa Bay",
    name: "Rays",
    abbreviation: "TB",
    city: "Tampa Bay",
    state: "FL",
  },
  {
    location: "Texas",
    name: "Rangers",
    abbreviation: "TEX",
    city: "Dallas",
    state: "TX",
  },
  {
    location: "Toronto",
    name: "Blue Jays",
    abbreviation: "TOR",
    city: "Toronto",
    state: "ON",
  },
  {
    location: "Washington",
    name: "Nationals",
    abbreviation: "WAS",
    city: "Washington",
    state: "DC",
  },
]

const teamLogos = [
  {
    name: "Diamondbacks",
    url: "/src/assets/team_logos/ARI/arizona-diamondbacks-logo.svg",
  },
  {
    name: "Braves",
    url: "/src/assets/team_logos/ATL/atlanta-braves-logo.svg",
  },
  {
    name: "Orioles",
    url: "/src/assets/team_logos/BAL/baltimore-orioles-logo.svg",
  },
  {
    name: "Red Sox",
    url: "/src/assets/team_logos/BOS/boston-red-sox-logo.svg",
  },
  {
    name: "Cubs",
    url: "/src/assets/team_logos/CHC/chicago-cubs-logo.svg",
  },
  {
    name: "White Sox",
    url: "/src/assets/team_logos/CHW/chicago-white-sox-logo.svg",
  },
  {
    name: "Reds",
    url: "/src/assets/team_logos/CIN/cincinnati-reds-logo.svg",
  },
  {
    name: "Guardians",
    url: "/src/assets/team_logos/CLE/cleveland-indians-logo.svg",
  },
  {
    name: "Rockies",
    url: "/src/assets/team_logos/COL/colorado-rockies-logo.svg",
  },
  {
    name: "Tigers",
    url: "/src/assets/team_logos/DET/detroit-tigers-logo.svg",
  },
  {
    name: "Astros",
    url: "/src/assets/team_logos/HOU/houston-astros-logo.svg",
  },
  {
    name: "Royals",
    url: "/src/assets/team_logos/KCR/kansas-city-royals-logo.svg",
  },
  {
    name: "Angels",
    url: "/src/assets/team_logos/LAA/los-angeles-angels-logo.svg",
  },
  {
    name: "Dodgers",
    url: "/src/assets/team_logos/LAD/los-angeles-dodgers-logo.svg",
  },
  {
    name: "Marlins",
    url: "/src/assets/team_logos/MIA/miami-marlins-logo.svg",
  },
  {
    name: "Brewers",
    url: "/src/assets/team_logos/MIL/milwaukee-brewers-logo.svg",
  },
  {
    name: "Twins",
    url: "/src/assets/team_logos/MIN/minnesota-twins-logo.svg",
  },
  {
    name: "Mets",
    url: "/src/assets/team_logos/NY/new-york-mets-logo.svg",
  },
  {
    name: "Yankees",
    url: "/src/assets/team_logos/NYY/new-york-yankees-logo.svg",
  },
  {
    name: "Athletics",
    url: "/src/assets/team_logos/OAK/oakland-athletics-logo.svg",
  },
  {
    name: "Phillies",
    url: "/src/assets/team_logos/PHI/philadelphia-phillies-logo.svg",
  },
  {
    name: "Pirates",
    url: "/src/assets/team_logos/PIT/pittsburgh-pirates-logo.svg",
  },
  {
    name: "Padres",  
    url: "/src/assets/team_logos/SD/san-diego-padres-logo.svg",
  },
  {
    name: "Giants",
    url: "/src/assets/team_logos/SF/san-francisco-giants-logo.svg",
  },
  {
    name: "Mariners",
    url: "/src/assets/team_logos/SEA/seattle-mariners-logo.svg",
  },
  {
    name: "Cardinals",
    url: "/src/assets/team_logos/STL/st-louis-cardinals-logo.svg",
  },
  {
    name: "Rays",
    url: "/src/assets/team_logos/TB/tampa-bay-rays-logo.svg",
  },
  {
    name: "Rangers",
    url: "/src/assets/team_logos/TEX/texas-rangers-logo.svg",
  },
  {
    name: "Blue Jays",
    url: "/src/assets/team_logos/TOR/toronto-blue-jays-logo.svg",
  },
  {
    name: "Nationals",
    url: "/src/assets/team_logos/WAS/washington-nationals-logo.svg",
  },
]

console.log("Seeing MLBTeams...")
await MLBTeam.bulkCreate(mlbTeams)
console.log("MLBTeams seeded")

console.log("Seeding TeamLogos...")
await TeamLogo.bulkCreate(teamLogos)
console.log("TeamLogos seeded")

console.log("Database seeded!")

await db.close()