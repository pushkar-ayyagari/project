import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Log in",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center max-w-md">
      <div className="w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Log in to save favorites and contact sellers.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}