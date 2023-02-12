import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return <Alert variant={notification.type}>{notification.message}</Alert>
}

export default Notification
