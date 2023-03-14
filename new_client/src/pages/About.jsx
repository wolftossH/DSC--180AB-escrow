import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import { Link, useNavigate } from "react-router-dom";


import { dApps, flow, website } from '../assets';
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
              <Link to="https://github.com/wolftossH/DSC--180AB-escrow/blob/main/report.pdf"
              target="_blank"
                className="mx-auto mb-20 max-w-[600px] text-base text-[#e4e4e4] sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed"
              >
                Report
              </Link>
              <p className="mx-auto mb-20 max-w-[600px] text-base text-[#e4e4e4] sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed"
>

</p>
              {/* <Link to="/about"  className="mr-5 my-2 text-lg"> 
          Report
        </Link> */}
          </div>
        </div>
      </div>
    </div>


    <section
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px] ml-16 mr-16"
    >
      <div className="ml-10 mr-10 text-">
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
                  <p className="mb-9 text-xs leading-relaxed text-body-color">
                  Conventional software and website services are facing challenges as
                  Blockchain-based Applications (o.e. dApps) provide high data integrity,
                  transparent workflow, and are essentially free from the control of single authority (e.g. IT corporations, service providers).
                  The online marketplace and escrow system shows great potential  to be incorporated with emerging blockchain technology.
                 We aim to  create a decentralized, blockchain-based online marketplace to provide secure online transactions and comfortable
                  online shopping experiences for users while guaranteeing high degrees of user anonymity and autonomy.
                  </p>
                  <p className="mb-9 text-xs leading-relaxed text-body-color">
                  We divided our task into two parallel portions, the front-end escrow client building, and the back-end smart contract development.To create the  escrow system and user-interactive platform, we developed a smart contract with  Solidity to accommodate transactions between multiple users, established a front-end client hosted on a website based on Thirdweb, and utilized the node-based interplanetary file system for data storage and sharing. Together, users can navigate the autonomous marketplace and shop as they would on a conventional shopping site with cryptocurrency, which should allow higher degrees of security and privacy and charge minimal service fees.                   </p>
                </div>
                <div className="text-center">
                  <div className="relative z-10 inline-block mr-20">
                  <img
                      src={dApps}
                      alt="image"
                      className="mx-auto lg:ml-auto"
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
      className="bg-[#f0e9f5] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px] ml-16 mr-16 mt-20"
    >
      <div className="ml-10 mr-10 text-left">
        <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
          <div className="-mx-4">
            <div className="w-full">
              <div
                className="items-center justify-between overflow-hidden lg:flex"
              >
                <div className="text-center">
                  <div className="relative z-10 inline-block">
                  <img
                      src={flow}
                      alt="image"
                      className="mx-auto lg:ml-auto"
                    />
                  </div>
                </div>
                <div
                  className="w-full py-12 px-7 sm:px-12 md:p-16 lg:max-w-[565px] lg:py-9 lg:px-16 xl:max-w-[640px] xl:p-[55px]"
                >
                  <h2
                    className="mb-6 text-2xl font-bold text-dark sm:text-4xl sm:leading-snug 2xl:text-[40px]"
                  >
                    Smart Contract
                  </h2>
                  <p className="mb-9 text-xs leading-relaxed  text-body-color">
                 
                  The objective of our project was to provide advanced
                  functionalities for the transaction system and multiple utility features for the website. This was achieved by developing a smart contract using Solidity and the Remix IDE, which was later deployed on the Goerli Ethereum testnet. It was designed to enable buyers and sellers to interact through different actions such as posting products for sale, making deposits, canceling transactions, and sending confirmations at each step. Additionally, the smart contract securely holds funds until the buyer receives the item and all conditions of the contract are met. The unit of transaction in the contract is Wei, which is the smallest denomination of ether. 

                  </p>
                  <p className="mb-9 text-xs leading-relaxed text-body-color">
                  We started with developing a contract that created a sub-contract for every transaction between seller and buyer. To lower the frequency of gas fees due to the high amount of transactions, we revised the contract to allow multiple sellers and buyers to transact under the same single contract. This was achieved through the use of mapping and structs to keep track of all current and past transactions. The smart contract achieves functionalities to enable creating products, joining transactions, and step-wise confirmations  by buyers and sellers, respectively. To address some restrictions of the structure of variables (Structs) in Solidity, we differentiated between product information that should be visible in the interface and those used to keep track of user status in the backend. To facilitate the integration of contract and user client, we also adapted some of the view functions and state variables based on feedback from the frontend.
                  </p>                
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]  ml-16 mr-16  mt-20"
    >
      <div className="ml-10 mr-10 text-left">
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
                    Website
                  </h2>
                  <p className="mb-9 text-xs leading-relaxed text-body-color">
                  The marketplace system comprises the front-end client that facilitates communication between the users and provides an easy way for users to connect to the various tools and applications (e.g. MetaMask, Etherscan, etc).  Users will be guided to connect to their cryptocurrency wallet, after which they will be able to check connection status to the wallet, view a display of currently available products (like typical online shopping websites), and interact with actionable buttons for current transactions (e.g. join, confirm, cancel, etc). 
                  </p>
                  <p className="mb-9 text-xs leading-relaxed text-body-color">
                  The frontend web page is built upon Javascript with relevant libraries and tools (e.g. React and Vite). We also utilized certain blockchain specific applications to enhance usability and data retrieval efficiency, such as Thirdweb SDK and IPFS. Furthermore, we added elements with Tailwind CSS to achieve better visuality and interactivity of the website.                   </p>
                </div>
                <div className="text-center">
                  <div className="relative z-10 inline-block mr-20">
                  <img
                      src={website}
                      alt="image"
                      className="mx-auto lg:ml-auto"
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
      className="bg-[#f3f4fe] pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]  ml-16 mr-16  mt-20"
    >
      <div className="ml-20 mr-20 text-center">
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
                  <p className="mb-9 text-base leading-relaxed text-body-color ml-5 mr-5">
                  Throughout our progress, we have successfully developed iterations of smart contracts to accommodate evolving demands of functionalities of the escrow system. We designed and deployed the front end client as a ascetic, discoverable website, and we established stable connections to multiple other decentralized applications (e.g. Metamask, Etherscan) to ensure a fluent, comfortable user action flow when making transactions in the system. The team also put effort into user testing and refining the website in different considerations, such as shifting from built-in Struct to more scalable data storage schemas (i.e. ipfs) after discovering the issues in data retrieval. 
                  </p>

                  <p className="mb-9 text-base leading-relaxed text-body-color ml-5 mr-5">
                  We also look forward to accomplishing more actionables in the future iterations of the website. For example, we aim to expand the scale of user testing to test the capabilities of our client in handling increasing numbers of visitors and transactions. As we have implemented preliminary reviews and rating systems associated with products, we also plan to develop more comprehensive functionalities to fully expand these features. 
                  </p>
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