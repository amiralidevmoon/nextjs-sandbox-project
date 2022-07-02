import React, {useState} from 'react';

import {HomeIcon, UsersIcon,} from '@heroicons/react/outline'

import Sidebar from "../ui/sidebar";
import HeaderDashboard from "../dashboard/header-dashboard";


const navigation = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon, current: true},
    {name: 'Profile', href: '/dashboard/profile', icon: UsersIcon, current: false},
]

const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
    {name: 'Sign out', href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function DashboardLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar navigation={navigation} classNames={classNames} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <div className="md:pl-64 flex flex-col">
                <HeaderDashboard userNavigation={userNavigation} setSidebarOpen={setSidebarOpen} classNames={classNames}/>
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-3xl font-semibold text-gray-400">Dashboard</h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Replace with your content */}
                            {children}
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default DashboardLayout;