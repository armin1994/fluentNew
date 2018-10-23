import PropTypes from "prop-types";
import React from "react";

export const SiteLayout = ({ children }) => {
  return (
    <div>
        {children}
    </div>
  );
};

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SiteLayout;
