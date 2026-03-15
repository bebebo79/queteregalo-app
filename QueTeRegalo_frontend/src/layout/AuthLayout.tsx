import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"


export default function AuthLayout() {
  return (
    <>
      <div className="bg-[#006d77] min-h-screen">
          
          <div className="py-10 lg:py-8 mx-auto w-full max-w-[450px] px-5">
            <div className="m-5">
              <Outlet />
            </div>
          </div>

          
      </div>

      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

