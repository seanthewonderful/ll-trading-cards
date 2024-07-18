import { toast } from "react-toastify";

const notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message)
      return
    case "info":
      toast.info(message)
      return
    case "warning":
      toast.warning(message)
      return
    case "error":
      toast.error(message)
      return
    default:
      toast(message)
      return
  }
}

export default notify