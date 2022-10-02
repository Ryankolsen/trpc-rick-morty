import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

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

      <main className="container mx-auto  min-h-screen p-4">
        <h1 className="text-3xl text-center">Rick And Morty</h1>

        {session ? (
          <div>
            <p>Hi {session.user?.name}</p>

            <button
              className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
              onClick={() => signIn("discord")}
            >
              Login with Discord
            </button>
          </div>
        )}
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
