import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadClient from "./UploadClient";

export default async function CodeCoachPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <UploadClient />;
}

