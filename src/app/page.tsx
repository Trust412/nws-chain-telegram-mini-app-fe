"use client";

import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/app/home/page"), { ssr: false });
// import { WebAppProvider, MainButton, BackButton } from '@vkruglikov/react-telegram-web-app';
// import Home from "./home/page";

const App = () => {
  return <Home />;
};

export default App;
