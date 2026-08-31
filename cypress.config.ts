import {defineConfig} from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    setupNodeEvents(on, config) {
    },
  },
  env: {
    apiUrl: "http://localhost:8222",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    test_username: process.env.TEST_USERNAME,
    test_password: process.env.TEST_PASSWORD,
    sofia_username: process.env.SOFIA_USERNAME,
    sofia_password: process.env.SOFIA_PASSWORD,
    mel_username: process.env.MEL_USERNAME,
    mel_password: process.env.MEL_PASSWORD,
    admin_username: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    realm_name: process.env.REALM_NAME,
    keycloak_admin_url: process.env.KEYCLOAK_ADMIN_URL,
    keycloak_login: process.env.KEYCLOAK_LOGIN
  },

});
