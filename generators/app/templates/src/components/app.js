import React from 'react'
import autobind from 'autobind-decorator'

import styles from '../css/app.css'

@autobind
export default class App extends React.Component {
  render() {
    return (
      <div className={styles.test}>
        Hello nice
      </div>
    )
  }
}
