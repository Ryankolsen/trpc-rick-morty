import { NextPage } from "next";
import { useRouter } from "next/router";

const RickSearchByNext: NextPage = (props) => {
  const router = useRouter();
  //get name to pass to router
  const { name, page } = router.query;

  console.log("page: ", page);

  return (
    <>
      <h1>Page Loaded!</h1>
    </>
  );
};
export default RickSearchByNext;
