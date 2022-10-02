import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Error from "next/error";

const RickMorty: NextPage = (props) => {
  const router = useRouter();

  //get id number passed to route
  const lookupId = router.query.id as string;

  //handle prev and next buttons
  let prevId: number = +lookupId - 1;
  if (prevId < 1) {
    prevId = 826;
  }
  let nextId: number = +lookupId + 1;
  if (nextId === 827) {
    nextId = 1;
  }

  //fetch data from Rick and Morty API
  const { data, isLoading } = trpc.useQuery([
    "rickMortygetByNumber",
    { text: lookupId },
  ]);

  const handlePrevClick = () => {
    router.push(`/rickMortyApi/${prevId.toString()}`);
  };
  const handleNextClick = () => {
    router.push(`/rickMortyApi/${nextId.toString()}`);
  };
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
            Please search for an id between 1 and 827
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

            <div className="flex justify-center  ">
              <div className="w-52 flex justify-around pt-4">
                <div className="">
                  <button
                    onClick={() => handlePrevClick()}
                    className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
                  >
                    Prev
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleNextClick()}
                    className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
                  >
                    Next
                  </button>
                </div>
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
export default RickMorty;
