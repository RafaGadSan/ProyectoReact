import Swal from "sweetalert2/dist/sweetalert2.all.js"

export const useLoginError = (res, setRes, userLogin, setLoginOk) => {
  // Res 200
  if (res?.status == 200) {
    const dataCustom = {
      // creamos una funcion para "coger" la informacion que necesitamos
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      role: res.data.user.role,
      _id: res.data.user._id,
    }
    const stringUser = JSON.stringify(dataCustom) // cpnvertimos la data que hemos cogido a string (viene como objeto)
    userLogin(stringUser) //le pasamos al userLogin la data en forma de string
    setLoginOk(() => true) // seteamos el estado a true

    Swal.fire({
      icon: "success",
      title: "welcome to my Page",
      text: "Login ok",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // res 404 (user no registrado)

  if (res?.response?.data?.includes("User no register")) {
    // si la respuesta incluyeuser no register
    setRes(() => ({})) // seteamos la funcion y mandamos una alerta
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unregistered user",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // res 404 password equivocada
  if (res?.response?.data?.includes("password dont match")) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error!",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // res 500
  if (res?.response?.status == 500) {
    setRes(() => ({}))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error",
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
