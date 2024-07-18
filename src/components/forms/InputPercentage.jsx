

function InputPercentage({ 
  inputVal, 
  setInputVal, 
  min=0, 
  max=1, 
  formName, 
  className, 
  labelName }) {
    
  return (
    <>
    <label htmlFor={formName}>{labelName}</label>
    <input
      type="number"
      id={formName}
      name={formName}
      min={min}
      max={max}
      step={0.001}
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      className={className}
    />
    </>
  )
}

export default InputPercentage