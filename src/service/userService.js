import { createFolder } from "./fileService.js";

async function createUserFolder(UserName, UserCode, foldId) {
  try {
    const folderName = `User ${UserName} ${UserCode}`;
    // Assuming process.env.FOLDER_ID is properly set
    const folderId = await createFolder(folderName, foldId);
    if (!folderId) {
      //console.log("User folder is not created");
    } else {
      //console.log("User folder is created successfully");
      return folderId;
    }
  } catch (error) {
    throw new Error("Error creating User folder");
  }
}

async function createOtherFolder(UserName, UserCode, foldId) {
  try {
    const folderName = `${UserName} ${UserCode}`;
    // Assuming process.env.FOLDER_ID is properly set
    const folderId = await createFolder(folderName, foldId);
    if (!folderId) {
      //console.log("User folder is not created");
    } else {
      //console.log("User folder is created successfully");
      return folderId;
    }
  } catch (error) {
    throw new Error("Error creating User folder");
  }
}

export { createOtherFolder, createUserFolder };
