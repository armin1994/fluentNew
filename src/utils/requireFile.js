import React from "react";
import Loadable from "react-loadable";

const requireFile = file => {
  const LoadableComponent = Loadable({
    loader: () => import(file),
    loading() {
      return <div>Loading...</div>;
    }
  });

  return LoadableComponent;
};

export default requireFile;
