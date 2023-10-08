import React, { Fragment, useState } from "react";
import Image from "next/image";
import logo from "public/assets/logo.png";
import { SignInButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <SignInButton mode="modal">
            <li className="nav__list nav__list--login">Login</li>
          </SignInButton>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

// export function LoginModal() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleConfirm = () => {
//     closeModal();
//   };

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <li className="nav__list nav__list--login" onClick={openModal}>
//         Login
//       </li>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 {/* <Dialog.Title
//                     as="h3"
//                     className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900"
//                   >
//                     LOGIN/SIGN UP
//                   </Dialog.Title> */}
//                   <SignIn />
//                   {/* <span>or Continue as Guest</span> */}
//                 </Dialog.Panel>
//                 {/* <div className="bg-white ">
//                   <SignInButton mode="modal"><button>Login</button></SignInButton>
//                   <span>or Continue as Guest</span>
//                 </div> */}

//                 {/* <SignInButton mode="modal"><button>Continue As Guest</button></SignInButton> */}
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
