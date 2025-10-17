const express = require("express");
const { Inngest } = require("inngest");
const { serve } = require("@inngest/express");
const { Webhook } = require("@clerk/clerk-sdk-node");
const dbconnect = require("./config/database");
const { User } = require("./models/models");

export const inngest = new Inngest({ id: "Counterfiet" });

export default serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
  ],
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