"use client";
import NotFound from "../components/Not_Found/404";
import { Suspense } from 'react';

const NotFoundPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <NotFound />
   </Suspense >
    );
};

export default NotFoundPage;
