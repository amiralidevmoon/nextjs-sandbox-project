import React from 'react';
import AdminLayout from "../../components/layouts/admin-layout";

function Index() {
    return (
        <div>Welcome to admin panel</div>
    );
}

export default Index;

Index.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}