import LoginForm from "@/modules/dashboard/components/login";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="max-lg:bg-[#F2F0EC]  bg-background flex flex-col items-center max-lg:py-20 lg:justify-center min-h-screen relative">
      <div className="absolute top-10 left-10 max-lg:hidden">
        <Link href="/" className="text-xl flex items-center z-50">
          <Image
            src="/assets/images/logo.png"
            height={37}
            width={40.98}
            alt="logo-icon"
            sizes="100vw"
            className="w-auto h-[37px]"
          />
        </Link>
      </div>
      <div className="max-w-md w-full">
        <h2 className="text-center mb-6 text-3xl max-lg:text-black">
          Welcome back
        </h2>
        <div className="bg-[#F2F0EC] p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
