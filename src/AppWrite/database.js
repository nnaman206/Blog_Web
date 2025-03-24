import config from "../config/config";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client=new Client();
   Database;
   storage;

   constructor()
   {
    this.client
    .setEndpoint(config.appWriteUrl)
    .setProject(config.appWriteProjectId);
    this.Database=new Databases(this.client);
    this.storage=new Storage(this.client);
   }
   async createPost({title,slug,content,featuredImage,status,userID})
   {
    try
    {
        return await this.Database.createDocument(
            config.appWriteDatabaseId,
            config.appWriteCollectionId,
            slug,
            {title,
                content,
                featuredImage,
                status,
                userID,
            }

        )
    }
    catch(error)
    {
        console.log(error);
    }
   }
   async updatePost(slug,{title,content,featuredImage,status})
   {
    try{
        return await this.Database.updateDocument(
            config.appWriteDatabaseId,
            config.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
    }
    catch(error)
    {
        console.log(error);
    }
   }
   async deletePost(slug)
   {
    try{
        await this.database.deleteDocument(
            config.appWriteDatabaseId,
            config.appWriteCollectionId,
            slug
        )
        return true;
    }catch(error)
    {
        console.log(error);
        return false;
    }
   }
   async getPost(slug)
   {
    try{
        return await this.database.getDocument(
            config.appWriteDatabaseId,
            config.appWriteCollectionId,
            slug
        )
    }catch(error)
    {
        console.log(error)
        return false;
    }
   }
   async uploadFile(file)
   {
    try{
        return await this.storage.createFile(
            config.appWriteBuketId,
            ID.unique(),
            file
        )
    }catch(error)
    {
        console.log(error)
        return false;
    }
   }
   async deleteFile(fileId)
   {
    try{
        await this.storage.deleteFile(
            config.appWriteBuketId,
            fileId
        )
    }catch(error)
    {
        console.log(error)
        return false;
    }
   }
   getFilePreview(fileId)
   {
    return this.storage.getFilePreview(
        config.appWriteBuketId,
        fileId
    )
   }




}

const service=new Service ()
export default service;