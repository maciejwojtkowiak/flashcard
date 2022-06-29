import type { InferGetStaticPropsType, NextPage } from "next";
import { useDispatch } from "react-redux";
import { GetStaticProps } from "next";

import Main from "../components/Main/Main";


const Home: NextPage = () => {
  return <Main />;
};


export default Home;
