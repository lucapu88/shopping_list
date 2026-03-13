<script setup></script>

<script>
export default {};
</script>

<template>
	<div class="pp-complete-container">
		<h1>Privacy Policy</h1>
		<p><small>Last updated: March 13, 2026</small></p>

		<p>This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

		<div class="highlight-box">
			<h2>Interpretation and Definitions</h2>
			<h3>Definitions</h3>
			<ul>
				<li><strong>Company</strong> (referred to as "the Company", "We", "Us" or "Our") refers to Luca Caputo, Italy.</li>
				<li><strong>Service</strong> refers to the Shopping List application (Web and Android).</li>
				<li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
				<li><strong>Usage Data</strong> refers to data collected automatically, such as IP addresses or device identifiers.</li>
			</ul>
		</div>

		<h2>1. Data Collection and Storage</h2>

		<h3>A. Local Storage (Client-Side)</h3>
		<p>The Service is designed to prioritize user privacy. Your shopping lists, expenses, and items are stored locally on Your device using <strong>LocalStorage</strong> and <strong>IndexedDB (idb)</strong>.</p>
		<ul>
			<li>We do not have access to this data.</li>
			<li>This data remains under Your exclusive control and can be deleted by clearing Your browser cache or uninstalling the app.</li>
		</ul>

		<h3>B. Third-Party Service Providers</h3>
		<p>To provide specific functionalities, We use the following third-party services which may process Your data:</p>
		<ul>
			<li><strong>Stripe:</strong> Payment processing. We do not store Your credit card details; they are handled directly by Stripe.</li>
			<li><strong>Supabase:</strong> Backend infrastructure and authentication. It may process technical metadata and account information.</li>
			<li><strong>OpenAI / LangChain:</strong> If You use AI features, text inputs are sent to OpenAI for processing. Please do not provide sensitive personal information in AI prompts.</li>
			<li><strong>Netlify & Kodular:</strong> Hosting and application framework providers that may collect standard server logs (IP addresses).</li>
		</ul>

		<h2>2. Use of Your Personal Data</h2>
		<p>The Company may use Personal Data for the following purposes:</p>
		<ul>
			<li>To provide and maintain our Service.</li>
			<li>For the performance of a contract (e.g., processing a payment via Stripe).</li>
			<li>To manage Your requests and support.</li>
		</ul>

		<h2>3. Disclosure and Transfer of Data</h2>
		<p>
			Your information may be processed at the Company's operating offices and in any other places where the parties involved (like Stripe or Supabase) are located. This means data may be transferred to computers located outside of Your country,
			including the United States, where data protection laws may differ.
		</p>

		<h2>4. Children's Privacy</h2>
		<p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children. If We become aware of such collection, We will take steps to remove that information.</p>

		<h2>5. Your Rights (GDPR)</h2>
		<p>Under the General Data Protection Regulation (GDPR), You have the right to access, update, or delete the information We have on You (where applicable, such as your Supabase account or Stripe transaction history).</p>

		<h2>6. Contact Us</h2>
		<p>If you have any questions about this Privacy Policy, You can contact us:</p>
		<ul>
			<li>By email: <strong>shoppinglist.service@outlook.com</strong></li>
		</ul>

		<div class="footer">
			<p>This policy is compliant with international standards and specifically tailored for the Shopping List application ecosystem.</p>
		</div>
	</div>
</template>

<style scoped>
.pp-complete-container {
	overflow-y: auto;
	height: 100%;
}
</style>
