import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '../../types';
import { Loader2 } from 'lucide-react';

interface AdminAuthProps {
  children: ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const email = user?.email?.toLowerCase().trim();
      console.log("AdminAuth Check - User Email:", email);
      if (user && email === 'zadhaarif0@gmail.com') {
        console.log("AdminAuth Check - Success");
        setIsAdmin(true);
      } else {
        console.log("AdminAuth Check - Failure (Email mismatch or no user)");
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
