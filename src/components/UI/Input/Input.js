import React from 'react'
import classes from './Input.module.css'
const input = (props) => {

  let inputElement = null
  const inputClasses = [classes.InputElement]
  if(props.invalid && props.shouldValidate && props.touched) {
	 inputClasses.push(classes.Invalid)
  }
  switch (props.elementType) {
    case ('input'):
      inputElement =
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      break
    case ('textarea'):
      inputElement =
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      break
    case ('select'):
      inputElement =
        <select
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          onChange={props.handleChange}

        >
          {
            props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>{option.displayValue} </option>
            ))
          }

        </select>
      break
    default:
      inputElement =
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      break
  }
  return (
    <div className={classes.Input}>
      <label
        className={classes.Label}
      />
      {inputElement}
    </div>)
}
export default input
