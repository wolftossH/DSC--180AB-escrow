import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'

const About = () => {

  return (
    // <div className='flex w-full justify-center items-center'>
    //   <h1 className="text-4xl sm:text-4xl text-white py-2">
    //     Escryptow: Design and Implementation of an E-commerce Dapp
    //   </h1>
    // </div>

    <div>


   
    <div
      id="home"
      className="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div
              className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
              data-wow-delay=".2s"
            >
              <h1
                className="mb-8 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug"
              >
                Escryptow: Design and Implementation of an E-commerce Dapp              </h1>
              <p
                className="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4] sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed"
              >
                Multidisciplinary Web Template Built with Your Favourite
                Technology - HTML Bootstrap, Tailwind and React NextJS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <section
      id="about"
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="items-center justify-between overflow-hidden border lg:flex"
              >
                <div
                  className="w-full py-12 px-7 sm:px-12 md:p-16 lg:max-w-[565px] lg:py-9 lg:px-16 xl:max-w-[640px] xl:p-[70px]"
                >
                  <h2
                    className="mb-6 text-3xl font-bold text-dark sm:text-4xl sm:leading-snug 2xl:text-[40px]"
                  >
                    Introduction
                  </h2>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                  {/* The online marketplace and escrow system. show great potential to be incorporated with and benefit tremendously from emerging blockchain technology. In this project, we aim to creates a decentralized, blockchain-based online marketplace. The goal of the website is to provides secure online transaction and comfortable online shopping experiences for users while guaranteeing high degrees of user anonymity and autonomy. To create the escrow system and user- interactive platform, we developed smart contract based on Solidity to accommodate user - user transactions and established front- end website on Pinata, an interplanetary file system based node service provider. Together, user can navigate the autonomous marketplace as they would on a conventional shopping site while using cryptocurrency for product exchange */}
                  </p>
                </div>
                <div className="text-center">
                  <div className="relative z-10 inline-block">
                  The online marketplace and escrow system. show great potential to be incorporated with and benefit tremendously from emerging blockchain technology. In this project, we aim to creates a decentralized, blockchain-based online marketplace. The goal of the website is to provides secure online transaction and comfortable online shopping experiences for users while guaranteeing high degrees of user anonymity and autonomy. To create the escrow system and user- interactive platform, we developed smart contract based on Solidity to accommodate user - user transactions and established front- end website on Pinata, an interplanetary file system based node service provider. Together, user can navigate the autonomous marketplace as they would on a conventional shopping site while using cryptocurrency for product exchange
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
{/* sdfsdf */}

        </div>
    )
}

export default About