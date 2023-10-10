import React, { useState } from "react";
import Image from "next/image";
import Footer from "~/components/LandingComponents/Footer";
import pricingImg from "public/assets/pricing-top.png";
import documentImg from "public/assets/document-icon.svg";
import plantImg from "public/assets/plant-icon.svg";
import handsImg from "public/assets/hands-icon.svg";
import downIcon from "public/assets/down-icon.svg";

const ChoosePlanPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openCloseAccordian() {
    // setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="w-full">
        <div className='bg-primary relative mb-6 w-full rounded-b-[16rem] pt-12 text-center before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:content-[""]'>
          <div className="mx-auto my-0 max-w-[1000px] px-6 py-0 text-white">
            <div className="mb-10 text-5xl font-bold">
              Get unlimited access to many amazing books
            </div>
            <div className="mb-8 text-xl">
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className="mx-auto my-0 flex max-w-[340px] justify-center overflow-hidden rounded-t-[180px]">
              <Image src={pricingImg} height={722} width={860} alt="" />
            </figure>
          </div>
        </div>
        <div className="px-auto mx-auto my-0 w-full max-w-[1070px] py-0">
          <div className="w-full py-10">
            <div className="mx-auto mb-14 flex max-w-[800px] flex-col gap-6 text-center md:flex-row">
              <div>
                <figure className="text-primary mb-3 flex justify-center">
                  <Image src={documentImg} alt="" width={60} height={60} />
                </figure>
                <div className="text-[#394547]">
                  <b>Key ideas in a few minutes</b> with many books to read
                </div>
              </div>
              <div>
                <figure className="text-primary mb-3 flex justify-center">
                  <Image src={plantImg} alt="" width={60} height={60} />
                </figure>
                <div className="text-[#394547]">
                  <b>3 million</b> people growing with Summarist every day
                </div>
              </div>
              <div>
                <figure className="text-primary mb-3 flex justify-center">
                  <Image src={handsImg} alt="" width={60} height={60} />
                </figure>
                <div className="text-[#394547]">
                  <b>Precise recommendations</b> curated by experts
                </div>
              </div>
            </div>
            <div className="text-primary mb-8 text-center text-4xl font-bold">
              Choose the plan that fits you
            </div>
            {/* Plan Cards */}
            <div className="mx-auto flex max-w-[680px] cursor-pointer gap-6 rounded border-4 border-[#bac8ce] bg-[#f1f6f4] p-6">
              <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-black"></div>
              <div>
                <div className="text-primary mb-2 text-lg font-semibold">
                  Premium Plus Yearly
                </div>
                <div className="text-primary mb-2 text-2xl font-bold">
                  $99.99/year
                </div>
                <div className="text-sm text-[#6b757b]">
                  7 day free trial included
                </div>
              </div>
            </div>
            {/* seperator */}
            <div className='mx-auto my-6 flex max-w-[240px] items-center gap-2 text-sm text-[#6b757b] before:h-[1px] before:flex-grow before:bg-[#bac8ce] before:content-[""] after:h-[1px] after:flex-grow after:bg-[#bac8ce] after:content-[""]'>
              <div>or</div>
            </div>
            {/* Card */}
            <div className="mx-auto flex max-w-[680px] cursor-pointer gap-6 rounded border-4 border-[#bac8ce] bg-[#f1f6f4] p-6">
              <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-black"></div>
              <div>
                <div className="text-primary mb-2 text-lg font-semibold">
                  Premium Monthly
                </div>
                <div className="text-primary mb-2 text-2xl font-bold">
                  $9.99/month
                </div>
                <div className="text-sm text-[#6b757b]">No trial included</div>
              </div>
            </div>
            <div className="sticky bottom-0 z-[1] flex flex-col items-center gap-4 bg-white py-8 ">
              <button className="text-primary flex h-10 w-full min-w-[180px] max-w-[300px] items-center justify-center rounded bg-[#2bd97c] text-base duration-200 hover:bg-[#20ba68]">
                <span>Start your first month</span>
              </button>

              <div className="text-center text-xs text-[#6b757b]">
                30-day money back guaruntee, no questions asked
              </div>
            </div>
            {/* Accordians */}
            <div
              className="mb-8 overflow-hidden border-b border-[#ddd]"
              onClick={openCloseAccordian}
            >
              <div className="flex cursor-pointer items-center justify-between gap-2 py-6">
                <div className="text-primary relative mb-0 text-2xl font-medium">
                  How does the 7-day free trial work?
                </div>
                <Image
                  src={downIcon}
                  className={` ${isOpen ? "rotate-180" : "rotate-0"} duration-500`}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div
                className={`relative overflow-hidden duration-500 ${
                  isOpen ? "h-24" : "h-0"
                } `}
              >
                <div className="min-h-[1px] pb-6 leading-[1.5] text-[#394547]">
                  Begin your complimentary 7-day trial with a Summarist annual
                  membership. You are under no obligation to continue your
                  subscription, and you will only be billed when the trial
                  period expires. With Premium access, you can learn at your own
                  pace and as frequently as you desire, and you may terminate
                  your subscription prior to the conclusion of the 7-day free
                  trial.
                </div>
              </div>
            </div>

            <div
              className="mb-8 overflow-hidden border-b border-[#ddd]"
              onClick={openCloseAccordian}
            >
              <div className="flex cursor-pointer items-center justify-between gap-2 py-6">
                <div className="text-primary relative mb-0 text-2xl font-medium">
                Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                </div>
                <Image
                  src={downIcon}
                  className={` ${isOpen ? "rotate-180" : "rotate-0"} duration-500`}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div
                className={`relative overflow-hidden duration-500 ${
                  isOpen ? "h-24" : "h-0"
                } `}
              >
                <div className="min-h-[1px] pb-6 leading-[1.5] text-[#394547]">
                While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                </div>
              </div>
            </div>

            <div
              className="mb-8 overflow-hidden border-b border-[#ddd]"
              onClick={openCloseAccordian}
            >
              <div className="flex cursor-pointer items-center justify-between gap-2 py-6">
                <div className="text-primary relative mb-0 text-2xl font-medium">
                What's included in the Premium plan?
                </div>
                <Image
                  src={downIcon}
                  className={` ${isOpen ? "rotate-180" : "rotate-0"} duration-500`}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div
                className={`relative overflow-hidden duration-500 ${
                  isOpen ? "h-24" : "h-0"
                } `}
              >
                <div className="min-h-[1px] pb-6 leading-[1.5] text-[#394547]">
                Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                </div>
              </div>
            </div>

            <div
              className="mb-8 overflow-hidden border-b border-[#ddd]"
              onClick={openCloseAccordian}
            >
              <div className="flex cursor-pointer items-center justify-between gap-2 py-6">
                <div className="text-primary relative mb-0 text-2xl font-medium">
                  Can I cancel during my trial or subscription?
                </div>
                <Image
                  src={downIcon}
                  className={` ${isOpen ? "rotate-180" : "rotate-0"} duration-500`}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div
                className={`relative overflow-hidden duration-500 ${
                  isOpen ? "h-24" : "h-0"
                } `}
              >
                <div className="min-h-[1px] pb-6 leading-[1.5] text-[#394547]">
                You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChoosePlanPage;
