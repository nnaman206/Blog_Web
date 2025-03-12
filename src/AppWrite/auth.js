import config from "../config/config";
import {Client,Account,ID} from "appwrite";
export class AuthService
{
    client=new Client();
    account;

    constructor()
    {
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId);
        this.account=new Account(this.client);

    }
    async createAccount({email,password,name})
    {
        try{
              const user=await this.account.create(ID.unique(),email,password,name);
               if(user)
               {
                return this.login({email,password});
                }
                else{
                return user;
                }
            }catch(error)
            {
                console.log(error);
            } 
    }

    async login({email,password})
    {
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error)
        {
            console.log(error);
        }
    }
    async getCurrentUser()
    {
        try{
            return await this.account.get();
        }catch(error)
        {
            console.log(error);
        }
        return null;
    }
    async logout()
    {
        try{
            await this.account.deleteSessions();
        }catch(error)
        {
            console.log(error);
        }
    }
}
    const authService=new AuthService();
    export default authService;


