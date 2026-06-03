import { redirect } from "next/navigation";

/** Legacy URL — booking lives on the homepage. */
export default function BookPage() {
  redirect("/?section=book-session");
}
