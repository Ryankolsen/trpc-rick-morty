import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import rickHeroImg from "../assets/RM-BG.png";

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleClickSeeChars = () => {
    router.push(`/rickMortyApi/1`);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="Rick and Morty Stuff"
          content="Generated by create-t3-app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto sm:w-[1280px] min-h-screen p-4 ">
        <Image
          className="w-full sm:w-96 object-cover object-top opacity-50"
          src={rickHeroImg}
          alt="Background of Rick and Morty running from monsters"
          width={1280}
          height={560}
        />

        {/* <div className="opacity-60 flex align-middle justify-center bg-[url('../assets/RM-BG.png')] h-96 max-w-screen-xl mx-auto bg-no-repeat bg-cover w-s"></div> */}
        <h1 className=" absolute top-40 sm:top-52 lg:top-72 inset-x-3  self-center text-4xl md:5xl lg:text-6xl text-center text-gray-50 font-rickMorty ">
          Rick &amp; Morty Characters
        </h1>
        <div className="p-8 flex justify-center">
          {" "}
          <SearchBar />
        </div>

        <div className="flex justify-center p-8">
          <button
            className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
            onClick={() => handleClickSeeChars()}
          >
            Start with Rick
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
