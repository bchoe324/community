import useAuth from "@/hooks/queries/useAuth";
import { useRouter } from "expo-router";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const router = useRouter();

  if (!auth.id) {
    router.replace("/auth");
  } else {
    return children;
  }
}
