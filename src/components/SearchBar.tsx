import { useRouter } from "next/router";
import { NextPage } from "next";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import searchIcon from "../assets/searchIcon.svg";
import Image from "next/image";

type FormValues = {
  searchName: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    //I don't need error handling for this particular form...but I wanted to include some just to show how it works in react-hooks-form. Super easy! :)
    values: values.searchName ? values : {},
    errors: !values.searchName
      ? {
          searchName: {
            type: "minLength",
            message: "Please enter something to search.",
          },
        }
      : values.searchName.length < 3
      ? {
          searchName: {
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
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
        {errors?.searchName && <p>{errors.searchName.message}</p>}
      </form>{" "}
    </>
  );
};

export default SearchBar;
