import DataURIParser from "datauri/parser.js";

import path from "path";

const getDataUri = (file) => {
  const parser = new DataURIParser();
  console.log("File ->", file);

  console.log("Parser ->", parser);

  // console.log("Path name ->", path.extname());
  const filename = file.originalname.toString();
  // console.log("Filename ->", filename);

  const extName = path.extname(filename);
  // console.log("name ->", extName);
  // console.log("1", parser.format(extName, file.buffer));

  return parser.format(extName, file.buffer);
};

export default getDataUri;
