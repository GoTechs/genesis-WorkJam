import React from "react";
import "./styles.sass";
import Loading_img from "../../assets/images/loader.gif";

const loading = props => (
    <div className="Loading">
        <img src={Loading_img} alt="loading" className={"loader"} />
    </div>
);

export default loading;