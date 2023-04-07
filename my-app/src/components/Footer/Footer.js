import React from "react";

function Footer() {
  return (
    <footer className="flex-col sm:flex-row items-center p-6 bg-yellow-200 flex  gap-5 sm:gap-16 md:gap-32 md:justify-around xl:justify-between xl:px-40">
      <div className="flex-col items-center md:justify-center  ">
        <div className="form-control w-80 items-center lg:ml-4 xl:ml-8 ">
          <div className="relative pt-6 sm:w-64 lg:w-96 ">
            <input
              type="text"
              placeholder="Enter your e-mail"
              className="input input-bordered w-full pr-16 "
            />
            <button
              className=" btn btn-primary absolute top--6 right-0 rounded-l-none"
              type="submit"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around mt-2 sm:mt-8 md:m-0 gap-10 items-center">
        <div className="mx-3 font-bold flex justify-end gap-5 lg:gap-10 md:text-lg lg:text-xl  ">
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/team">Team</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
