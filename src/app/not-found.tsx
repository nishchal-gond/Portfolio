import Link from "next/link";
import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";
import ErrorBoundary from "@/components/error-boundary";

const Fallback = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-4 text-zinc-300">
    <h1 className="text-6xl">404</h1>
    <p>This page doesn&apos;t exist.</p>
    <Link href="/" className="underline underline-offset-4">
      Go home
    </Link>
  </div>
);

const NotFoundPage = () => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Suspense fallback={<Fallback />}>
        <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default NotFoundPage;
