import { signInWithGitHub, signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

interface AuthButtonProps {
  user: User | null;
}

export function AuthButton({ user }: AuthButtonProps) {
  if (user) {
    return (
      <form>
        <Button variant="outline" formAction={signOut}>
          Sign out
        </Button>
      </form>
    );
  }

  return (
    <form>
      <Button formAction={signInWithGitHub}>Sign in with GitHub</Button>
    </form>
  );
}
