import Swal from "sweetalert2/dist/sweetalert2.all.js"

export const useForgotPasswordError = (res, setRes, setForgotOK) => {
  //! Para un 200
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOK(() => true)
      setRes(() => ({}))
      Swal.fire({
        icon: "success",
        title: "Change password ok",
        text: "Send email with your new password ",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  //! Para un 404 de usuario no registrado

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("User no register")
  ) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter a valid email address",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  //! Para un 404 email no enviado ni usuario actualizado

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("dont send email and dont update user")
  ) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No update password, Try again, please",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  //!Para un 404 Se cambia la password pero no se actualiza user

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Error send incorrect email",
      text: "Your email isn't valid, we don't change your password ",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  //! Error 500

  if (res?.response?.status == 500) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error , please try again ",
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
