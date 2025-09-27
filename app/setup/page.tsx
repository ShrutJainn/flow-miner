import { setupUser } from "@/actions/billing/setupUser";
import { watiFor } from "@/lib/helper/waitFor";

export default async function Page() {
  await watiFor(3000);
  return await setupUser();
}
