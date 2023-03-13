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
      className="relative overflow-hidden pt-[120px] md:pt-[130px] lg:pt-[160px]"
    >
        <div className="mx-4 flex flex-wrap items-center">
        <div className="w-full px-4">
          <div
            className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
            data-wow-delay=".2s"
          >
            <h1
              className="mb-8 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug"
            >
              Escryptow: Design and Implementation of an E-commerce Dapp              </h1>

          </div>
        </div>
      </div>
    </div>


    <section
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
    >
      <div className="ml-20 mr-20 text-">
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
                  Conventional software and website services are facing challenges as
                  Blockchain-based Applications (o.e. dApps) provide high data integrity,
                  transparent workflow, and are essentially free from the control of single authority (e.g. IT corporations, service providers).
                  The online marketplace and escrow system shows great potential  to be incorporated with emerging blockchain technology.
                 We aim to  create a decentralized, blockchain-based online marketplace to provide secure online transactions and comfortable
                  online shopping experiences for users while guaranteeing high degrees of user anonymity and autonomy.
                  </p>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                  We divided our task into two parallel portions, the front-end escrow client building, and the back-end smart contract development.To create the  escrow system and user-interactive platform, we developed a smart contract with  Solidity to accommodate transactions between multiple users, established a front-end client hosted on a website based on Pinata, and utilized the node-based interplanetary file system for data storage and sharing. Together, users can navigate the autonomous marketplace and shop as they would on a conventional shopping site with cryptocurrency, which should allow higher degrees of security and privacy and charge minimal service fees.                   </p>
                </div>
                <div className="text-center">
                  <div className="relative z-10 inline-block mr-20">
                  <img
                      src="../../images/dApps.png"
                      alt="image"
                      class="mx-auto lg:ml-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="bg-[#f0e9f5] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
    >
      <div className="ml-20 mr-20 text-right">
        <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="items-center justify-between overflow-hidden border lg:flex"
              >
                <div className="text-center">
                  <div className="relative z-10 inline-block mr-20">
                  <img
                      src="../../images/flow.png"
                      alt="image"
                      class="mx-auto lg:ml-auto"
                    />
                  </div>
                </div>
                <div
                  className="w-full py-12 px-7 sm:px-12 md:p-16 lg:max-w-[565px] lg:py-9 lg:px-16 xl:max-w-[640px] xl:p-[70px]"
                >
                  <h2
                    className="mb-6 text-3xl font-bold text-dark sm:text-4xl sm:leading-snug 2xl:text-[40px]"
                  >
                    Smart Contract
                  </h2>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                 
                  The objective of our project was to provide advanced functionalities for the transaction system and multiple utility features for the website. This was achieved by developing a smart contract using Solidity and the Remix IDE, which was later deployed on the Goerli Ethereum testnet. It was designed to enable buyers and sellers to interact through different actions such as posting products for sale, making deposits, canceling transactions, and sending confirmations at each step. Additionally, the smart contract securely holds funds until the buyer receives the item and all conditions of the contract are met. The unit of transaction in the contract is Wei, which is the smallest denomination of ether. 

                  </p>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                  We divided our task into two parallel portions, the front-end escrow client building, and the back-end smart contract development.To create the  escrow system and user-interactive platform, we developed a smart contract with  Solidity to accommodate transactions between multiple users, established a front-end client hosted on a website based on Pinata, and utilized the node-based interplanetary file system for data storage and sharing. Together, users can navigate the autonomous marketplace and shop as they would on a conventional shopping site with cryptocurrency, which should allow higher degrees of security and privacy and charge minimal service fees.                   </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
    >
      <div className="ml-20 mr-20 text-">
        <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="items-center justify-between overflow-hidden border lg:flex"
              >
                <div
                  className="w-full py-12 px-7"
                >
                  <h2
                    className="mb-6 text-3xl text-center font-bold text-dark sm:text-4xl sm:leading-snug 2xl:text-[40px]"
                  >
                    Conclusion
                  </h2>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                  Conventional software and website services are facing challenges as
                  Blockchain-based Applications (o.e. dApps) provide high data integrity,
                  transparent workflow, and are essentially free from the control of single authority (e.g. IT corporations, service providers).
                  The online marketplace and escrow system shows great potential  to be incorporated with emerging blockchain technology.
                 We aim to  create a decentralized, blockchain-based online marketplace to provide secure online transactions and comfortable
                  online shopping experiences for users while guaranteeing high degrees of user anonymity and autonomy.
                  </p>
                  <p className="mb-9 text-base leading-relaxed text-body-color">
                  We divided our task into two parallel portions, the front-end escrow client building, and the back-end smart contract development.To create the  escrow system and user-interactive platform, we developed a smart contract with  Solidity to accommodate transactions between multiple users, established a front-end client hosted on a website based on Pinata, and utilized the node-based interplanetary file system for data storage and sharing. Together, users can navigate the autonomous marketplace and shop as they would on a conventional shopping site with cryptocurrency, which should allow higher degrees of security and privacy and charge minimal service fees.                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        </div>
    )
}

export default About