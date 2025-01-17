/* eslint-disable no-console */
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  router: AppRouterInstance; // Pass the router instance as a prop
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error information if needed
    // eslint-disable-next-line no-console
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
    // Use the passed router prop to redirect
    this.props.router.push('/not-found');
  }

  render() {
    if (this.state.hasError) {
      return <h2>Redirecting to Not Found...</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
