import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata = {
  title: 'Login - Auth Template',
  description: 'Login to your account',
};

export default function LoginPage() {
  return <LoginForm />;
}