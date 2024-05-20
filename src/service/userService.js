import { createFolder } from "./fileService.js";

async function createFolderWithPrefix(prefix, UserName, UserCode, foldId) {
  try {
    const folderName = `${prefix} ${UserName} ${UserCode}`;
    const folderId = await createFolder(folderName, foldId);
    if (!folderId) {
      console.error("Folder is not created");
    } else {
      console.log("Folder is created successfully");
      return folderId;
    }
  } catch (error) {
    throw new Error(`Error creating ${prefix.trim()} folder`);
  }
}

export const createUserFolder = (UserName, UserCode, foldId) =>
  createFolderWithPrefix("User", UserName, UserCode, foldId);

export const createOtherFolder = (UserName, UserCode, foldId) =>
  createFolderWithPrefix("", UserName, UserCode, foldId);
