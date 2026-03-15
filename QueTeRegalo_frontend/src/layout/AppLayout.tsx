import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "../componets/Logo";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/UseAuth";
import NavMenu from "../componets/App/NavMenu";



export default function AppLayout() {
    const {data,isError, isLoading} = useAuth()

    if(isLoading) return 'Cargando....'
    console.log(data)
    if(isError) return <Navigate to={'auth/login'}/>
     
  if(data) return (
    <>
        <header className='bg-[#006d77] py-5'>
            <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center '>
                <div>
                    <Link to={'/'}>
                        <Logo />

                    </Link>
                    
                </div>
                <div className="m-9">
                    <NavMenu name= {data.name}/>
                </div>
                
            </div>

        </header>
        <section className='max-w-screen-2xl mx-auto p-5 bg-[#FF7A70]'>
            <Outlet/>
        </section>
        <footer className='py-5 bg-[#a8e6cf]'>
            <p className='text-center text-black '>
                Todos los Derechos Reservados {new Date().getFullYear()}
            </p>

        </footer>
        
        <ToastContainer
            pauseOnFocusLoss={false}
            pauseOnHover={false}        />
    
    
    
    </>
   
  )
}

