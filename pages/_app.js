import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "react-markdown-editor-lite/lib/index.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      Router.events.on("routeChangeStart", () => NProgress.start());
      Router.events.on("routeChangeComplete", () => NProgress.done());
      Router.events.on("routeChangeError", () => NProgress.done());
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
