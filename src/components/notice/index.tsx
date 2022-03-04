import React, { useState, useEffect } from 'react'
import { 알림메세지불러오기 } from '../../mock'

const 알림내용 = () => {
  const [notice, setNotice] = useState()
  useEffect(() => {
    ;(async () => {
      const noticeObj = await 알림메세지불러오기()
      setNotice(noticeObj.content)
    })()
  }, [])
  return <>{notice}</>
}

export default 알림내용
