import { getAuth } from "@clerk/nextjs/server"
import { subscriptionHandler } from "use-stripe-subscription";
import { findOrCreateCustomerId } from "~/utils/findOrCreateCustomer"

const handler = (async (req : any, res : any) => {
    
  const { userId } = getAuth(req);

  if(!userId){
    res.status(401).send("Not logged in");
    return;
  }
  const customerId = await findOrCreateCustomerId({
    clerkUserId: userId,
  });

  res.json(
    await subscriptionHandler({ customerId, query: req.query, body: req.body })
  );

  console.log(res);
});

export default handler;