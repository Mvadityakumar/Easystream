import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useSessionRefresher = () => {
  const [cookies, setCookie] = useCookies(['user','email'])

  useEffect(() => {
    const refreshSession = () => {
      if (cookies.user) {
        const newExpiry = new Date(new Date().getTime() + 15 * 60 * 1000) // 30 mins
        setCookie('user', cookies.user, { path: '/', expires: newExpiry })
        setCookie('email', cookies.email, { path: '/', expires: newExpiry })
      }
    }

    const activityEvents = ['click', 'mousemove', 'keydown']
    activityEvents.forEach((event) =>
      window.addEventListener(event, refreshSession)
    )

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, refreshSession)
      )
    }
  }, [cookies.user, setCookie])
}

export default useSessionRefresher
