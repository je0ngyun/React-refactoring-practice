interface User {
  userName: string
  hasCoupon: boolean
  tos: false
}

interface ReservationReq {
  userName: string
  date: string
}

const 유저정보불러오기 = (): Promise<User> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ userName: 'user', hasCoupon: true, tos: false })
    }, 500)
  })
}

const 알림메세지불러오기 = (): Promise<any> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ content: '알림메세지' })
    }, 500)
  })
}

const 예약요청 = (info: ReservationReq): Promise<any> => {
  console.log('예약요청')
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ success: true })
    }, 500)
  })
}
export type { User }
export { 유저정보불러오기, 알림메세지불러오기, 예약요청 }
