import React from "react";

import { Search } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 mx-auto rounded-full bg-gray-100 text-slate-700 font-medium">
          Best Job Search
        </span>
        <h2 className="text-5xl font-bold my-2">
          Get Your <span>Dream Job</span> <br />{" "}
          <span>
            At Job<span className="text-main-001">Search</span>
          </span>
        </h2>
        <p>
          At JobSearch, we offer a comprehensive suite of services to make the
          job search process as seamless and effective as possible
        </p>
        <div className="flex items-center w-[40%] shadow-lg border border-gray-200 pl-3  rounded-full gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="px-6 py-2 outline-none border-none w-full "
          />
          <Button className="rounded-r-full bg-main-001 hover:bg-main-002">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
