import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <div className="privacy-header">
                <h1>Privacy Policy</h1>
                <p>Effective Date: November 28, 2025</p>
            </div>

            <div className="privacy-content">
                <div className="legal-document">
                    <section>
                        <h2>1. Introduction</h2>
                        <p>Intact ID Inc. ("Intact ID," "we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website, use our identity verification services, or interact with our platform.</p>
                        <p>By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this policy, please do not access the site.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device ("personal information").</p>

                        <h3>2.1 Information You Provide to Us</h3>
                        <ul>
                            <li><strong>Identity Data:</strong> Name, date of birth, government-issued identification documents (e.g., passport, driver's license) provided for verification purposes.</li>
                            <li><strong>Contact Data:</strong> Email address, telephone number, billing address, and mailing address.</li>
                            <li><strong>Professional Data:</strong> Company name, job title, and business contact information for enterprise clients.</li>
                            <li><strong>Biometric Data:</strong> Facial scan data derived from photographs or videos submitted for identity verification (processed in accordance with applicable biometric privacy laws).</li>
                        </ul>

                        <h3>2.2 Information We Collect Automatically</h3>
                        <ul>
                            <li><strong>Usage Data:</strong> Information about how you use our website and services, including access times, pages viewed, and the route by which you access our services.</li>
                            <li><strong>Device Data:</strong> IP address, browser type, operating system, device identifiers, and mobile network information.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, beacons, and similar technologies to track activity on our services and hold certain information.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the collected data for various purposes, including but not limited to:</p>
                        <ul>
                            <li><strong>Service Provision:</strong> To provide, operate, and maintain our identity verification services.</li>
                            <li><strong>Verification:</strong> To verify your identity and prevent fraud, money laundering, and other illegal activities.</li>
                            <li><strong>Improvement:</strong> To improve, personalize, and expand our website and services.</li>
                            <li><strong>Communication:</strong> To understand and analyze how you use our services and to communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                            <li><strong>Compliance:</strong> To comply with applicable legal and regulatory requirements, such as KYC (Know Your Customer) and AML (Anti-Money Laundering) laws.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Data Sharing and Disclosure</h2>
                        <p>We do not sell your personal information. We may share your information in the following situations:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., cloud hosting, data analysis).</li>
                            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Data Security</h2>
                        <p>We use administrative, technical, and physical security measures to help protect your personal information. These measures include encryption, firewalls, and secure socket layer (SSL) technology. We are SOC2 Type II compliant and adhere to ISO 27001 standards. However, please be aware that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</p>
                    </section>

                    <section>
                        <h2>6. Data Retention</h2>
                        <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
                    </section>

                    <section>
                        <h2>7. Your Privacy Rights</h2>
                        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                        <ul>
                            <li>The right to access – You have the right to request copies of your personal data.</li>
                            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul>
                            <li>By email: privacy@intactid.com</li>
                            <li>By mail: Intact ID Inc., 123 Security Way, Tech City, CA 94000</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
