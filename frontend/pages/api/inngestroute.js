import { inngest,syncUserCreation, syncUserUpdation } from "@/lib/inngest";

import { serve } from "inngest/next";


export const {GET, POST, PUT}=  serve({
  client: inngest,
  functions: [
    syncUserCreation, syncUserUpdation, syncUserDeletion
  ],
});