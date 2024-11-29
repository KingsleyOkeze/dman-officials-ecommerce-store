import about from "../../images/about.png";
import "../../styles/pages-styles/footer-pages-styles/AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-us-container">
      <div className="about-us-image-container">
        <img src={about} alt="About us" />
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
