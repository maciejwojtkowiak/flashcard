import type { InferGetStaticPropsType, NextPage } from "next";
import { useDispatch } from "react-redux";
import { GetStaticProps } from "next";

import Main from "../components/main/Main";
import { connectToMongo } from "../helpers/connectToMongo";
import { listAction } from "../src/store/list-slice";
import { useEffect } from "react";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  return <Main />;
};

// export const getStaticProps: GetStaticProps = async () => {
//   const db = await connectToMongo();
//   const itemsCollection = db.collection("items");
//   const items = await itemsCollection.find({}).toArray();

//   const correctItems = items.map((item) => {
//     return {
//       ...item,
//       _id: item._id.toString(),
//     };
//   });
//   return {
//     props: {
//       items: correctItems,
//     },
//   };
// };

export default Home;
