import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.loading) {
      return <></>;
    }
    const { paginate, currentPage } = this.props;
    const pageNumbers = [];
    for (let i = currentPage; i <= currentPage + 4; i++) {
      pageNumbers.push(i);
    }
    return (
      <nav aria-label="Page navigation example mt-6">
        <ul className="pagination teaxt-center justify-content-center">
          <li className="page-item">
            <button
              onClick={(e) => {
                var data = e.target.childNodes[0].data;
                paginate(data);
              }}
              type="button"
              className="btn btn-primary"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => {
            return (
              <li key={number} className="page-item">
                <div onClick={() => paginate(number)} className="page-link">
                  {number}
                </div>
              </li>
            );
          })}
          <li className="page-item">
            <button
              onClick={(e) => {
                var data = e.target.childNodes[0].data;
                paginate(data);
              }}
              type="button"
              className="btn btn-primary"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default pagination;
