import { createRouter } from "./context";
import { TypeOf, z } from "zod";

interface Data {
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
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const rickMortyRouter = createRouter().query("getByNumber", {
  input: z.object({
    text: z.string(),
  }),
  async resolve({ input }) {
    const id = input.text;
    try {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      ).then((res) => res.json());
      //   console.log(data.image);
      return {
        name: data.name,
        id: data.id,
        image: data.image,
        species: data.species,
      };
    } catch (error) {
      console.error(error);
    }

    return {};
  },
});
