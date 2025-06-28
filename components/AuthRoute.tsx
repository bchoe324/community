import useAuth from "@/hooks/queries/useAuth";
import { useFocusEffect, useRouter } from "expo-router";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const router = useRouter();

  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });
  return children;
}
