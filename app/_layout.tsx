import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

// routeGuard

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    // wait until navigation is ready (simulate auth check too)
    const timeout = setTimeout(() => {
      if (!user && !inAuthGroup && !isLoadingUser) {
        router.replace("/auth");
      } else if (user && inAuthGroup && isLoadingUser) {
        router.replace("/");
      }
      setIsReady(true);
    }, 100); // delay helps ensure navigation is mounted

    return () => clearTimeout(timeout);
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
