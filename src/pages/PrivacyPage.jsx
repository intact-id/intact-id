import LegalPage from './LegalPage.jsx';
import { openCookieSettings } from '../lib/cookies.js';

const SUMMARY = [
  'When a business uses Intact ID to verify you, that business decides why your data is used. We process it for them and only on their instructions.',
  'We collect what each check needs, keep every client’s data separate and encrypt all of it. We do not sell personal data.',
  'You can ask to see, correct or delete your data. Write to [legal@intact-io.com](mailto:legal@intact-io.com) and we will help, or pass your request to the business that verified you.',
];

const SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    blocks: [
      'Intact ID provides identity verification (KYC), business verification (KYB), sanctions and PEP screening, customer risk assessment and transaction monitoring to banks, fintechs, payment companies and other regulated businesses in Africa. We are based in Nairobi, Kenya, and registered with Kenya’s Office of the Data Protection Commissioner (ODPC).',
      'This notice explains how we handle personal data under Kenya’s Data Protection Act, 2019, and the data protection laws of the other countries where our clients operate.',
    ],
  },
  {
    id: 'roles',
    title: 'Our two roles',
    blocks: [
      { terms: [
        ['When we check you for one of our clients', 'A bank, fintech or other business asks us to verify you, screen you or monitor your payments. That business is the data controller and decides why your data is used. We are its data processor: we act only on its written instructions and under a data processing agreement. Its own privacy notice explains its reasons.'],
        ['When you deal with us directly', 'You visit this website, contact us, open a sandbox or trial account, become a partner or apply for a job. Here Intact ID is the data controller.'],
      ] },
    ],
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    blocks: [
      'When we check you for a client, depending on the checks that client has chosen:',
      { list: [
        'Identity details such as your name, date of birth, nationality, ID number and address.',
        'Images of your ID document.',
        'A selfie or short video for the liveness check, and the face data taken from it to compare with your document. Biometric data is sensitive personal data, and we treat it that way.',
        'Results from official registries and verification partners, for example a national ID registry.',
        'Sanctions, PEP and adverse media screening results.',
        'For businesses: registration details, directors and beneficial owners.',
        'For payment checks: payment details such as amount, date, channel, the sender and the receiver, and the device and location details the client sends with each payment.',
        'The results we produce: match results, risk scores, decisions and the reasons behind them.',
      ] },
      'When you deal with us directly:',
      { list: [
        'Your name, work email, phone number, company and what you write to us.',
        'Account details if you use our portal, sandbox or trial.',
        'Your CV and application details if you apply for a job.',
        'Basic technical data when you visit this website, such as your IP address, browser and the pages you open. See [cookies](/privacy#cookies) below.',
      ] },
    ],
  },
  {
    id: 'why',
    title: 'Why we use it',
    blocks: [
      { list: [
        'To run the checks a client asked for: verifying identity, screening, scoring risk and monitoring payments. The client’s lawful basis covers this, and for us it is the contract with that client.',
        'To meet legal duties, such as keeping anti-money laundering records.',
        'To keep the service secure and to detect fraud and misuse.',
        'To answer you, set up a trial and run our contracts with clients and partners.',
        'To consider your job application.',
        'To send you product news, only if you agreed. You can unsubscribe at any time.',
      ] },
      'We use biometric data only to confirm you are a real person and the person on the document. We do not use it for anything else, and we do not sell personal data.',
    ],
  },
  {
    id: 'automated-decisions',
    title: 'Automated decisions',
    blocks: [
      'Some of our checks give an automatic result, such as a document match, a risk score, or allow, review or block for a payment. Every result is recorded with the reasons behind it, and our clients can have a person review it.',
      'If a decision made with our checks affects you, you can ask the business that checked you for a review by a person. We will help them answer you.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    blocks: [
      { list: [
        'The client who asked for the check.',
        'Official registries, verification partners and screening list providers, only as far as each check needs.',
        'Service providers who host and run our systems, under contracts that protect your data.',
        'Courts, regulators and law enforcement when the law requires it.',
      ] },
      'Suspicious transaction reports to a financial intelligence unit are filed by our clients, not by us.',
    ],
  },
  {
    id: 'transfers',
    title: 'Transfers outside Kenya',
    blocks: [
      'Some of our clients and service providers are outside Kenya. When personal data leaves the country, we transfer it only with the safeguards the Data Protection Act requires, such as contracts that hold the receiver to the same standard of protection.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    blocks: [
      'We keep data from client checks for as long as the client instructs and the law requires. Anti-money laundering rules often require records to be kept for seven years after a customer relationship ends. When the period ends, we delete the data or make it anonymous.',
      'We keep enquiries and account details for as long as we need them to work with you. We keep job applications until the role is filled, unless you agree that we may keep yours for future roles.',
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    blocks: [
      'Each client’s data is kept separate from every other client’s. All data is encrypted while it travels and while it is stored. Access is limited by role, and every action on a record is logged. Read more on our [security page](/security).',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    blocks: [
      'Under Kenya’s Data Protection Act you have the right to:',
      { list: [
        'Be told how your data is used.',
        'Get a copy of your data.',
        'Have wrong or misleading data corrected.',
        'Have data deleted when there is no longer a reason to keep it.',
        'Object to or restrict some uses of your data.',
        'Get your data in a format you can take elsewhere.',
        'Ask for a person to review a decision made only by automated means.',
      ] },
      'To use these rights, write to [legal@intact-io.com](mailto:legal@intact-io.com). If we checked you for a client, we will pass your request to that client and help them answer it. Some rights are limited by law. For example, anti-money laundering records must be kept even if you ask us to delete them.',
      'If you are not happy with our answer, you can complain to the [Office of the Data Protection Commissioner](https://www.odpc.go.ke).',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    blocks: [
      'Cookies are small files a website stores in your browser. We use two kinds:',
      { terms: [
        ['Essential', 'These keep the website working and secure, and remember your cookie choice. They are always on.'],
        ['Analytics', 'These tell us which pages are read, so we can improve them. We only use them if you choose “Allow analytics”.'],
      ] },
      'You can change your choice at any time.',
    ],
  },
  {
    id: 'children',
    title: 'Children',
    blocks: [
      'This website is not meant for children. If a client checks a person under 18, the client must have a lawful reason and any consent the law requires.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this notice',
    blocks: [
      'When we change this notice we will update the date at the top. If a change matters to you, we will tell our clients and, where we can, the people affected.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    blocks: [
      'For privacy questions and requests: [legal@intact-io.com](mailto:legal@intact-io.com). For anything else: [contact@intact-io.com](mailto:contact@intact-io.com). Intact ID, Nairobi, Kenya.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      docTitle="Intact ID — Privacy notice"
      title="Privacy notice"
      updated="12 November 2026"
      intro="How Intact ID collects, uses and protects personal data, both when we check people for our clients and when you deal with us directly."
      summary={SUMMARY}
      sections={SECTIONS}
      extra={<button type="button" className="lg__ck" onClick={openCookieSettings}>Change cookie settings</button>}
    />
  );
}
