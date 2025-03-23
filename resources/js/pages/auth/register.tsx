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
        <AuthLayout title="Δημιουργία λογαριασμού" description="Εισάγετε τα στοιχεία σας παρακάτω για να δημιουργήσετε το λογαριασμό σας">
            <Head title="Εγγραφή" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="flex gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Όνομα</Label>
                            <Input
                                id="first-name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                disabled={processing}
                                placeholder="Όνομα"
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Επίθετο</Label>
                            <Input
                                id="last-name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled={processing}
                                placeholder="Επίθετο"
                            />
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dob">Ημερομηνία γέννησης</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <select
                                id="month"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={dateParts.month}
                                onChange={(e) => handleDateChange('month', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Μήνας</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <option key={month} value={month.toString().padStart(2, '0')}>
                                        {new Date(2000, month - 1, 1).toLocaleString('el', { month: 'short' })}
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
                                <option value="">Ημέρα</option>
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
                                <option value="">Έτος</option>
                                {Array.from(
                                    { length: new Date().getFullYear() - (new Date().getFullYear() - 100) },
                                    (_, i) => new Date().getFullYear() - 18 - i
                                ).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputError message={errors.dob} />
                    </div>
                    <div className="flex gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
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
                            <Label htmlFor='phone'>Τηλέφωνο</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                tabIndex={2}
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => {
                                    // Only allow digits, spaces, +, -, (, and )
                                    const value = e.target.value.replace(/[^\d\s+\-()]/g, '');
                                    setData('phone', value);
                                }}
                                disabled={processing}
                                placeholder="+30 690 123 4567"
                                pattern="^\+?[\d\s\-()]{10,}$"
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Κωδικός</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Κωδικός"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Επιβεβαίωση κωδικού</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Επιβεβαίωση κωδικού"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Δημιουργία λογαριασμού
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Έχετε ήδη λογαριασμό;{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Σύνδεση
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
