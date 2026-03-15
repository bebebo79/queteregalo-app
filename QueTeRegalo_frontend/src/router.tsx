import {BrowserRouter,  Routes, Route} from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import DashboardView from './view/DashboardView'
import LoginView from './view/AuthView/LoginView'
import CreateAccountView from './view/AuthView/CreateAccountView'
import ForgotPasswordView from './view/AuthView/ForgotPasswordView'
import ConfirmAccountView from './view/AuthView/ConfirmAccounViewt'
import NewPasswordView from './view/AuthView/NewPasswordView'
import AuthLayout from './layout/AuthLayout'
import ProfileView from './view/ProfileV/ProfileView'
import ProfileCreateView from './view/ProfileV/ProfileCreateView'
import PresentCreateView from './view/PresentView/PresentCreateView'





export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element= {<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index />
                    <Route path='/presents-create' element={<PresentCreateView/>}/>
                    <Route path='/create-profile' element={<ProfileCreateView/>}/>
                    <Route path='/profile' element={<ProfileView/>}/>
                </Route>
                

                <Route element= {<AuthLayout/>}>
                       <Route path='auth/login' element={<LoginView/>}/>
                       <Route path='auth/create-account' element={<CreateAccountView/>}/>            
                       <Route path='auth/forgot-password' element={<ForgotPasswordView/>}/>
                       <Route path='auth/confirm-account' element={<ConfirmAccountView/>}/>
                        <Route path='auth/new-password' element={<NewPasswordView/>}/>   
                </Route>      
                   
                
            </Routes>           
                       
               
            
        
        
        </BrowserRouter>
         
    )
}