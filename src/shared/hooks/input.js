import { useState } from 'react'

// USAGE:
//
// export function NameForm(props) {
//   const [value, bind, reset] = useInput('')
  
//   const handleSubmit = (evt) => {
//       evt.preventDefault()
//       alert(`Submitting Name ${value}`)
//       reset()
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" {...bind} />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   )
// }
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  return [
    value,
    {
      value,
      onChange: event => {
        setValue(event.target.value)
      }
    },
    () => setValue(''),
    setValue,
  ]
}
