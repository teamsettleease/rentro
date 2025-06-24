"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export function PartnerForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIdFile(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setIdPreview(null);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Partner Sign Up</CardTitle>
          <CardDescription>
            Fill in your personal details to become a Space Partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {/* Name */}
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" required />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" required />
                </div>
              </div>

              {/* Contact */}
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+977 9800000000" required />

              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="me@example.com" required />

              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="Full Address" required />

              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" required />

              {/* Government ID */}
              <Label htmlFor="id-type">Government ID Type</Label>
              <Input id="id-type" type="text" placeholder="e.g., Passport, Citizenship" required />

              <Label htmlFor="gov-id">Upload Government ID</Label>
              <Input
                id="gov-id"
                type="file"
                accept="image/*,.pdf"
                onChange={handleIdUpload}
                required
              />

              {idFile && (
                <div className="text-sm mt-2">
                  <p className="mb-1 font-medium">Preview:</p>
                  {idPreview ? (
                    <Image
                      src={idPreview}
                      alt="Government ID Preview"
                      width={300}
                      height={192}
                      className="max-h-48 border rounded object-contain"
                    />
                  ) : (
                    <p className="text-muted-foreground">Preview not available (file is not an image)</p>
                  )}
                </div>
              )}

              {/* Account Info */}
              <Label htmlFor="username">Username</Label>
              <Input id="username" required />

              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />

              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />

              <Button type="submit" className="w-full mt-4">
                Register as Space Partner
              </Button>

              <div className="text-center text-sm">
                Already registered?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs text-balance">
        By signing up, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
