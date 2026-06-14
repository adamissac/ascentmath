import { redirect } from "next/navigation";

/** Former hub URL — send to homepage study paths (scroll handled client-side). */
export default function MathematicsRedirectPage() {
  redirect("/#study-paths");
}
