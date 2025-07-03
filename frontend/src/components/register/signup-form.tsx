'use client'

// Update the path below to the correct location of your axios instance, for example:
import axios from '../../lib/axios';
// Or, if you meant to use the default axios package, use:
// import axios from 'axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/signup/signup', {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (res.status === 201) {
        setSuccess(res.data.message);
        setTimeout(() => {
          router.push('/register');
        }, 300);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Register your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <div className="flex gap-4">
                <div className="flex-1 grid gap-3">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Your First Name"
                    required
                    value={form.firstname}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex-1 grid gap-3">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Your Last Name"
                    required
                    value={form.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your Username"
                    required
                    value={form.username}
                    onChange={handleChange}
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Your Password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <Button type="submit" className="w-full">
                  Register your account
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/register" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
