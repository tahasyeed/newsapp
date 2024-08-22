import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
      return (
          <div className="text-center d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
