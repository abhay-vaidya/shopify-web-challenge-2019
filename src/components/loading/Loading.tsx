import React from 'react'
import loadingIcon from '../../assets/loading.gif'
import './Loading.scss'

export default () => {
  return (
    <div className="loading">
      <img src={loadingIcon} alt="loading" />
    </div>
  )
}
