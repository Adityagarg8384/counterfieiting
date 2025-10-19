// pages/api/inngestroute.js
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } from "@/lib/inngest";
import { serve } from "inngest/next";

export default serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
