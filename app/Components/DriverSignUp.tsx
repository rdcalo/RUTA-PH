import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUpDriver } from "../../firebase/authService";

export default function DriverSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !licenseNumber ||
      !vehicleDetails ||
      !plateNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await signUpDriver({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        driversLicense: licenseNumber.trim(),
        vehicleDetails: vehicleDetails.trim(),
        plateNumber: plateNumber.trim().toUpperCase(),
        role: "driver",
        password,
      });

      Alert.alert(
        "Success",
        "Driver account created successfully! Your account will be verified before you can start driving.",
        [{ text: "OK", onPress: () => router.replace("/") }]
      );
    } catch (error: any) {
      let errorMessage = "Failed to create account";
      if (error.code === "auth/email-already-in-use") errorMessage = "Email is already registered";
      else if (error.code === "auth/weak-password") errorMessage = "Password is too weak";
      else if (error.code === "auth/invalid-email") errorMessage = "Invalid email address";

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToCommuter = () => router.push("/user-signup");
  const handleLogin = () => router.push("/login");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/RUTA PH Images/RUTA BUS ICON.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign up</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Driver's License"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Vehicle Details"
            value={vehicleDetails}
            onChangeText={setVehicleDetails}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Plate Number"
            value={plateNumber}
            onChangeText={setPlateNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSwitchToCommuter}>
          <Text style={styles.switchText}>Switch to Commuter Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.switchText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E4E2DD" },
  scrollContent: { paddingHorizontal: 32, paddingTop: 40, paddingBottom: 20 },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 80, height: 60 },
  title: { fontSize: 32, fontWeight: "700", color: "#1E1E1E", marginBottom: 20 },
  formContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#1E1E1E", marginBottom: 10 },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1E1E1E",
    marginBottom: 12,
  },
  signUpButton: { backgroundColor: "#1E1E1E", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  signUpButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  switchText: { color: "#1E1E1E", textAlign: "center", marginTop: 12, textDecorationLine: "underline" },
});
