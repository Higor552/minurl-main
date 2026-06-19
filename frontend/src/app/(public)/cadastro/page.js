import { SignupForm } from "@/components/ui/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('https://i.pinimg.com/1200x/95/b1/fb/95b1fb3030852c7e017042f777940816.jpg')] bg-cover bg-center bg-no-repeat p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
