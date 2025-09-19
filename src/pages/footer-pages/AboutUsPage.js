import "../../styles/pages-styles/footer-pages-styles/AboutUsPage.css";
import { Helmet } from "react-helmet-async";

function AboutUsPage() {
  return (
    <div className="about-us-container">
      <Helmet>
          <title>About Us | Dman Officials Store</title>
          <meta
              name="description"
              content="Learn about Dman Officials Store, a dedicated team delivering quality and innovation in e-commerce. Discover our mission to provide exceptional customer experiences."
          />
      </Helmet>
      <div className="about-us-image-container">
        <img 
          src="https://res.cloudinary.com/dvgqi0ajq/image/upload/c_limit,f_auto,q_auto,w_1200/v1755274353/j9qcvojysnxu1zdztkli.png"
          alt="About us Image" 
        />
      </div>
      <div className="about-us-content-wrapper">
        <div className="about-us-content-container">
          <h3>About Us</h3>
          <p>
            We are a dedicated team providing exceptional services to our
            customers. Our mission is to deliver quality and innovation to meet
            your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
