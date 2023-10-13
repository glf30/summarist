import React, { Fragment, useState } from "react";
import Image from "next/image";
import logo from "public/assets/logo.png";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  const { user } = useUser();
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          {!!user ? (
            <Link href="for-you" className="nav__list nav__list--login">Login</Link>
          ) : (
            <SignInButton mode="modal" redirectUrl="/for-you">
              <li className="nav__list nav__list--login">Login</li>
            </SignInButton>
          )}
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
