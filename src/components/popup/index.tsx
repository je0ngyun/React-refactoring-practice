import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

interface PopupProps {
  render?: JSX.Element
  cancelButton?: boolean
}

class Deferred {
  resolve: any
  reject: any
  promise: Promise<any>
  then: Function
  catch: Function
  constructor() {
    this.promise = new Promise<any>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.then = this.promise.then.bind(this.promise)
    this.catch = this.promise.catch.bind(this.promise)
  }
}

const 팝업창열기 = async ({ render, cancelButton = true }: PopupProps) => {
  const deferred = new Deferred()
  const node = document.createElement('div')
  document.body.appendChild(node)

  const handleConfirm = () => {
    ReactDOM.unmountComponentAtNode(node)
    deferred.resolve(true)
    node.remove()
  }

  const handleCancle = () => {
    ReactDOM.unmountComponentAtNode(node)
    deferred.resolve(false)
    node.remove()
  }

  const PopupContent = () => {
    return (
      <div className="popup-container">
        <div className="popup">
          {render && <div>{render}</div>}
          <button onClick={handleConfirm}>확인</button>
          {cancelButton && <button onClick={handleCancle}>취소</button>}
        </div>
      </div>
    )
  }

  ReactDOM.render(<PopupContent />, node)
  return await deferred
}
export default 팝업창열기
