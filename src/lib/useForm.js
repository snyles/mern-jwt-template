import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // create buffer variable to avoid infinite update loop with useEffect
  // important in update components for example when form starts with data
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
    // eslint-disable-next-line
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') value = parseInt(value);
    if (type === 'file') [value] = e.target.files;
    setInputs({
      // copy existing state
      ...inputs,
      // update state for the form element that has changed
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from the custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
