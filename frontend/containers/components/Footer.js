import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="page-footer"
        style={{
          background: "#d28e00"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Welcome!</h5>
              <p className="grey-text text-lighten-4">
                Emory Course Critique is a site meant to help Emory students
                choose the best classes and professors. All reviews are anonymous.
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Useful Links</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="/about">
                    About us
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="/faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="mailto:colin.jiang@emory.edu?Subject=Hey%20EmoryCourseCritque">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2017 CAMAJA
            <a className="grey-text text-lighten-4 right">
              Atlanta, GA
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
