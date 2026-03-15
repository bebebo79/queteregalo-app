import express from 'express';
import db from './config/db';
import colors from 'colors' 
import authRouter from './routes/authRouter'
import profileRouter from './routes/profileRouter'
import cors from 'cors'
import { corsConfig } from './config/cors';
import categoryRouter  from './routes/categoryRouter'
import presentRouter from './routes/presentRouter'





// instancia de express
const app = express();

//habilitar la lectura del json
app.use(express.json())

//para cors
app.use(cors(corsConfig))

//conectamos con las url
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/category', categoryRouter)
app.use('/api/presents', presentRouter )



// conexion con la base de datos
export const dbConnect = async () => {
  try {
    await db.authenticate();
    await db.sync({alter:true});//  // agrego force para rehacer la sincronización por si la tabla tiene cambios.
        console.log(colors.magenta.bold('Conectado a la Base de Datos'))
  } catch (error) {
    // console.error(error);
    console.log('Hubo un Error al conectar la DB')
  }
};
 
dbConnect();



 
export default app;