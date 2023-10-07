import { type AppType } from "next/app";
import { Roboto } from 'next/font/google'

import { api } from "~/utils/api";

import "~/styles/globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: "100",
})
 

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
