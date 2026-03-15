import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { Cog8ToothIcon} from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import type {  User } from '../../types'
import { useProfile } from '../../hooks/UseProfile'


type NavMenuProps = {
  name: User['name'],
 
}


export default function NavMenu( {name} :  NavMenuProps) {

  // para comprobar si el perfil ya esta creado
  const {data} = useProfile()



  const queryClient = useQueryClient()
  const logout = ()=>{
    // eliminar el token
    localStorage.removeItem('AUTH_TOKEN')
    // invalidar el query
    queryClient.invalidateQueries({queryKey : ['user']})
  }



  return (
    <Popover className="relative">
      <div className='flex justify-between gap-5'>
        <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-[#ff7a70] cursor-pointer">
            <Cog8ToothIcon className='w-8 h-8 text-white ' />
        </PopoverButton>
      <h2 className='mt-4 text-[#ff7a70] text-2xl'>Hola {name}</h2>

      </div>
      

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-[#8E5CA2] p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            
            
            <Link
              to={data ? '/profile' : '/create-profile'}
              className='block p-2 hover:text-purple-950 text-white'
            >
              Mi Perfil
            </Link>
            
            
            
            <button
              className='block p-2 hover:text-purple-950 cursor-pointer text-white'
              type='button'
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}