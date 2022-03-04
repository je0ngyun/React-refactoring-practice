import React, { useRef, useState, useEffect } from 'react'
import type { User } from '../../mock/'
import { 유저정보불러오기, 예약요청 } from '../../mock/'
import 팝업창열기 from '../popup/'
import 알림내용 from '../notice'

type ReservationProps = {
  title: string
}

const Reservation = ({ title }: ReservationProps) => {
  const [user, setUser] = useState<User>()
  const datePicker = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ;(async () => {
      const user = await 유저정보불러오기()
      setUser(user)
    })()
  })

  const 알림팝업열기 = async () => {
    if (!user?.tos) {
      return await 팝업창열기({ render: <알림내용 /> })
    }
    return true
  }

  const 예약요청하기 = async () => {
    const { userName } = user as User
    const date = datePicker.current?.value as string
    const res = await 예약요청({ userName, date })
    return res.success
  }

  const 예약완료팝업열기 = async () => {
    const date = datePicker.current?.value as string
    await 팝업창열기({
      render: <div>{`${date} 예약완료`}</div>,
      cancelButton: false,
    })
  }

  const 예약실패팝업열기 = async () => {
    await 팝업창열기({ render: <div>{`예약실패`}</div>, cancelButton: false })
  }

  const handle예약 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(await 알림팝업열기()) && (await 예약요청하기())
      ? await 예약완료팝업열기()
      : await 예약실패팝업열기()
  }

  return (
    <section>
      <h2>{title}</h2>
      <form onSubmit={handle예약}>
        <input ref={datePicker} type="date" />
        <button type="submit">예약</button>
      </form>
    </section>
  )
}

Reservation.defaultProps = {
  title: 'Example',
}

export default Reservation
