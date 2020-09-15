import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import agent from './agent'
import ChallengePreview from './challengePreview';

function Search(props) {
  const [query, setQuery] = useState('')
  const [inputText, setInputText] = useState('')
  // search box, with search query state
  // button that gives searchQuery down to child
  function onSubmit(e) {
    e.preventDefault()

    setQuery(inputText)
  }

  return (<div>
    <form onSubmit={onSubmit} >
      <input className="block p-2 m-auto border-gray-600 border-2" type="text" name="query" onChange={(e) => setInputText(e.target.value)} />
      <input className="my-2 btn btn-green block m-auto" type="submit" value="Search" />
    </form>
    <SearchResult searchQuery={query} />
  </div>)
}

function SearchResult(props) {
  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    console.log("useEffect called")
    if (props.searchQuery) {
      agent.Challenges.Search(props.searchQuery).then((result) => {
        setChallenges(result.body.challenges)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      setChallenges([])
    }
  }, [props.searchQuery])

  if (!props.searchQuery) {
    return <div></div>
  }

  if (!challenges.length) {
    return <p className="mt-2 m-auto">No results</p>
  }

  return (
    <ul className="challenge-list">
      {challenges.map(challenge =>
        <li>
          <ChallengePreview key={challenge.slug} slug={challenge.slug} title={challenge.title} author={challenge.author} description={challenge.description} />
        </li>
      )}
    </ul>)
}

export default Search;