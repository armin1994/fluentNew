import moduleAlias from "module-alias";
import path from "path";

moduleAlias.addAliases({
  "ff-shared": path.resolve(__dirname, "../shared/"),
  "ff-clients": path.resolve(__dirname, "../clients/"),
  "ff-server": path.resolve(__dirname, "../server/"),
  "ff-utils": path.resolve(__dirname, "../utils/")
});

moduleAlias();
