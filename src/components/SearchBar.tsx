import { useRouter } from "next/router";
import { NextPage } from "next";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import searchIcon from "../assets/searchIcon.svg";
import Image from "next/image";

type Inputs = {
  searchName: string;
};

const resolver: Resolver<Inputs> = async (values) => {
  return {
    values: values.searchName ? values : {},
    errors: !values.searchName
      ? {
          searchTerm: {
            type: "minLength",
            message: "Please enter something to search.",
          },
        }
      : values.searchName.length < 3
      ? {
          searchTerm: {
            type: "minLength",
            message: "Please enter a longer search term.",
          },
        }
      : {},
  };
};

const SearchBar: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/rickMortyApi/char/${data.searchName}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-sm ">
          <input
            className="outline-none h-7 text-black "
            autoFocus={true}
            {...register("searchName")}
          />
          <button type="submit" className="h-[27px] p-1">
            <Image src={searchIcon} alt="search" height={18} width={18} />
          </button>
        </div>
      </form>{" "}
    </>
  );
};

export default SearchBar;
