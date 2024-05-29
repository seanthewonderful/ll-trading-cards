import BaseballCard from "./BaseballCardFront"
import { useState } from "react"

const ChooseTemplate = () => {

  const [template, setTemplate] = useState(null)
  const [templateConfirmed, setTemplateConfirmed] = useState(false)

  return templateConfirmed ? (
    <BaseballCard template={template}/>
  ) : (
    <>
    <div id="choose-template-buttons">
      <button onClick={() => setTemplate("Topps")}>Topps</button>
      <button onClick={() => setTemplate("Upperdeck")}>Upperdeck</button>
      <button onClick={() => setTemplate("ProImage")}>ProImage</button>
      <button onClick={() => setTemplate("Donruss")}>Donruss</button>
      <button onClick={() => setTemplate("Fleer")}>Fleer</button>
      <button onClick={() => setTemplate("Bowman")}>Bowman</button>
    </div>
    <div>
      <button onClick={() => setTemplateConfirmed(true)} disabled={!template}>Continue</button>
    </div>
    </>
  )
}

export default ChooseTemplate