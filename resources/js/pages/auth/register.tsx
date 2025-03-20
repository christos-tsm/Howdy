import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    first_name: string;
    last_name: string;
    phone: string;
    dob: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const [dateParts, setDateParts] = useState({
        month: '',
        day: '',
        year: ''
    });

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        phone: '',
        dob: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleDateChange = (part: 'month' | 'day' | 'year', value: string) => {
        setDateParts(prev => ({ ...prev, [part]: value }));
        const newDateParts = { ...dateParts, [part]: value };
        setData('dob', `${newDateParts.month}/${newDateParts.day}/${newDateParts.year}`);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dob">Date of birth</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <select
                                id="month"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={dateParts.month}
                                onChange={(e) => handleDateChange('month', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <option key={month} value={month.toString().padStart(2, '0')}>
                                        {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>

                            <select
                                id="day"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={dateParts.day}
                                onChange={(e) => handleDateChange('day', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Day</option>
                                {Array.from(
                                    {
                                        length: dateParts.month && dateParts.year
                                            ? new Date(parseInt(dateParts.year), parseInt(dateParts.month), 0).getDate()
                                            : 31
                                    },
                                    (_, i) => i + 1
                                ).map((day) => (
                                    <option key={day} value={day.toString().padStart(2, '0')}>
                                        {day}
                                    </option>
                                ))}
                            </select>

                            <select
                                id="year"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={dateParts.year}
                                onChange={(e) => handleDateChange('year', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Year</option>
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputError message={errors.dob} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
