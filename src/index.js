import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEllipsisV, faChevronLeft, faTimes, faBars, faCircle, faCheckCircle, faTimesCircle, faCommentAlt, faQuestion } from '@fortawesome/free-solid-svg-icons'
import ReactModal from 'react-modal'
import App from './App'

const rootId = 'root'
ReactModal.setAppElement(`#${rootId}`)

library.add(faSearch, faEllipsisV, faChevronLeft, faTimes, faBars, faCircle, faCheckCircle, faTimesCircle, faCommentAlt, faQuestion)

ReactDOM.render(<App />,
  document.getElementById(rootId)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();