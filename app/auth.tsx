import React from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = React.useState<boolean>(true);
  const [err, setErr] = React.useState<string | null>("");

  const theme = useTheme();

  const router = useRouter();

  const { signIn, signUp } = useAuth();

  // input states
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  // handle Authentication
  const handleAuth = async () => {
    //   check if inputs are empty
    if (!email || !password) {
      setErr("All Fields are required");
      return;
    }

    //   check password length
    if (password.length < 6) {
      setErr("Password must be at least 6 characters long");
      return;
    }

    setErr(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setErr(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setErr(error);
        return;
      }

      router.replace("/");
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create An Account" : "Welcome Back"}
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {err && <Text style={{ color: theme.colors.error }}>{err}</Text>}

        <Button style={styles.button} mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          style={styles.switchMode}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchMode: {
    marginTop: 16,
  },
});
