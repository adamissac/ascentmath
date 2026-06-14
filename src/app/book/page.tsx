import { redirect } from "next/navigation";

/** Legacy URL — booking lives on the homepage. */
export default function BookPage() {
  redirect("/#book-session");
}
