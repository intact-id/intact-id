import LegalPage from './LegalPage.jsx';

const SUMMARY = [
  'These terms cover this website, the sandbox and the free trial. Paid use of Intact ID is covered by your signed agreement with us.',
  'Only check people and businesses when you have a lawful reason and have told them, as data protection law requires.',
  'Our results support your compliance decisions. The decisions, and your duties to your regulator, stay yours.',
];

const SECTIONS = [
  {
    id: 'about',
    title: 'About these terms',
    blocks: [
      'These terms apply when you use the Intact ID website, the sandbox or a free trial. By using them you accept these terms. If you use them for a company, you confirm that you may accept these terms for it.',
    ],
  },
  {
    id: 'website',
    title: 'The website',
    blocks: [
      'The website explains what Intact ID does. It is not legal or compliance advice. People, companies, amounts and scores shown on the website are examples.',
      'We may change or remove parts of the website at any time.',
    ],
  },
  {
    id: 'trial',
    title: 'Accounts, sandbox and free trial',
    blocks: [
      { list: [
        'Give accurate details when you sign up, and keep your login details safe. You are responsible for what happens under your account.',
        'The sandbox is for test data. Do not put real people’s data into it.',
        'The free trial lasts 14 days and includes 150 checks. During the trial, only check people and businesses when you have a lawful reason and have told them.',
        'When the trial ends, checks stop until you choose a plan.',
        'We may pause or close a sandbox or trial account that breaks these terms.',
      ] },
    ],
  },
  {
    id: 'paid',
    title: 'Paid use',
    blocks: [
      'Paid use of Intact ID is covered by your agreement with us, your order and our data processing agreement. If those documents and these terms disagree, those documents apply.',
      'Prices are shown in US dollars on our [pricing page](/pricing). We may change prices with notice, as your agreement sets out.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    blocks: [
      'You must not:',
      { list: [
        'Use Intact ID to check anyone without a lawful reason, or for any unlawful purpose.',
        'Use results to discriminate against people unlawfully.',
        'Try to get around our security, test our systems under heavy load, or access data that is not yours.',
        'Copy, scrape or reverse-engineer the service, or resell it without our written agreement.',
        'Upload malware or anything that could harm our systems or other users.',
      ] },
    ],
  },
  {
    id: 'data',
    title: 'Your data and ours',
    blocks: [
      'Data you send us remains yours. You allow us to use it to provide the service, as our [privacy notice](/privacy) and our data processing agreement describe.',
      'Intact ID owns the website, the software and our brand. You may not use our name or logo without our written agreement. If you send us feedback, we may use it to improve the service.',
    ],
  },
  {
    id: 'third-parties',
    title: 'Registries and other data sources',
    blocks: [
      'Some checks depend on official registries, verification partners and screening lists that we do not control. We cannot promise they are always available or always correct.',
      'Our results are signals that support your decisions. You remain responsible for your compliance decisions and your duties to your regulator.',
    ],
  },
  {
    id: 'liability',
    title: 'Our responsibility',
    blocks: [
      'The website, sandbox and trial are provided as they are, without promises beyond those the law requires. As far as the law allows, we are not responsible for indirect losses such as lost profit or lost data from their use.',
      'Nothing in these terms limits responsibility that the law does not allow us to limit.',
    ],
  },
  {
    id: 'ending',
    title: 'Pausing or ending access',
    blocks: [
      'You can stop using the website, sandbox or trial at any time. We may pause or end access if you break these terms or the law, or if we need to protect our service or other users.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    blocks: [
      'When we change these terms we will update the date at the top. If you keep using the website after a change, the new terms apply.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law',
    blocks: [
      'These terms are governed by the laws of Kenya, and the courts of Kenya will decide any dispute about them.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    blocks: [
      'Questions about these terms: [legal@intact-io.com](mailto:legal@intact-io.com).',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      docTitle="Intact ID — Terms of use"
      title="Terms of use"
      updated="12 November 2026"
      intro="The rules for using the Intact ID website, the sandbox and the free trial."
      summary={SUMMARY}
      sections={SECTIONS}
    />
  );
}
