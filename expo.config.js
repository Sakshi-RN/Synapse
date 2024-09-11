// expo.config.js
export default {
    expo: {
      name: "Synapse",
      slug: "Synapse",
      version: "1.0.0",
      plugins: [
        [
          "expo-local-authentication",
          {
            faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID."
          }
        ]
      ],
      android: {
        permissions: ["USE_BIOMETRIC"]
      },
      ios: {
        infoPlist: {
          NSFaceIDUsageDescription: "This app uses Face ID for authentication to enhance security."
        }
      }
    }
  };
  