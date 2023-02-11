import "./Notification.css"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
