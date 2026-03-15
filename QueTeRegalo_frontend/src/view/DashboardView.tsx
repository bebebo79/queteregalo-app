import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../hooks/UseAuth"
import { getPresents } from "../api/PresentsApi"
import { Link } from "react-router-dom"
import type { Present } from "../types"




export default function DashboardView() {

  //necesitamos que el usuario este autenticado
  const {data:user, isLoading:authLoading} = useAuth()

  //useQuery para utilizar el get y traer todos los regalos
  const {data, isLoading} = useQuery<Present[]>({
    queryKey : ["presents"],
    queryFn: getPresents
  })
 

  if(isLoading  || authLoading) return 'Cargando....'  

  const presents = data ?? []

  if(!user) return null
  return (
    <>
        <h1 className="text-5xl font-black text-[#006d77]">Mi lista de Regalos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Administra tus Regalos
        </p>

        <nav className="my-5">
          <Link
            className="bg-[#025961] hover:bg-[#235d63] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer rounded"
            to="/presents-create"
          >
            Nuevo Regalo
          </Link>
        </nav>
        {presents.length ? (
          <ul role="list" className="divide-y divide-[#f1e3d5] border border-[#f1e3d5] mt-10 bg-[#025961] shadow-lg rounded-2xl">
              {presents.map((present)=>(
                <li key={present.id} className="flex justify-between gap-x-6 px-5 py-10">
                    <div className="flex min-w-0 gap-x-4" >
                      
                      

                      <div className="min-w-0 flex-auto space-y-2" >
                           
                          <div>
                              <img src={`${present.category.name}.png`} alt="icono categoria" className="w-10" />

                            </div>
                          <Link 
                              to={`/presents/${present.id}`}
                              className="text-white cursor-pointer font-black">
                      
                              {present.description}
                      
                      
                          </Link>  
                          
                          {present.option === 'deseable' ? (
                            <p className="text-green-400">¡¡¡ LO QUIERO ¡¡¡¡</p>
                          ):(
                            <p className="text-red-400">¡¡¡¡¡ NO LO QUIERO ¡¡¡¡¡</p>
                          )}
                          

                      </div>

                    </div>
                </li>
              ))}
          </ul>
        ):(
          <p className="text-center py-20 text-white">
            No hay ningún regalo todavía {""}
            <Link className="text-[#006d77] font-bold" to ="/presents-create">
              Añadir Regalo
            </Link>
          </p>
        )}
    </>
    
    
  )
}

