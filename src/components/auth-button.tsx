"use client";

import { signInWithGitHub, signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthButtonProps {
  isAuthenticated: boolean;
}

export function AuthButton({ isAuthenticated }: AuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const [waitingForUser, setWaitingForUser] = useState(false);

  useEffect(() => {
    if (waitingForUser && isAuthenticated) {
      setWaitingForUser(false);
    }
  }, [isAuthenticated, waitingForUser]);

  const handleSignIn = async () => {
    setLoading(true);
    setWaitingForUser(true);

    try {
      await signInWithGitHub();
    } catch {
      toast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
    } catch {
      toast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <Button variant="outline" onClick={handleSignOut} disabled={loading}>
        {loading && <Loader2 className="mr-1 h-5 w-5 animate-spin" />}
        Sign out
      </Button>
    );
  }

  return (
    <Button onClick={handleSignIn} disabled={loading || waitingForUser}>
      {(loading || waitingForUser) && (
        <Loader2 className="mr-1 h-5 w-5 animate-spin" />
      )}
      Sign in with GitHub
    </Button>
  );
}
