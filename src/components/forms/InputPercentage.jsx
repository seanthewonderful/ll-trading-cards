

function InputPercentage({ inputVal, setInputVal, min, max, formName, className, labelName, decimals }) {
  return (
    <>
    <label htmlFor={formName}>{labelName}</label>
    <input
      type="number"
      id={formName}
      name={formName}
      min={min}
      max={max}
      step={decimals}
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      className={className}
    />
    </>
  )
}

export default InputPercentage