<script setup></script>

<script>
export default {};
</script>

<template>
	<div class="pp-complete-container">
		<h1>Privacy Policy</h1>
		<p><strong>Last updated: March 18, 2026</strong></p>

		<p>This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

		<div class="premium-note">Note: The standard features of Shopping List operate locally on your device. Registration and data collection are only required for the "AI Recipe Generation" premium service.</div>

		<div class="highlight-box">
			<h2>Interpretation and Definitions</h2>
			<h3>Definitions</h3>
			<ul>
				<li><strong>Account:</strong> Means a unique account created for You to access our Service or parts of our Service (specifically for AI Recipe features).</li>
				<li><strong>Company:</strong> Refers to Luca Caputo, Italy.</li>
				<li><strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual (e.g., Email address).</li>
				<li><strong>Service:</strong> Refers to the Shopping List application (Web and Android).</li>
			</ul>
		</div>

		<h2>1. Types of Data Collected</h2>

		<h3>A. Personal Data (Account Holders Only)</h3>
		<p>If You choose to use the AI Recipe Generation feature, We collect personally identifiable information, including but not limited to:</p>
		<ul>
			<li><strong>Email Address:</strong> Managed via <strong>Google Firebase</strong> for authentication and account management.</li>
			<li><strong>Billing Information:</strong> Managed via <strong>Stripe</strong> for payment processing. We do not store Your credit card numbers on our servers.</li>
		</ul>

		<h3>B. Locally Stored Data (Anonymous Users)</h3>
		<p>For standard use (shopping lists, expenses), data is stored directly on Your device using <strong>LocalStorage</strong> and <strong>IndexedDB</strong>. We do not have access to this information.</p>

		<h3>C. Usage Data</h3>
		<p>Collected automatically during the use of the Service, including IP addresses, device types, and browser versions for security and maintenance purposes.</p>

		<h2>2. Use of Third-Party Service Providers</h2>
		<p>We use the following providers to deliver the Service:</p>
		<ul>
			<li><strong>Google Firebase:</strong> Used for secure user authentication and account database management.</li>
			<li><strong>Stripe:</strong> Used for secure payment processing. Stripe’s privacy policy governs the use of Your financial data.</li>
			<li><strong>OpenAI / LangChain:</strong> Used to generate AI-driven recipes. When using this feature, the ingredients or prompts You provide are sent to OpenAI. Do not include sensitive personal data in these prompts.</li>
			<li><strong>Supabase:</strong> Backend infrastructure for additional app services.</li>
			<li><strong>Netlify & Kodular:</strong> Hosting and application framework providers.</li>
		</ul>

		<h2>3. Legal Basis for Processing</h2>
		<ol>
			<li><strong>Performance of a Contract:</strong> To provide the AI Recipe service and process payments.</li>
			<li><strong>Consent:</strong> When You register an account and use AI features.</li>
			<li><strong>Legitimate Interest:</strong> To maintain the security and integrity of the Service.</li>
		</ol>

		<h2>4. Data Retention and Deletion</h2>
		<p>
			We retain Your Email and account information as long as Your account is active. You may request the deletion of Your account and associated data at any time by contacting us. Local data can be deleted by the user by clearing browser storage or
			uninstalling the app.
		</p>

		<h2>5. Security of Your Data</h2>
		<p>The security of Your Personal Data is important to Us. We use industry-standard encryption (SSL/TLS) and rely on world-class providers like Google and Stripe to ensure the safety of Your information.</p>

		<h2>6. Contact Us</h2>
		<p>For any questions regarding this Privacy Policy or Your data rights, please contact:</p>
		<ul>
			<li>By email: <strong>shoppinglist.service@outlook.com</strong></li>
		</ul>
	</div>
</template>

<style scoped>
.pp-complete-container {
	overflow-y: auto;
	height: 100%;
}

h1 {
	color: #2c3e50;
	border-bottom: 2px solid #3498db;
	padding-bottom: 10px;
}
h2 {
	color: #2980b9;
	margin-top: 40px;
	border-left: 4px solid #3498db;
	padding-left: 15px;
}
h3 {
	color: #34495e;
	margin-top: 25px;
}
ul,
ol {
	padding-left: 25px;
}
li {
	margin-bottom: 8px;
}
.highlight-box {
	background: #f8f9fa;
	border: 1px solid #e9ecef;
	padding: 20px;
	border-radius: 8px;
	margin: 20px 0;
}
.premium-note {
	background: #fff3cd;
	border: 1px solid #ffeeba;
	padding: 15px;
	border-radius: 8px;
	font-weight: bold;
	color: #856404;
}
</style>
