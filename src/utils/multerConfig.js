import multer from "multer";

// Define multer storage
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    if (file.mimetype.startsWith("image")) {
      uploadPath += "images/";
    } else if (file.mimetype === "application/pdf") {
      uploadPath += "pdfs/";
    } else {
      return cb({ error: "Mime type not supported" });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use unique filenames to prevent conflicts
  },
});
