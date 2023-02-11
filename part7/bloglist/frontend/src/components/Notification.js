import "./Notification.css"
import { useSelector } from "react-redux"

const Notification = () => {
  const state = useSelector((state) => state)
  const notification = useSelector((state) => state.notification)
  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
