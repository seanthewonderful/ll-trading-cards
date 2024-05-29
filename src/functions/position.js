export default function calculatePosition(posNum) {
  switch (posNum) {
    case 1:
      return "pitcher"
    case 2: 
      return "catcher"
    case 3:
      return "first base"
    case 4: 
      return "second base"
    case 5:
      return "third base"
    case 6:
      return "shortstop"
    case 7: 
      return "left field"
    case 8:
      return "center field"
    case 9:
      return "right field"
    default: 
      return ""
  }
}