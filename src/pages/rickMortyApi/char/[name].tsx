import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import Error from "next/error";

const RickSearchByName: NextPage = (props) => {
  const router = useRouter();

  //get name to pass to router
  const lookupName = router.query.name as string;
  // console.log(lookupName);

  //fetch data from Rick and Morty API
  const { isLoading, data } = trpc.useQuery([
    "rickMortygetByName",
    { text: lookupName },
  ]);

  const handleHomeClick = () => {
    router.push("/");
  };
  return (
    <div>
      {isLoading ? (
        <h1 className="text-2xl font-serif text-center p-4"> Loading...</h1>
      ) : !data?.id ? (
        <>
          <h1 className="text-2xl font-serif text-center p-4">
            {" "}
            Name does not exist in database
          </h1>{" "}
          <Error statusCode={404} />
        </>
      ) : data ? (
        <>
          {" "}
          <h1 className="text-2xl font-serif text-center p-4"> {data.name}</h1>
          <div className=" w-screen h-[600px] bg-gray-700 ">
            <div className="flex justify-center">
              <div className=" pt-14 p-2 rounded-md ">
                <img src={data.image} alt={data.name} />
              </div>
            </div>
            <div className="flex justify-center p-10">
              <button
                className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
                onClick={() => handleHomeClick()}
              >
                Home
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RickSearchByName;
