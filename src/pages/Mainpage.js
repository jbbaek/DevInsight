import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Mainpage = () => {
  return (
    <div>
      <h1>홈페이지</h1>
      <p>메인 화면입니다.</p>
      <section>
        <ul>
          <p>
            <Link to="/jobPosting">
              <FontAwesomeIcon icon={faBuilding} />
            </Link>
          </p>
          <p>
            <Link to="/analysis">
              <FontAwesomeIcon icon={faRankingStar} />
            </Link>
          </p>
          <p>
            <Link to="/Portfolio">
              <FontAwesomeIcon icon={faCopy} />
            </Link>
          </p>
          <p>
            <Link to="/Jobrecommend">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </p>
          <p>
            <Link to="/survey">
              {" "}
              <FontAwesomeIcon icon={faClipboardList} />
            </Link>
          </p>
          <p>
            <Link to="/community">
              <FontAwesomeIcon icon={faQuestion} />
            </Link>
          </p>
        </ul>
      </section>
    </div>
  );
};

export default Mainpage;
