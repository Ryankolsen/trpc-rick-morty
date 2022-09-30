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

  if (isLoading) {
    return <p> Loading...</p>;
  }
  if (!data) {
    return (
      <p>
        <Error statusCode={404} />
      </p>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-serif text-center p-4"> {data.name}</h1>
      <div className=" w-screen h-[500px] bg-gray-700 ">
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
      </div>
    </div>
  );
};
export default RickMorty;
