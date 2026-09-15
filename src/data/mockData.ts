import { CourseModule, CredentialRecord, UserProfile, SandboxScenario } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user-001',
  name: 'Marcus Vance',
  role: 'Trainee / Ministry Officer',
  department: 'Department of Digital Infrastructure',
  ministry: 'Ministry for Digital Transformation',
  clearanceLevel: 'Secret',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDABrucAL4ZlTjrY_UEOQqC2jr8p798ZlixdOEFY-HbQwHoV3nqia8aXdVLNoHDN7zRXwMlNqvEhhqAHfUC7gW_0NSo3LcvysvFquAlZIw_uHOF8mlObpC0xyh5BHUHBy4WLrujMJjFvOmjbEGCeonsrL7TQiitQzuXuYJadfrnAV45A-TOfG6u0OU3LQu-CxfGDq-4JM--WkXboGtNFugeJYvVMv_DgGMTZGcRcW5Gei5_khiboMLzJg',
  govId: 'GOV-884-VA-2026',
  completionRate: 95.0,
  activeModules: 4,
  earnedCredentials: 3,
};

export const AVAILABLE_PROFILES: UserProfile[] = [
  CURRENT_USER,
  {
    id: 'user-002',
    name: 'Dr. Elena Rostova',
    role: 'Chief Data Steward & Directorate Head',
    department: 'Directorate of Public Intelligence',
    ministry: 'Federal Council for Innovation',
    clearanceLevel: 'Sovereign Executive',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA14eIvwJMhVwT9ABKf_PF07FF9C0k-REUL8fvFBr_Q8e1wHbObH0nPz2Xqno4xnRYwUqDMKU-fudKbJZeLZmkgpzFDafvMvm-WHw1bwYQRCLt2p6hqcDzj71NdKx1lktjGRJLrAmnfvSekTjLyrnsxRUDlSntKh1xIJygFTQ7l-BySsSsnMyboqZrCTgq0U71KpzYt6M73QPdrV8GoJ2UgmnbXGKue4Vdp287YoXAbxy3ZWBmDReeSfw',
    govId: 'GOV-102-RO-2024',
    completionRate: 98.4,
    activeModules: 2,
    earnedCredentials: 7,
  },
  {
    id: 'user-003',
    name: 'Col. David Chen',
    role: 'Cyber Incident Lead',
    department: 'National Critical Systems Defense',
    ministry: 'Ministry of Defense & Cyber Governance',
    clearanceLevel: 'Sovereign Executive',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH175oDxBaXeieYbezNJC3UFsQF_axRCWAmK8BeXYdlRiZ3FsgD8Fr47b6QD_paUP6x4_Y0CjGE6tw1oxuLLzK9eMK-dXk3HpSSnfmOzmZtxf4YhfTLTxst4pPEtgcbJT_KKXOOwrV1zRV-EcFLvrNnA_cLtahEgj3qy7PxLKZ12_LtFrOqgDhq4KKfAnii5G_vO6UZPpgytX5VPJRkf47ZOIxl21oIZk-xwL9aad7paWCo5BX7LBMaw',
    govId: 'GOV-551-CH-2025',
    completionRate: 91.2,
    activeModules: 5,
    earnedCredentials: 5,
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'MOD-CYB-01',
    title: 'Sovereign Cloud & Perimeter Failover Orchestration',
    category: 'Sovereign Cloud',
    level: 'Intermediate',
    durationHours: 36,
    isoAccreditation: 'ISO/IEC 27001 & Standard 4.0',
    description: 'Master isolation protocols, cross-ministerial data zoning, and high-availability container failovers under simulated national cyber emergencies.',
    skills: ['Zero-Trust Mesh', 'Kubernetes Gov-Cluster', 'Air-Gapped Sync', 'Disaster Recovery'],
    enrolledOfficers: 4210,
    rating: 4.9,
    completionPercent: 82,
    syllabus: [
      { unit: 'Unit 1', topics: ['Sovereign Node Topologies', 'State Key Provisioning'] },
      { unit: 'Unit 2', topics: ['Real-time Perimeter Breach Simulation', 'Automated Triage Routing'] },
      { unit: 'Unit 3', topics: ['Inter-Agency Mesh Replication', 'Audit Trail Lockout'] },
    ]
  },
  {
    id: 'MOD-AIG-02',
    title: 'AI Governance & Algorithmic Impact Assessment for Civil Service',
    category: 'AI Governance',
    level: 'Executive Directorate',
    durationHours: 28,
    isoAccreditation: 'EU AI Act Public Sector Standard 4.0',
    description: 'Implement rigorous algorithmic auditing frameworks, mitigate institutional bias, and maintain democratic transparency in automated civil casework.',
    skills: ['Ethical Guardrails', 'Model Auditing', 'Casework Explanability', 'Procurement Vetting'],
    enrolledOfficers: 5890,
    rating: 4.8,
    completionPercent: 100,
    syllabus: [
      { unit: 'Unit 1', topics: ['Algorithmic Accountability Frameworks', 'Statutory Compliance'] },
      { unit: 'Unit 2', topics: ['Red-Teaming Decision Support Systems', 'Bias Detection Tools'] },
      { unit: 'Unit 3', topics: ['Citizen Recourse Architecture', 'Public Register Declarations'] },
    ]
  },
  {
    id: 'MOD-PKI-03',
    title: 'Cryptographic Credentialing & PKI Ledger Integration',
    category: 'Cryptographic Systems',
    level: 'Intermediate',
    durationHours: 24,
    isoAccreditation: 'W3C Verifiable Credentials & ISO 18013',
    description: 'Build and deploy tamper-evident public service credentials, interoperable digital identity keys, and zero-knowledge verification endpoints.',
    skills: ['ECDSA Signatures', 'Decentralized Identifiers (DID)', 'Selective Disclosure', 'Merkle Tree Auditing'],
    enrolledOfficers: 3410,
    rating: 4.9,
    completionPercent: 65,
    syllabus: [
      { unit: 'Unit 1', topics: ['Government Root CA & Key Ceremony Protocols'] },
      { unit: 'Unit 2', topics: ['JSON-LD Signature Verification & Revocation Registries'] },
      { unit: 'Unit 3', topics: ['Border & Mobile PKI Interoperability Testing'] },
    ]
  },
  {
    id: 'MOD-DAT-04',
    title: 'National Open Data Architecture & Inter-Ministerial Sharing',
    category: 'Data Policy',
    level: 'Foundational',
    durationHours: 18,
    isoAccreditation: 'DCAT-AP & Open Gov Standard 4.0',
    description: 'Establish federated data pipelines, privacy-preserving aggregation, and high-frequency analytical dashboards for evidence-based policymaking.',
    skills: ['Federated Cataloging', 'Differential Privacy', 'API Gateways', 'Cross-Domain Semantic Models'],
    enrolledOfficers: 8120,
    rating: 4.7,
    completionPercent: 100,
    syllabus: [
      { unit: 'Unit 1', topics: ['Standardizing Government Data Schemas'] },
      { unit: 'Unit 2', topics: ['Automated Anonymization & De-identification Pipelines'] },
      { unit: 'Unit 3', topics: ['Open Data Release Gates and Quality Metrics'] },
    ]
  },
  {
    id: 'MOD-TRI-05',
    title: 'Crisis Triage & Emergency Civic Communications Simulation',
    category: 'Incident Triage',
    level: 'Intermediate',
    durationHours: 30,
    isoAccreditation: 'FEMA / ISO 22301 Aligned',
    description: 'Live disaster response sandbox exercises simulating public alerts, utility grid disruptions, and inter-agency coordination channels.',
    skills: ['Mass Alert Routing', 'Satellite Fallback Comms', 'Multi-Agency Incident Command', 'Public Verification Feeds'],
    enrolledOfficers: 2940,
    rating: 4.9,
    completionPercent: 40,
    syllabus: [
      { unit: 'Unit 1', topics: ['Emergency Incident Command System (EICS)'] },
      { unit: 'Unit 2', topics: ['Anti-Misinformation Rapid Triage & Signed Bulletins'] },
      { unit: 'Unit 3', topics: ['Fail-safe Infrastructure Activation Drill'] },
    ]
  }
];

export const CREDENTIALS_LIST: CredentialRecord[] = [
  {
    id: 'CRED-2026-001',
    serialNumber: 'CAP-2026-SOV-8492',
    title: 'Executive AI Governance & Public Algorithmic Oversight',
    recipientName: 'Marcus Vance',
    recipientGovId: 'GOV-884-VA-2026',
    issuingMinistry: 'Ministry for Digital Transformation',
    issuanceDate: '2026-06-12',
    expiryDate: '2029-06-12',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    ledgerBlockHeight: 1482910,
    status: 'Verified',
    isoStandard: 'Standard 4.0 ISO Certified',
    pkiSignatureKey: 'did:gov:key:z6MkqGPYx71M5DkP4nNn8t1r',
  },
  {
    id: 'CRED-2025-002',
    serialNumber: 'CAP-2025-DAT-4120',
    title: 'National Open Data Architecture & Sovereign Data Federation',
    recipientName: 'Marcus Vance',
    recipientGovId: 'GOV-884-VA-2026',
    issuingMinistry: 'Federal Council for Digital Innovation',
    issuanceDate: '2025-11-20',
    expiryDate: '2028-11-20',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    ledgerBlockHeight: 1104822,
    status: 'Verified',
    isoStandard: 'Standard 4.0 ISO Certified',
    pkiSignatureKey: 'did:gov:key:z6MksV7W8qQ5gLz9Y1kRtX6j',
  },
  {
    id: 'CRED-2025-003',
    serialNumber: 'CAP-2025-CYB-1904',
    title: 'Foundations of Sovereign Cloud & Zero-Trust Architecture',
    recipientName: 'Marcus Vance',
    recipientGovId: 'GOV-884-VA-2026',
    issuingMinistry: 'Ministry of Defense & Cyber Governance',
    issuanceDate: '2025-04-15',
    expiryDate: '2028-04-15',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    ledgerBlockHeight: 893412,
    status: 'Verified',
    isoStandard: 'Standard 4.0 ISO Certified',
    pkiSignatureKey: 'did:gov:key:z6MkjH9T4bN1vF3yZ8wPmC2q',
  }
];

export const SANDBOX_SCENARIOS: SandboxScenario[] = [
  {
    id: 'SCEN-01',
    title: 'Perimeter Failover in Central Registry Data Center',
    category: 'Sovereign Cloud',
    difficulty: 'Critical',
    timeLimitMinutes: 15,
    description: 'A sudden regional network partitioning cuts off North Gateway. Redirect cryptographic traffic to backup air-gapped sovereign cluster while sustaining identity check pipelines.',
    terminalLogSnippet: '$ capacity-connect init --module=cyber-gov\n[OK] Synchronizing sovereign agency profiles...\n[OK] Injecting randomized perimeter compromise scenario...\nPrompt: Establish triage protocols and authorize failover mesh within 3 minutes.',
    activeNodes: 14,
  },
  {
    id: 'SCEN-02',
    title: 'Public Benefit Triage Algorithmic Red-Teaming',
    category: 'AI Governance',
    difficulty: 'Elevated',
    timeLimitMinutes: 20,
    description: 'Inspect a production social support eligibility classifier for socio-geographic scoring drift. Pinpoint biased feature weights and issue instant ministerial override.',
    terminalLogSnippet: '$ capacity-connect audit --model=benefits-v4\n[INFO] Loading 50,000 anonymized test casework records...\n[WARN] Disparity detected in Sector-7 approval distribution.\nPrompt: Quarantine model branch and export forensic audit payload.',
    activeNodes: 8,
  },
  {
    id: 'SCEN-03',
    title: 'Tamper-Evident Diplomatic Key Revocation',
    category: 'Cryptographic Systems',
    difficulty: 'Standard',
    timeLimitMinutes: 10,
    description: 'Simulate emergency revocation of compromised ministerial signing keys and broadcast cryptographic proof to 34 federated embassies within 120 seconds.',
    terminalLogSnippet: '$ capacity-connect pki revoke --key-id=emb-9421\n[OK] Constructing cryptographic revocation certificate...\n[OK] Propagating hash to 34 federal validator nodes...\nStatus: Ledger confirmation verified at block #1482918.',
    activeNodes: 34,
  }
];
