
function InputNumber({ inputVal, setInputVal, min, max, formName, className, labelName }) {

  return (
    <section id="input-number">
      <input
        type="number"
        id={formName}
        name={formName}
        min={min}
        max={max}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className={className}
      />
      <label htmlFor={formName}>{labelName}</label>
    </section>
  )
}

export default InputNumber