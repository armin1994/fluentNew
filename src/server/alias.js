import moduleAlias from "module-alias";
import path from "path";

moduleAlias.addAliases({
  "ff-shared": path.resolve(__dirname, "../shared/"),
  "ff-client": path.resolve(__dirname, "../client/"),
  "ff-server": path.resolve(__dirname, "../server/"),
  "ff-utils": path.resolve(__dirname, "../utils/")
});

moduleAlias();
