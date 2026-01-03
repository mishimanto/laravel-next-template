import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata = {
  title: 'Register - Auth Template',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return <RegisterForm />;
}