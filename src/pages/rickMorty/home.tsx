import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  number: string;
};
// prettier-ignore
const Home = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    router.push(`/rickMorty/${data.number}`);

  return (
    <div>
      <h1>home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Search By Number
          <input defaultValue="1" {...register("number")} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};
export default Home;
