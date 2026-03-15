import server from "./server"
import colors from "colors"

// generamos el puerto
const port = process.env.PORT || 4000


//conectamos el servidor con el puerto

server.listen(port, ()=>{
    console.log(colors.cyan.bold(`REST API conectado en el puerto ${port}`))
})
