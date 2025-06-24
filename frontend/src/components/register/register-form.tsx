import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MapPin, User, Building } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="min-h-[340px] flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="me@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </TabsContent>

      <TabsContent value="signup">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="min-h-[340px] flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create an account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <Button
                        asChild
                        className="w-full flex items-center justify-center gap-x-2"
                      >
                        <Link href="/register/signup">
                          <User className="h-5 w-5" />
                          Sign up as a Customer
                        </Link>
                      </Button>

                      <Button
                        asChild
                        className="w-full flex items-center justify-center gap-x-2"
                      >
                        <Link href="/register/partner">
                          <MapPin className="h-5 w-5" />
                          Sign up as a Space Partner
                        </Link>
                      </Button>

                      <Button
                        asChild
                        className="w-full flex items-center justify-center gap-x-2"
                      >
                        <Link href="/register/enterprise">
                          <Building className="h-5 w-5" />
                          Sign up as an Enterprise
                        </Link>
                      </Button>
                    </div>
                  </div>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
