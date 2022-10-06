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

interface ReturnArray {
  name: string;
  id: string;
  image: string;
  species: string;
  origin: string;
}
[];

export const rickMortyRouter = createRouter()
  .query("getByNumber", {
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
  })
  .query("getByName", {
    input: z.object({
      text: z.string(),
      page: z.string().optional(),
    }),
    async resolve({ input }) {
      const name = input.text.toString();
      const editedName = name.toString().replace(" ", "%20");
      let fetchString;
      console.log("input:", input);
      if (input.page) {
        fetchString = `https://rickandmortyapi.com/api/character/?page=${input.page}&name=${editedName}`;
      } else {
        fetchString = `https://rickandmortyapi.com/api/character/?name=${editedName}`;
      }
      console.log(fetchString);
      console.log("input.page", input.page);
      const returnArray = [{ name: "", id: "", image: "", species: "" }];
      try {
        const data = await fetch(fetchString).then((res) => res.json());
        // console.log(data);
        data.results.forEach((result: Data) => {
          returnArray.push({
            name: result.name,
            id: result.id,
            image: result.image,
            species: result.species,
          });
        });
        return {
          results: returnArray,
          count: data.info.count,
          pages: data.info.pages,
          next: data.info.next,
          prev: data.info.prev,
        };
      } catch (error) {
        console.error(error);
      }
      return {};
    },
  });
