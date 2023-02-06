import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <>
      {notification.length > 0 &&
        <div style={style}>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification
