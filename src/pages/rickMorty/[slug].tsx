import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage, InferGetStaticPropsType } from "next";
import { trpc } from "../../utils/trpc";

interface Context {
  params: {
    slug: string;
  };
}

interface Props {
  data: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg";
    episode: string[];
    url: string;
    created: string;
  };
}

const RickMorty = (
  props: Props
  //   InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  console.log(props);

  return router.isFallback ? (
    <p>loading...</p>
  ) : (
    <>
      {}
      <p>Rick and Morty</p>
      <p>name:{props.data.name}</p>
    </>
  );
};
export default RickMorty;

export async function getStaticProps(context: Context) {
  const { slug } = context.params;

  const data = await fetch(
    `https://rickandmortyapi.com/api/character/${slug}`
  ).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: "1",
        },
      },
      {
        params: {
          slug: "2",
        },
      },
    ],
    fallback: true,
  };
}
