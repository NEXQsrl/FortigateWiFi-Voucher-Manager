# Fortigate Voucher Manager

Generate and view the Voucher for Fortigate Firewall.
Generally used for the Guest Network

## 📋 Index
- [Prerequisites](#prerequisites)
- [How it Works](#how-it-works)
- [Create an Application on Entra](#create-an-application-on-entra)
- [Create a Fortigate Token](#create-a-fortigate-token)
- [Installation](#installation)
- [Images](#images)
- [Feedback](#feedback)
- [License](#license)

## ✅ Prerequisites
To use this application, you need:
- A **Fortigate Firewall**
- A **Microsoft Entra Tenant** for authentication
- **Docker** (Linux recommended)
- An **SSL Certificate** (By default, a self-signed certificate is installed)

## ⚙️ How it Works
- The software uses **Microsoft credentials** for login.
- It connects to **Fortigate APIs** to generate and manage vouchers.

## 🛠️ Create an Application on Entra
1. Login to [Microsoft Entra](https://entra.microsoft.com).
2. Navigate to **Identity** → **Applications** → **App registrations**.
   ![App Registrations](https://github.com/user-attachments/assets/c42c903e-c200-4ff6-95de-3f71a7d6666b)
3. Click on **New Registration** and fill out the form as shown below:
   ![New Registration](https://github.com/user-attachments/assets/1233c36b-64ba-4f13-a1cc-2ceab27ab22e)
4. Copy the **Application (client) ID** and **Directory (tenant) ID**:
   ![IDs](https://github.com/user-attachments/assets/53106aec-5f45-4b69-be46-dc9152e72563)



## 🔑 Create a Fortigate Token


## Installation


## 🚀 Installation
1. **Download the code** from GitHub and edit the following environment variables in the `Dockerfile`:
   ```env
   VITE_CLIENT_ID="Insert the client ID generated earlier"
   VITE_TENANT_ID="Insert the tenant ID generated earlier"
   VITE_API_HOST="Insert the FQDN of your firewall (e.g., https://firewall.domain:8443/api)"
   VITE_API_TOKEN="Insert the token of your firewall"
   VITE_WIFI_SSID="Insert the WiFi name"
   VITE_API_PREFIX="Enter the prefix for voucher usernames (e.g., FW)"
   VITE_PHONE_COUNTRY="IT"
   VITE_NAME="Name of the application"
   VITE_LOGO_URL="URL of your application logo"
   ```
2. Create an image:
   ```sh
   docker build -t [NomeImmagine] .
   ```
3. Start container:
   ```sh
   docker run -p [Porta Esterna]:5173 --name [NomeContainer] [NomeImmagine]
   ```
4. Go to **Web Browser** and click **Login**

## Images
<img width="800" alt="image" src="https://github.com/user-attachments/assets/cae837a6-0054-48f4-8256-52fc580d6cfd" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/cac4b52b-e484-4b6f-a8b3-6dba6b799a51" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/ef9ea37d-ab59-49bb-87c1-b82feaf8f26a" />


## Feedback
<p>Powered by <a href="http://www.nexq.it">NEXQ S.r.l.</a></p>
<p>Mail <a href="mailto:developer@nexq.it">developer@nexq.it</a> for more info.</p>
<p>Mail <a href="mailto:into@nexq.it">into@nexq.it</a> for custom implementation.</p>

<a href=https://www.linkedin.com/company/nexq><img style="margin: 0 10;" width="35" src="https://github.com/user-attachments/assets/571fbd1e-4c60-4ebd-985c-7aab446a23d6"></a>

## License
<p>Copyright (c) 2025 NEXQ S.r.l.</p>
<p>Creative Commons Legal Code (Non Commercial Use) </p>