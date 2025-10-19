import { Inngest } from "inngest";
import dbconnect from "./database";
import User from "./models";

console.log("🔑 INNGEST_SIGNING_KEY Loaded:", process.env.INGEST_SIGN_KEY ? "✅ Present" : "❌ Missing");


export const inngest = new Inngest({
  id: "Counterfiet",
  signingKey: process.env.NEXT_PUBLIC_INGEST_SIGN_KEY,
});

export const syncUserCreation= inngest.createFunction(
    {
        id:"Sync User Creation",
    },
    {event: 'clerk/user.created'},
    async({event})=>{
        const {id, first_name, email_addresses, image_url}= event.data;
        const userData={
            _id:id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageurl: image_url,
        }

        await dbconnect();
        await User.create(userData);
    }
)

export const syncUserUpdation= inngest.createFunction(
    {
        id: 'update-user-from-clerk',
    },
    {
        event: 'clerk/user.updated',
    },

    async({event})=>{
        const {id, first_name, email_addresses, image_url}= event.data;
        const userData={
            _id:id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageurl: image_url,
        }

        await dbconnect();
        await User.findByIdAndUpdate(id, userData);

    }
)

export const syncUserDeletion= inngest.createFunction(
    {
        id: 'delete-user-from-clerk',
    },
    {
        event: 'clerk/user.deleted',
    },

    async({event})=>{
        const {id}= event.data;

        await dbconnect();
        await User.findByIdAndDelete(id);
    }
)