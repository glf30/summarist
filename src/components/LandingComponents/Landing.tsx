import React from "react";
import Image from "next/image";
import landing from "public/assets/landing.png";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Landing = () => {
  const { user } = useUser();
  return (
    <section id="landing">
      <div className="container__wrapper">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don't like to read.
              </div>
              {!!user ? (
                <Link href="for-you" className="btn home__cta--btn">
                  Login
                </Link>
              ) : (
                <SignInButton mode="modal" redirectUrl="/for-you">
                  <button className="btn home__cta--btn">Login</button>
                </SignInButton>
              )}
            </div>
            <figure className="landing__image--mask">
              <Image src={landing} alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
