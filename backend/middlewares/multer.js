import multer from "multer";

//storage 
const storage = multer.memoryStorage();
// input type name is same here type="file"
// single upload is behave as like middle ware
export const singleUpload  = multer({storage}).single("file")