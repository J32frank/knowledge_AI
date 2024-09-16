import Link from "next/link";
import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center py-6 px-8 bg-gray-800 bg-opacity-80">
        <div className="text-2xl font-bold">Hack Heroes</div>
        <h1>KNOWLEDGE GROWTH</h1>
        <a href="/dashboard">
          <button className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
            Start Learning
          </button>
        </a>
      </nav>

      {/* First Section: Welcome */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold">knowledge Growth</h1>
        <p className="text-gray-400 mt-4">
          Unlock Your Full Potential With AI  Powered Learning 
          <br/>
          Experince Personalized Education Like Never Before. 
          <br/>
          Dive In a World Where AI guides Your Studies.
          <br/>
          Create Custom Classes, And help you active your academic Goals.

        </p>
        <section className="flex justify-center mt-6">
          <div className="bg-gray-700 p-6 w-[40%] rounded-lg shadow-lg">
            <video className="rounded-md w-full" controls></video>
          </div>
        </section>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="/dashboard">
            <button className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-gray-800 transition">
              Try it out
            </button>
          </a>
          <a href="/FeaturePage">
            <button className="px-6 py-3 bg-gray-700 rounded-md text-white hover:bg-blue-600 transition">
              Feature
            </button>
          </a>
        </div>
      </section>

      <section className="text-center py-16 mt-16">
        <h2 className="text-4xl font-bold">Expand Your knowledge</h2>
      </section>

      <section className="flex flex-wrap justify-center gap-6 px-10">
        <div className="w-full md:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="h-16 w-16 bg-gray-700 rounded-full mb-4 mx-auto"></div>
          <h3 className="text-xl font-bold mb-2">PROGRAMMING</h3>
          <p className="text-gray-400">
            Get a well structured course on programming with the best Video on
            YouTube
          </p>
        </div>

        <div className="w-full md:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="h-16 w-16 bg-gray-700 rounded-full mb-4 mx-auto"></div>
          <h3 className="text-xl font-bold mb-2">Unlock Your Potential</h3>
          <p className="text-gray-400">
            Learn new thing for free and unlock your potential
          </p>
        </div>

        <div className="w-full md:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="h-16 w-16 bg-gray-700 rounded-full mb-4 mx-auto"></div>
          <h3 className="text-xl font-bold mb-2">100% Free</h3>
          <p className="text-gray-400">learn Anything with knowledge growth</p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-6 px-10 mt-10">
        <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Our Team is here to help</h3>
          <p className="text-gray-400">Our Team is here</p>
        </div>

        <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
          {/* <image className="" src="" /> */}
          <h3 className="text-xl font-bold mb-2">Team</h3>
          <pre className="text-gray-400">
            <li>Developer: James Francis Harding</li>
            <li>Product Designer: Muhammed Turay</li>
            <li>Designer: Scort</li>
            <li>Willam</li>
            <li>ReSeacrher: Mr. Freeman</li>
            <li>Developer: Abdul</li>
          </pre>
        </div>
      </section>
      <section className="flex flex-wrap justify-between items-center px-10 mt-16">
        <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            Learn with knowledge growth
          </h3>
          <p className="text-gray-400 mb-4">
            Organizing video for using Youtube and AI Text Basic on your topic
          </p>
          <ul className="list-disc ml-6 text-gray-400 space-y-2">
            <li>PHYSICS</li>
            <li>PROGRAMMING LANGUAGE</li>
            <li>SOLVE COMPLEX MATH</li>
          </ul>
          <Link href="/FeaturePage">
            <button className="px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition mt-6">
              Start Learning
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <pre className="text-left text-sm bg-gradient-to-r from-[#bd5aa4] to-[#99dde9] bg-clip-text text-transparent">
              {`// Learning Programming
const hackHeroes = () ={
      return (
      <h1>Hack Heroes</h1>
      <P>The best group in Christex
      hackathon 2024
      </P>
      <h1>Slogan: Imagining The Future
       Creating The Present</h1>
      
      )
}
});`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
