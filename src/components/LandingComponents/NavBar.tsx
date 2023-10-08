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
