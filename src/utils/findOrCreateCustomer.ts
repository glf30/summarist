import { clerkClient } from "@clerk/nextjs/server";
import { stripeApiClient } from "use-stripe-subscription";

export const findOrCreateCustomerId = async ({
  clerkUserId,
}: {
  clerkUserId: string;
}) => {

    
  let user = await clerkClient.users.getUser(clerkUserId);
  console.log(user)
  if (user.publicMetadata.stripeCustomerId) {
    return user.publicMetadata.stripeCustomerId as string;
  }

  const customerCreate = await stripeApiClient.customers.create(
    {
      name: user.firstName + " " + user.lastName,
      email: user?.emailAddresses[0]?.emailAddress,
      metadata: {
        clerkUserId: user.id,
      },
    },
    {
      idempotencyKey: user.id,
    }
  );
  user = await clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      stripeCustomerId: customerCreate.id,
    },
  });
  return user.publicMetadata.stripeCustomerId as string;
};