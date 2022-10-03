import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import Error from "next/error";
import Image from "next/image";
import type { ImageLoaderProps } from "next/image";
import { inferQueryResponse } from "../../api/trpc/[trpc]";

//helper function for NextImage
const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75} `;
};

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
  console.log(data);

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div>
      {isLoading ? (
        <h1 className="text-2xl font-serif text-center p-4"> Loading...</h1>
      ) : !data?.results ? (
        <>
          <h1 className="text-2xl font-serif text-center p-4">
            {" "}
            Name does not exist in database
          </h1>{" "}
          <Error statusCode={404} />
        </>
      ) : data.results ? (
        <>
          <h1 className="text-2xl font-serif text-center p-4">
            {" "}
            Search Term: {lookupName}
          </h1>

          <CharsList homeClick={handleHomeClick} chars={data.results} />
        </>
      ) : null}
    </div>
  );
};

//create new react component to help infer types from trpc response. See [trpc].ts
type CharsFromFetch = inferQueryResponse<"rickMortygetByName">["results"];
const CharsList: React.FC<{
  chars: CharsFromFetch;
  homeClick: () => void;
}> = (props) => {
  return (
    <>
      <div className=" w-screen min-h-[600px] bg-gray-700 ">
        <>
          {props.chars?.map((result) => {
            return (
              <div id={result.id}>
                <h1 className="text-2xl font-serif text-center p-4">
                  {result.name}
                </h1>
                ;
                <div id={result.id} className="flex justify-center">
                  <div className=" pt-14 p-2 rounded-md ">
                    <Image
                      loader={myLoader}
                      src={result.image}
                      alt={result.name}
                      height={200}
                      width={200}
                    />
                  </div>{" "}
                </div>
              </div>
            );
          })}
          <div className="flex justify-center p-10">
            <button
              className="bg-transparent hover:bg-violet-800 text-gray-50 font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
              onClick={() => props.homeClick()}
            >
              Home
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default RickSearchByName;
