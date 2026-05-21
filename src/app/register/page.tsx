import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Create account",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center max-w-md">
      <div className="w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            It only takes a minute.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}