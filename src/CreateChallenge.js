import React, { useState } from 'react'
import agent from './agent'
import Link from './link'

function getDefaultInputValues() {
  return {
    title: '',
    description: ''
  }
}

function CreateChallenge(props) {
  const [inputValues, setInputValues] = useState(getDefaultInputValues())
  const [createdChallenge, setCreatedChallenge] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    console.log(inputValues)
    agent.Challenge.Create({title: inputValues.title, description: inputValues.description}).then((result) => {
      setCreatedChallenge(result.body)
    }).catch((err) => {
      console.log("err creating the challenge: " + err)
    })
  }

  function onValueChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  }

  console.log("Render create challenge, inputValues: " + JSON.stringify(inputValues))
  return (
    <div>
      <form className="flex flex-col" onSubmit={onSubmit} >
        <p>Title</p>
        <input className="generic-container" type="text" name="title" onChange={onValueChange} />
        <p>Description</p>
        <textarea className="generic-container" type="text" name="description" onChange={onValueChange} />
        <input className="btn btn-green self-center" disabled={!inputValues.title | !inputValues.description} type="submit" name="Create" />
        { createdChallenge &&
        <p>Click <Link to={`/challenges/${createdChallenge.slug}`}>here</Link> to go to the created challenge.</p>
        }
      </form>
    </div>)
}

export default CreateChallenge