import { redirect } from "next/navigation";

/** Legacy URL — tutoring tiers live on the homepage. */
export default function TutoringPage() {
  redirect("/#what-we-teach");
}
