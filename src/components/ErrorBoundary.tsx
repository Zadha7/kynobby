import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            errorMessage = `Firestore ${parsed.operationType} error: ${parsed.error}`;
            isFirestoreError = true;
          }
        }
      } catch (e) {
        // Not a JSON error message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] border border-zinc-200 p-8 max-w-md w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 mb-4">Something went wrong</h2>
            <p className="text-zinc-500 mb-8 font-medium">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Application
            </button>
            {isFirestoreError && (
              <p className="mt-4 text-xs text-zinc-400">
                This might be a permission issue. Please ensure you are logged in as an admin.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
