// pages/api/clerk-webhook.js
import dbconnect from "@/lib/database";
import User from "@/lib/models";

export default async function handler(req, res) {
  const { type, data } = req.body;
  
  dbconnect();

  switch (type) {
    case "user.created":
      await User.create({
        _id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        imageurl: data.image_url,
      });
      break;

    case "user.updated":
      await User.findByIdAndUpdate(data.id, {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        imageurl: data.image_url,
      });
      break;

    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;

    default:
      break;
  }

  res.status(200).json({ ok: true });
}
