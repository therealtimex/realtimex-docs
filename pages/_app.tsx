import "./index.css";
import "reveal.js/reveal.css";
import "../styles/presentations-reveal.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </> // The gaId is the Measurement ID on Google Analytics
  );
}

export default MyApp;
