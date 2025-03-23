import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ρυθμίσεις εμφάνισης',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ρυθμίσεις εμφάνισης" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Ρυθμίσεις εμφάνισης" description="Ενημερώστε τις ρυθμίσεις εμφάνισης του λογαριασμού σας" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
