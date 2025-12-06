import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function Auth() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1A1F2C]/95 to-[#1A1F2C]/70">
      <div className="w-full max-w-sm mx-auto p-4">
        <Card className="shadow-xl border-[#8E9196]/20 bg-[#F1F0FB]/90 backdrop-blur-md">
          <CardHeader className="text-center space-y-2 pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1F2C]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-[#8E9196] text-sm">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 w-[90%] mx-auto mb-2 bg-[#E5DEFF]/30">
              <TabsTrigger
                value="signin"
                className="text-sm data-[state=active]:bg-[#9b87f5]/20 data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-colors"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-sm data-[state=active]:bg-[#9b87f5]/20 data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-colors"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col space-y-2 text-center text-xs text-[#8E9196] px-4 pb-4 pt-2">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5DEFF]/60"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#F1F0FB]/90 px-2 text-[#8E9196]">Note</span>
              </div>
            </div>
            <p>Password must be at least 6 characters</p>
            <p className="text-black"> Made With ❤️ by Team SP</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}