import React from 'react'

function Home() {
  return (
    <>
      <section id="home" className="">
        <img className="image_holder" src='./doc.jpg' alt='None'></img>
        {/* <div className="hero-section w-screen h-screen bg-gradient-to-b from-green-500 to-green-800 bg-opacity-70"></div> */}
        <div Style="position: absolute;z-index:-100; width: 100%; height: 800px; left: 0; top: 0; background: linear-gradient(180deg, #52AF7B 0%, rgba(4, 127, 112, 0.7) 100%);"></div>

        <div className="heroSection">
          <div class="w-600">
            <span class="italic font-inter font-bold text-6xl leading-74 text-green-700">
              Effortless
            </span>
            <span class="font-bold font-inter font-bold text-5xl leading-74 text-white">
              &nbsp;Verification,</span><br />
            <span class="font-bold font-inter font-bold text-5xl leading-74 text-white">
              Uncompromising Security.
            </span>
          </div>

          <div class="w-full sm:w-72 lg:w-96 h-14 flex items-center justify-center">
            <span class="font-outfit font-normal text-white text-base sm:text-lg lg:text-lg">
              Revolutioning Healthcare Record Management and verification with Blockchain Technology
            </span>
          </div>

          <button class="relative w-60 h-16 bg-green-400 rounded-full ">
            <span class="absolute w-full h-full left-0 px-4 top-0 z-10 flex items-center justify-center text-white font-bold ">
              Register Your Organization
            </span>
            <div class="absolute w-full h-full left-0 top-0 bg-green-200 rounded-lg transition duration-300 opacity-0 hover:opacity-100 hover:bg-gray-200 hover:shadow-md"></div>
          </button>

        </div>
      </section>
      <section id="about" Style="position: absolute;top: 1026px;" className="h-full w-full px-10">
        <div class="absolute w-622 h-44 top-0 font-outfit font-medium text-4xl leading-11 text-green-700">  Features</div>
        <div class="absolute w-1/3 h-0 border-2 border-green-700 left-18 top-20"></div>
        <div className=''>
          <div className="absolute left-0 top-40 flex flex-row w-full justify-center items-start p-0 gap-80">
            <div className="flex flex-col gap-10">
              <img src="./secure.png" alt="" />
              <div className="w-311 h-82 font-inter font-medium text-3xl leading-41 text-center text-black">
                Decentralized
              </div>
              {/* <div className="w-311 h-82 font-inter font-normal text-xl leading-41 text-center text-black">
              Protecting your digital assets with ironclad security
              </div> */}

            </div>
            <div className="flex flex-col gap-10">
              <img src="./Vectordec.png" alt="" />
              <div className="w-311 h-82 font-inter font-medium text-3xl leading-41 text-center text-black">
                Secure
              </div>

            </div>
            <div className="flex flex-col gap-10">
              <img src="./Vectorfast.png" alt="" />
              <div className="w-311 h-82 font-inter font-medium text-3xl leading-41 text-center text-black">
                Relaible
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-40 flex flex-row w-full justify-center items-start p-0 gap-80">
          </div>
        </div>

      {/* <footer class="absolute w-1/2 flex justify-center bottom-0 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </footer> */}
      </section>


    </>
  )
}

export default Home