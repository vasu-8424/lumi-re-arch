import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import logo from "@/assets/logo.png";
import {
  Activity,
  User,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Stethoscope,
  FileText,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Printer,
  Brain,
  HeartPulse,
  Award,
  Home,
  ArrowLeft,
  Bed,
  Pill,
  Utensils,
  Zap,
  Check,
  X,
  FileCheck,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Accessibility,
  Footprints,
  Eye,
  Sliders,
  Building2,
  Share2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Clinical Admin Dashboard — Guild Services | Speech & Physical Rehab" },
      {
        name: "description",
        content:
          "Official Hospital EHR Dashboard: Patient Demographics, Speech Therapy, Physical Rehabilitation & Physiotherapy, VitalStim NMES, Session Logs, and Discharge Summaries.",
      },
    ],
    links: [
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
  component: AdminDashboard,
});

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & DATA CONTRACTS
// ─────────────────────────────────────────────────────────────────────────────

export interface SessionRecord {
  id: string;
  date: string;
  sessionNumber: number;
  therapist: string;
  modality: string;
  durationMinutes: number;
  exercises: string;
  patientResponse: string;
}

export interface PatientRecord {
  id: string;
  mrn: string; // Medical Record Number
  admissionDate: string;
  status: "Inpatient - Active" | "Outpatient - Active" | "Evaluation" | "Ready for Discharge" | "Discharged";
  roomNo: string;
  ward: string;

  // Personal & Contact Details
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contactNumber: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;

  // Diagnosis
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  referringPhysician: string;
  severityLevel: "Mild" | "Moderate" | "Moderate-Severe" | "Severe";

  // Medical Records & Vitals
  medicalHistory: string;
  currentMedications: string[];
  allergies: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    spo2: string;
    respiratoryRate: string;
    temperature: string;
  };
  clinicalPrecautions: string;

  // Physical Rehabilitation
  physicalRehabilitation: {
    mobilityStatus: string;
    gaitAndBalance: string;
    rangeOfMotionAndTone: string;
    bergBalanceScore: string;
    functionalIndependenceMeasure: string;
    physioInterventions: string[];
    equipmentUtilized: string;
    attendingPhysiotherapist: string;
    ptSessionsPrescribed: number;
    ptSessionsAttended: number;
  };

  // Speech Assessment & Therapy Details
  speechAssessment: {
    assessmentDate: string;
    assessmentTool: string;
    speechIntelligibility: string;
    articulationScore: string;
    voiceAndResonance: string;
    oralMotorFunction: string;
  };
  preTherapyDetails: {
    baselineCommunicationScore: string;
    baselineSwallowingSafety: string;
    penetrationAspirationScale: string;
    initialImpairments: string;
  };
  therapyProgramDetails: {
    programGoal: string;
    frequency: string;
    programDuration: string;
    focusAreas: string[];
  };
  speechTherapy: {
    focusModules: string[];
    articulationDrills: string;
    languageComprehension: string;
    voiceTherapy: string;
  };
  dysphagiaTherapy: {
    dietConsistency: string;
    swallowManeuvers: string[];
    thermalTactileStimulation: string;
    positioningAndPacing: string;
  };
  vitalStimTherapy: {
    channel1Current: string;
    channel2Current: string;
    pulseDuration: string;
    electrodePlacement: string;
    sessionDuration: string;
    toleranceAndPrecautions: string;
  };

  // Sessions & Therapists
  therapistDetails: {
    leadTherapist: string;
    licenseNo: string;
    department: string;
    contact: string;
  };
  sessionsPrescribed: number;
  sessionsAttended: number;
  sessionHistory: SessionRecord[];

  // Progress Report
  progressReport: {
    recoveryRatePercentage: number;
    speechClarityGain: string;
    swallowingSafetyGain: string;
    physicalMobilityGain: string;
    vitalStimMuscleToneGain: string;
    therapistClinicalImpression: string;
    nextMilestoneTarget: string;
  };

  // Discharge Summary
  dischargeSummary: {
    status: "In Progress" | "Pending Final Evaluation" | "Approved for Discharge" | "Discharged";
    proposedDischargeDate: string;
    criteriaAchieved: string[];
    functionalStatusAtDischarge: string;
    summaryOfInterventions: string;
    physicianSignoff: string;
  };

  // Home Management
  homeManagement: {
    homeExerciseProgram: string[];
    safeSwallowingGuidelines: string[];
    physicalMobilityHomePlan: string[];
    caregiverSafetyInstructions: string;
    followUpSchedule: string;
    emergencyContactProtocol: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL CLINICAL PATIENTS DATA
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: "pat-01",
    mrn: "MRN-2026-8491",
    admissionDate: "2026-09-18",
    status: "Inpatient - Active",
    roomNo: "304",
    ward: "Neuro-Rehabilitation & Mobility Wing",
    name: "Vikramaditya Rao",
    age: 62,
    gender: "Male",
    contactNumber: "+91 98450 12849",
    email: "v.rao.family@gmail.com",
    address: "Flat 402, Sai Residency, Banjara Hills, Hyderabad, TS",
    emergencyContactName: "Meenakshi Rao",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+91 98450 99231",

    primaryDiagnosis: "Post-Ischemic Stroke Dysphagia, Broca's Aphasia & Right Hemiparesis",
    secondaryDiagnosis: "Chronic Hypertension, Right Foot Drop, Mild Dysarthria",
    referringPhysician: "Dr. K. S. Sundaram, MD, DM (Neurology)",
    severityLevel: "Moderate-Severe",

    medicalHistory:
      "Left MCA thromboembolic stroke 6 weeks ago. Initial ICU admission with temporary NG tube and right-sided motor deficit. History of hypertension (10 yrs, medication controlled).",
    currentMedications: [
      "Aspirin 75mg OD (Post-lunch)",
      "Atorvastatin 40mg HS",
      "Telmisartan 40mg OM",
      "Baclofen 10mg BD (Anti-spasticity)",
    ],
    allergies: ["Penicillin (Cutaneous rash)", "NSAIDs (Mild gastric upset)"],
    vitalSigns: {
      bloodPressure: "128/82 mmHg",
      heartRate: "74 bpm (Regular)",
      spo2: "98% on Room Air",
      respiratoryRate: "16 breaths/min",
      temperature: "98.4° F",
    },
    clinicalPrecautions:
      "Aspiration risk with thin liquids. Strict fall precautions during sit-to-stand transfers. Assist right upper limb during dressing.",

    physicalRehabilitation: {
      mobilityStatus: "Ambulatory with single quad cane; right ankle-foot orthosis (AFO) fitted.",
      gaitAndBalance: "Hemiparetic gait with circumduction pattern; cadence improved to 68 steps/min.",
      rangeOfMotionAndTone: "Modified Ashworth Scale Grade 1+ right biceps spasticity; shoulder subluxation reduced to zero.",
      bergBalanceScore: "BBS Score: 44 / 56 (Low-to-moderate fall risk, up from 22 baseline).",
      functionalIndependenceMeasure: "FIM Motor Score: 68 / 91 (Independent transfers and supervised stair climbing).",
      physioInterventions: [
        "Body-Weight Supported Treadmill Gait Training (BWSTT)",
        "Neuro-Developmental Therapy (Bobath Concept) for trunk symmetry",
        "Functional Electrical Stimulation (FES) to Common Peroneal Nerve",
        "Constraint-Induced Movement Therapy (CIMT) for right arm reach",
        "Dynamic balance board and obstacle stepping drills",
      ],
      equipmentUtilized: "Biodex Gait Trainer, Neuro-FES Drop Foot Stimulator, Parallel Bars, Tilt Table.",
      attendingPhysiotherapist: "Dr. Sandeep K. Varma, MPT (Neuro-Rehabilitation), MIAP",
      ptSessionsPrescribed: 25,
      ptSessionsAttended: 19,
    },

    speechAssessment: {
      assessmentDate: "2026-09-20",
      assessmentTool: "Western Aphasia Battery (WAB-R) & Frenchay Dysarthria-2",
      speechIntelligibility: "60% intelligible at conversational level with visual cues.",
      articulationScore: "Lingual precision reduced for alveolar /t, d/ and velar /k, g/ phonemes.",
      voiceAndResonance: "Mild hypophonia with slight breathy quality, no hypernasality.",
      oralMotorFunction: "Right unilateral facial weakness. Tongue protrusion right deviation grade 2.",
    },
    preTherapyDetails: {
      baselineCommunicationScore: "WAB Aphasia Quotient: 58.4 / 100 (Moderate Broca's)",
      baselineSwallowingSafety: "FOIS Level 2: Tube dependent with minimal oral trials.",
      penetrationAspirationScale: "PAS Level 5 (Material enters airway, cleared with cough)",
      initialImpairments:
        "Severe coughing episodes during water sip trials, word-finding pauses > 12 seconds, inability to initiate steps without bilateral assist.",
    },
    therapyProgramDetails: {
      programGoal:
        "Achieve complete oral feeding autonomy, independent 50-meter ambulation with quad cane, and conversational speech production.",
      frequency: "5 sessions/week (Combined Speech, VitalStim NMES and Neuro-Physiotherapy)",
      programDuration: "6 Weeks Intensive Comprehensive Protocol",
      focusAreas: [
        "VitalStim NMES Neuromuscular Re-education",
        "Sensory-Motor Dysphagia Rehabilitation",
        "Neuro-Physical Rehabilitation & Hemiparetic Gait Training",
        "Melodic Intonation & Language Recovery",
      ],
    },
    speechTherapy: {
      focusModules: ["Constraint-Induced Language Therapy", "Melodic Intonation", "Word Retrieval Drills"],
      articulationDrills: "Targeted repetition of multisyllabic bilabial and alveolar words with pacing board.",
      languageComprehension: "High-accuracy sentence verification tasks (85% accuracy achieved).",
      voiceTherapy: "LSVT principles for vocal projection and sustained /a/ vowel (14 seconds).",
    },
    dysphagiaTherapy: {
      dietConsistency: "IDDSI Level 4: Pureed / Level 2 Mildly Thickened Liquids (Progressed from NPO/NG)",
      swallowManeuvers: [
        "Mendelsohn Maneuver (Prolonged hyolaryngeal excursion for 3 seconds)",
        "Effortful Swallow with bolus cohesion cues",
        "Chin-Tuck posture for all liquid swallows",
        "Masako Maneuver (Tongue-hold) for pharyngeal wall contraction",
      ],
      thermalTactileStimulation:
        "Chilled laryngeal mirror stimulation applied to anterior faucial pillars prior to meals.",
      positioningAndPacing:
        "Strict 90-degree upright posture, small bolus size (5ml teaspoon), double swallow per bolus.",
    },
    vitalStimTherapy: {
      channel1Current: "8.5 mA (Patient sensory threshold: 4.5 mA, motor contraction: 7.5 mA)",
      channel2Current: "9.0 mA (Infrahyoid muscle recruitment verified)",
      pulseDuration: "300 µs biphasic pulsed current at 80 Hz",
      electrodePlacement:
        "Configuration: Dual channel anterior neck. Top pair submental (suprahyoid), bottom pair across thyroid notch (thyrohyoid).",
      sessionDuration: "60 minutes daily concurrent with active swallow trials (pureed bolus)",
      toleranceAndPrecautions:
        "Excellent patient tolerance, no skin erythema or cardiac irregularities. Pacemaker cleared prior to treatment.",
    },

    therapistDetails: {
      leadTherapist: "Dr. Ananya V. Sharma, M.Sc. SLP (Speech) & Dr. Sandeep Varma, MPT (Physio)",
      licenseNo: "RCI-SLP/2021/8849 & IAP/MPT-7741",
      department: "Speech-Language Pathology & Physical Rehabilitation",
      contact: "+91 94480 34102",
    },
    sessionsPrescribed: 25,
    sessionsAttended: 19,
    sessionHistory: [
      {
        id: "s-19",
        date: "2026-10-12",
        sessionNumber: 19,
        therapist: "Dr. Sandeep Varma & Dr. Ananya Sharma",
        modality: "Physical Rehab (BWSTT Gait Training) + VitalStim NMES (9mA)",
        durationMinutes: 60,
        exercises: "300m treadmill ambulation with 20% harness support; concurrent swallowing pureed bolus.",
        patientResponse: "Maintained upright posture without knee hyperextension. Zero coughing on 60ml fluids.",
      },
      {
        id: "s-18",
        date: "2026-10-10",
        sessionNumber: 18,
        therapist: "Dr. Sandeep Varma (PT)",
        modality: "Neuro-Physical Therapy: Transfers & Parallel Bar Stepping",
        durationMinutes: 45,
        exercises: "Sit-to-stand transitions from standard chair (15 reps), lateral weight shifting on foam pad.",
        patientResponse: "Completed all sets with minimal verbal feedback; balance confidence noticeably high.",
      },
      {
        id: "s-17",
        date: "2026-10-08",
        sessionNumber: 17,
        therapist: "Dr. Ananya Sharma (SLP)",
        modality: "Speech Articulation & Functional Sentence Generation",
        durationMinutes: 45,
        exercises: "Naming common room objects, expressing daily needs in 3-4 word phrases, breathing pacing.",
        patientResponse: "Prompt retrieval for 18 out of 20 picture items with minimal phonemic cuing.",
      },
    ],

    progressReport: {
      recoveryRatePercentage: 78,
      speechClarityGain: "+42% improvement in conversational sentence intelligibility (now 85% with family).",
      swallowingSafetyGain: "FOIS improved from Level 2 to Level 5 (Total oral diet with special preparation).",
      physicalMobilityGain: "Ambulation distance increased from 5 meters (dependent) to 60 meters with quad cane; Berg Balance jumped from 22 to 44/56.",
      vitalStimMuscleToneGain: "Submental muscle contractile force improved by 65%; hyoid elevation increased 12mm.",
      therapistClinicalImpression:
        "Remarkable multidisciplinary recovery across speech, swallowing, and motor mobility. Successfully transitioned off feeding tube, walking safely with cane.",
      nextMilestoneTarget:
        "Advance to thin liquids with chin-tuck and independent outdoor community walking of 100 meters.",
    },

    dischargeSummary: {
      status: "Approved for Discharge",
      proposedDischargeDate: "2026-10-18",
      criteriaAchieved: [
        "100% oral nutrition achieved without NG tube dependence",
        "Safe independent ambulation with quad cane and AFO orthosis",
        "Absence of aspiration pneumonia or fever spikes throughout stay",
        "Functional verbal communication of daily physical needs",
        "Primary caregiver trained and certified in safe mealtime and mobility transfers",
      ],
      functionalStatusAtDischarge:
        "Independent ambulatory with quad cane, functional verbal communicator, safe oral feeder on soft diet.",
      summaryOfInterventions:
        "19 sessions of VitalStim NMES, 19 sessions of Neuro-Physical Rehabilitation & Gait Training, and 12 sessions of Broca's aphasia therapy completed.",
      physicianSignoff: "Approved by Dr. K. S. Sundaram (Neurologist), Dr. Sandeep Varma (PT) & Dr. Ananya Sharma (SLP).",
    },

    homeManagement: {
      homeExerciseProgram: [
        "Mendelsohn Maneuver: 10 repetitions, 3 times daily before meals",
        "Masako (Tongue-Hold) Swallows: 10 repetitions twice daily",
        "Oral reading and articulation drill sheets (15 minutes twice daily)",
      ],
      safeSwallowingGuidelines: [
        "Always maintain strict 90° upright seated posture for all food and fluids",
        "Take small teaspoon-sized sips and bites; chew thoroughly",
        "Perform a dry 'clearing swallow' after each bite to prevent pharyngeal residue",
        "Remain upright for at least 30 minutes following every meal",
      ],
      physicalMobilityHomePlan: [
        "Sit-to-stand chair exercises: 10 repetitions, 2 sets daily with supervision",
        "Quad cane walking in hallway: 15 minutes twice daily wearing AFO brace",
        "Active-assisted right arm elevation using overhead pulley (10 reps)",
        "Calf stretch against wall for 30 seconds to maintain ankle dorsiflexion",
      ],
      caregiverSafetyInstructions:
        "Always stand on the patient's weaker (right) side during ambulation. Ensure floor is free of scatter rugs. Monitor for coughing during meals.",
      followUpSchedule: "Outpatient Multi-Disciplinary Clinic Review on 2026-11-02 (2 weeks post-discharge).",
      emergencyContactProtocol:
        "In case of fall, sudden weakness, or fever >100°F: Contact Clinic Emergency Line +91 80082 27539 immediately.",
    },
  },
  {
    id: "pat-02",
    mrn: "MRN-2026-8514",
    admissionDate: "2026-09-28",
    status: "Inpatient - Active",
    roomNo: "212",
    ward: "Pediatric Rehabilitation & Speech Unit",
    name: "Aanya Deshmukh",
    age: 6,
    gender: "Female",
    contactNumber: "+91 99201 44510",
    email: "deshmukh.family@gmail.com",
    address: "H-12, Green Acres Villa, Jubilee Hills, Hyderabad",
    emergencyContactName: "Rohan Deshmukh",
    emergencyContactRelation: "Father",
    emergencyContactPhone: "+91 99201 44511",

    primaryDiagnosis: "Developmental Verbal Dyspraxia (CAS) & Gross Motor Coordination Delay",
    secondaryDiagnosis: "Sensory Processing Sensitivity, Hypotonia, Mild In-toeing Gait",
    referringPhysician: "Dr. Shalini Gupta, MD (Pediatrics & Child Neurology)",
    severityLevel: "Moderate",

    medicalHistory:
      "Delayed speech and motor milestones (walked at 20 months, first words at 28 months). Normal hearing confirmed on BERA/OAE. Mild core hypotonia and postural instability.",
    currentMedications: ["Pediatric Multivitamin Drops 1ml OD", "Omega-3 DHA Syrup 5ml OD"],
    allergies: ["Peanuts (Severe - carries EpiPen)", "Dust mites"],
    vitalSigns: {
      bloodPressure: "98/64 mmHg",
      heartRate: "88 bpm",
      spo2: "99% on Room Air",
      respiratoryRate: "20 breaths/min",
      temperature: "98.6° F",
    },
    clinicalPrecautions: "Severe peanut allergy. Provide sensory gym break intervals every 15 minutes.",

    physicalRehabilitation: {
      mobilityStatus: "Fully ambulatory; frequent tripping due to low trunk tone and inward foot progression.",
      gaitAndBalance: "Single-leg stance 3 seconds (chronological norm > 10s); jumping with two-foot landing incoordination.",
      rangeOfMotionAndTone: "Generalized joint hypermobility (Beighton Score 6/9); benign hypotonia.",
      bergBalanceScore: "Pediatric Balance Scale (PBS): 42 / 56.",
      functionalIndependenceMeasure: "WeeFIM Mobility Score: 31 / 35.",
      physioInterventions: [
        "Gym ball core stabilization and pelvic tilt games",
        "Obstacle course navigation for motor planning and proprioception",
        "Balance beam walking and tandem stance challenges",
        "Dynamic animal walks (Bear crawl, frog jumps) for bilateral coordination",
      ],
      equipmentUtilized: "Sensory Bolster Swing, Peanut Physio Ball, Textured Balance Stepping Stones, Trampoline.",
      attendingPhysiotherapist: "Dr. Priya Nandini, MPT (Pediatric Physiotherapy)",
      ptSessionsPrescribed: 24,
      ptSessionsAttended: 14,
    },

    speechAssessment: {
      assessmentDate: "2026-09-29",
      assessmentTool: "Diagnostic Evaluation of Articulation & Phonology (DEAP) & VMPAC",
      speechIntelligibility: "45% intelligible to unfamiliar listeners; 70% to immediate parents.",
      articulationScore: "Vowel distortions, consonant cluster reduction (e.g., 'poon' for 'spoon').",
      voiceAndResonance: "Normal vocal intensity and pitch; mild nasal air emission on plosives.",
      oralMotorFunction: "Difficulty sequencing non-speech oral movements (pucker-smile alternating sequence).",
    },
    preTherapyDetails: {
      baselineCommunicationScore: "Expressive Language Standard Score: 68 (-2.1 SD)",
      baselineSwallowingSafety: "Normal chewing and swallowing for age-appropriate regular textures.",
      penetrationAspirationScale: "PAS Level 1 (Normal swallow safety)",
      initialImpairments:
        "Frequent falls when running on uneven ground, motor planning breakdown on multisyllabic speech targets, difficulty climbing playground ladder.",
    },
    therapyProgramDetails: {
      programGoal:
        "Improve speech motor planning, normalize core postural stability, and achieve age-appropriate single-leg balance and jumping.",
      frequency: "4 sessions/week (Combined Pediatric Physical Rehab & Speech Motor Therapy)",
      programDuration: "8 Weeks Structured Pediatric Intervention",
      focusAreas: [
        "Dynamic Temporal and Tactile Cueing (DTTC)",
        "Pediatric Physical Rehabilitation: Core Stability & Gross Motor Planning",
        "Sensory-Motor Integration in Suspended Equipment Gym",
        "Visual feedback with mirror and speech pacing cards",
      ],
    },
    speechTherapy: {
      focusModules: ["DTTC Motor Speech Method", "Phonological Contrast Drills", "Core Vocabulary Training"],
      articulationDrills: "Hierarchical cueing (direct imitation -> delayed imitation -> spontaneous output).",
      languageComprehension: "Excellent receptive language skills; following complex 3-step school commands.",
      voiceTherapy: "Breath support training through pinwheel blowing and sustained kazoo games.",
    },
    dysphagiaTherapy: {
      dietConsistency: "Regular solid diet (IDDSI Level 7) with peanut-free protocol",
      swallowManeuvers: ["Chewing mastication symmetry drills with bite blocks"],
      thermalTactileStimulation: "Vibrating Z-Vibe sensory stimulation to tongue lateral borders.",
      positioningAndPacing: "Ergonomic 90-degree seating in pediatric therapy chair with foot support.",
    },
    vitalStimTherapy: {
      channel1Current: "N/A (Pediatric Dyspraxia - VitalStim not indicated)",
      channel2Current: "N/A",
      pulseDuration: "N/A",
      electrodePlacement: "Non-NMES candidate; sensory tactile stimulation utilized instead.",
      sessionDuration: "N/A",
      toleranceAndPrecautions: "Patient is pediatric developmental speech & motor client.",
    },

    therapistDetails: {
      leadTherapist: "Siddharth N. Iyer, M.ASLP (Speech) & Dr. Priya Nandini, MPT (Pediatric PT)",
      licenseNo: "RCI-SLP/2022/9412 & IAP/PED-5591",
      department: "Pediatric Speech & Physical Rehabilitation Unit",
      contact: "+91 94480 55910",
    },
    sessionsPrescribed: 24,
    sessionsAttended: 14,
    sessionHistory: [
      {
        id: "s-201",
        date: "2026-10-11",
        sessionNumber: 14,
        therapist: "Siddharth Iyer & Dr. Priya Nandini",
        modality: "Combined DTTC Speech + Pediatric Sensory Gym Physio",
        durationMinutes: 50,
        exercises: "Targeting 2-syllable words while balancing on peanut ball; 10 trampoline jump-and-speak reps.",
        patientResponse: "Enthusiastic engagement; produced target syllables with 80% accuracy without losing balance.",
      },
      {
        id: "s-202",
        date: "2026-10-09",
        sessionNumber: 13,
        therapist: "Dr. Priya Nandini (PT)",
        modality: "Pediatric Physical Rehab: Stepping Stones & Beam Balance",
        durationMinutes: 45,
        exercises: "Tandem walking on low foam beam; dynamic single-leg ball kicks (10 reps each leg).",
        patientResponse: "Single leg stance time improved to 7 seconds on right, 6 seconds on left.",
      },
    ],

    progressReport: {
      recoveryRatePercentage: 70,
      speechClarityGain: "Speech intelligibility increased from 45% baseline to 72% in structured phrases.",
      swallowingSafetyGain: "N/A (Swallow intact at baseline)",
      physicalMobilityGain: "Pediatric Balance Scale increased from 42 to 50/56; zero tripping episodes during past week of therapy.",
      vitalStimMuscleToneGain: "Oral motor and core postural sequencing precision improved markedly.",
      therapistClinicalImpression:
        "Superb response to dual speech and pediatric physical rehabilitation. Gross motor running stability is noticeably improved.",
      nextMilestoneTarget: "Spontaneous 4-to-5 word sentences and independent hopscotch jumping.",
    },

    dischargeSummary: {
      status: "In Progress",
      proposedDischargeDate: "2026-11-15",
      criteriaAchieved: [
        "Resolved all vowel distortions in conversational speech",
        "Single-leg stance > 8 seconds achieved bilaterally",
        "Parent training on home cueing and physical play completed",
      ],
      functionalStatusAtDischarge: "Ongoing active therapy - progressing steadily toward school physical readiness.",
      summaryOfInterventions: "14 high-intensity dual DTTC and pediatric physical rehabilitation sessions completed.",
      physicianSignoff: "Mid-program review approved by Dr. Shalini Gupta (Pediatrician).",
    },

    homeManagement: {
      homeExerciseProgram: [
        "Daily 10-minute 'Special Word Game' using photo cards provided in therapy kit",
        "Mirror mimicry games: blowing bubbles, lip rounding ('oo-ee' sequence)",
      ],
      safeSwallowingGuidelines: [
        "Normal diet, strictly ensure peanut-free environment at home and school",
        "Encourage drinking with open cup and straw instead of sippy cups",
      ],
      physicalMobilityHomePlan: [
        "Daily 15-minute playground play: monkey bars, ladder climbing with spotter",
        "Single-leg flamingo stance contest during toothbrushing (target 10 seconds)",
        "Animal walks (Frog jumps and bear walks across living room carpet 3 times)",
      ],
      caregiverSafetyInstructions:
        "Provide affirmative reinforcement without pressuring immediate correct repetition. Use visual hand gestures to cue sound placement.",
      followUpSchedule: "Next bi-weekly progress evaluation on 2026-10-25.",
      emergencyContactProtocol: "Pediatric clinic front desk +91 80082 27539.",
    },
  },
  {
    id: "pat-03",
    mrn: "MRN-2026-8320",
    admissionDate: "2026-09-12",
    status: "Inpatient - Active",
    roomNo: "408",
    ward: "Geriatric Rehabilitation Wing",
    name: "Rajeshwar Nair",
    age: 71,
    gender: "Male",
    contactNumber: "+91 97410 88319",
    email: "rnair.family@rediffmail.com",
    address: "Plot 89, Kakatiya Hills, Madhapur, Hyderabad",
    emergencyContactName: "Arun Nair",
    emergencyContactRelation: "Son",
    emergencyContactPhone: "+91 97410 22001",

    primaryDiagnosis: "Parkinson's Disease (Hoehn & Yahr Stage III) with Postural Instability & Hypokinetic Dysarthria",
    secondaryDiagnosis: "Freezing of Gait (FOG), Oropharyngeal Dysphagia, Cervical Spondylosis",
    referringPhysician: "Dr. Venkat Ramanan, MD, DM (Movement Disorder Specialist)",
    severityLevel: "Moderate-Severe",

    medicalHistory:
      "Diagnosed with Idiopathic Parkinson's Disease 7 years ago. Progressive hypophonia (soft voice), frequent freezing of gait through doorways, and throat clearing during meals.",
    currentMedications: [
      "Levodopa/Carbidopa 100/25mg (1 tab 4x daily: 7am, 11am, 3pm, 7pm)",
      "Pramipexole 0.5mg TDS",
      "Amantadine 100mg BD",
    ],
    allergies: ["Sulfa drugs (Skin eruption)"],
    vitalSigns: {
      bloodPressure: "116/74 mmHg",
      heartRate: "68 bpm",
      spo2: "97% on Room Air",
      respiratoryRate: "15 breaths/min",
      temperature: "98.2° F",
    },
    clinicalPrecautions:
      "Time all physical rehabilitation and speech sessions during medication 'ON' states (approx. 45 mins post-Levodopa). High fall precautions.",

    physicalRehabilitation: {
      mobilityStatus: "Ambulatory with 4-wheel rollator walker; episodic freezing of gait at narrow thresholds.",
      gaitAndBalance: "Stooped trunk posture; stride length shortened (32cm); step cadence variable with festination.",
      rangeOfMotionAndTone: "Lead-pipe rigidity of axial trunk and bilateral hamstrings; reduced arm swing.",
      bergBalanceScore: "BBS Score: 39 / 56 (Moderate fall risk).",
      functionalIndependenceMeasure: "FIM Motor Score: 64 / 91 (Requires assistance with dressing and bath transfers).",
      physioInterventions: [
        "LSVT BIG® Whole-Body Amplitude Training (Big steps, big reaches, maximal effort)",
        "Laser-line visual projection cueing to eliminate Freezing of Gait (FOG)",
        "Rhythmic auditory cueing (Metronome cadence training at 100 bpm)",
        "Axial trunk rotational mobility exercises on Swiss ball",
        "Postural realignment in front of full-length grid mirror",
      ],
      equipmentUtilized: "Rollator Walker with Laser Cue, Metronome Audio System, Parallel Bars, Tilt Table.",
      attendingPhysiotherapist: "Dr. Sandeep K. Varma, MPT (Neuro-Physiotherapy)",
      ptSessionsPrescribed: 20,
      ptSessionsAttended: 16,
    },

    speechAssessment: {
      assessmentDate: "2026-09-14",
      assessmentTool: "UPDRS Speech Item & LSVT Baseline Acoustic Suite",
      speechIntelligibility: "50% due to monotonic prosody, rapid speech rushes, and low vocal loudness (58 dB).",
      articulationScore: "Imprecise consonant articulation with spirantization of stops (/p, b, t, d/).",
      voiceAndResonance: "Hypophonia, vocal tremor, reduced maximum phonation time (MPT = 7.2 seconds).",
      oralMotorFunction: "Masked facies, reduced lingual range of motion, delayed pharyngeal trigger.",
    },
    preTherapyDetails: {
      baselineCommunicationScore: "Average conversational loudness: 58 dB SPL at 1 meter distance.",
      baselineSwallowingSafety: "FOIS Level 3: Tube dependent with consistent oral trials of nectar fluids.",
      penetrationAspirationScale: "PAS Level 4 (Penetration to vocal folds)",
      initialImpairments:
        "Severe hesitation and freezing when initiating steps, stooped posture with festinating gait, voice inaudible in family room.",
    },
    therapyProgramDetails: {
      programGoal:
        "Increase vocal volume to >72 dB SPL, overcome freezing of gait using sensory cues, and restore upright posture and safe swallowing.",
      frequency: "5 sessions/week (Combined LSVT LOUD + LSVT BIG Physical Rehabilitation)",
      programDuration: "4 Weeks Intensive Parkinson's Specific Protocol",
      focusAreas: [
        "LSVT LOUD® High-Effort Phonation Training",
        "LSVT BIG® Amplitude-Based Physical Rehabilitation",
        "Visual & Auditory Cued Gait Training to Overcome Freezing",
        "VitalStim NMES for Thyrohyoid Elevation",
      ],
    },
    speechTherapy: {
      focusModules: ["LSVT LOUD Calibrated Drills", "Pitch Glides (High & Low)", "Functional Phrases of Daily Living"],
      articulationDrills: "Over-articulation and deliberate rate reduction pacing.",
      languageComprehension: "Intact cognition; slight bradyphrenia compensated with adequate response time.",
      voiceTherapy: "Targeting 75 dB SPL calibrated vocal intensity across 10 functional daily phrases.",
    },
    dysphagiaTherapy: {
      dietConsistency: "IDDSI Level 5: Minced & Moist / IDDSI Level 2: Mildly Thickened Beverages",
      swallowManeuvers: ["Hard Swallow with conscious throat clearing", "Head rotation during pill ingestion"],
      thermalTactileStimulation: "Ice chip thermal pre-stimulation before main courses.",
      positioningAndPacing: "Full upright chair seating, no straw usage (spoon or cup sips only).",
    },
    vitalStimTherapy: {
      channel1Current: "7.0 mA (Motor contraction of mylohyoid and anterior digastric)",
      channel2Current: "7.5 mA (Thyrohyoid elevation activated)",
      pulseDuration: "300 µs biphasic pulsed wave, 80 Hz",
      electrodePlacement: "Vertical dual-channel midline anterior cervical montage.",
      sessionDuration: "45 minutes synchronous with effortful swallow repetitions.",
      toleranceAndPrecautions: "Well tolerated; monitored for DBS contraindication (None present).",
    },

    therapistDetails: {
      leadTherapist: "Dr. Ananya V. Sharma, M.Sc. SLP & Dr. Sandeep Varma, MPT",
      licenseNo: "RCI-SLP/2021/8849 & IAP/MPT-7741",
      department: "Speech-Language Pathology & Neuro-Rehabilitation",
      contact: "+91 94480 34102",
    },
    sessionsPrescribed: 20,
    sessionsAttended: 16,
    sessionHistory: [
      {
        id: "s-301",
        date: "2026-10-12",
        sessionNumber: 16,
        therapist: "Dr. Sandeep Varma & Dr. Ananya Sharma",
        modality: "LSVT LOUD Vocal Exercises + LSVT BIG Physical Rehabilitation",
        durationMinutes: 60,
        exercises: "High-amplitude sustained stepping across 100m hall with laser line cueing; 15 loud vocal phrases at 76 dB.",
        patientResponse: "Completely eliminated doorway freezing with laser cues. Voice clear, rich, and audible across room.",
      },
    ],

    progressReport: {
      recoveryRatePercentage: 82,
      speechClarityGain: "Vocal loudness elevated from 58 dB to 74 dB SPL; conversational intelligibility up to 88%.",
      swallowingSafetyGain: "FOIS improved from Level 3 to Level 6 (Total oral diet with multiple consistencies).",
      physicalMobilityGain: "Stride length increased from 32cm to 54cm; Freezing of Gait episodes reduced by 85% with visual laser cues.",
      vitalStimMuscleToneGain: "Thyrohyoid approximation improved by 50%; pharyngeal residue reduced by 70%.",
      therapistClinicalImpression:
        "Outstanding multidisciplinary response to simultaneous LSVT BIG physical therapy and LSVT LOUD speech protocols.",
      nextMilestoneTarget: "Independent community walks with rollator walker and maintenance of vocal volume.",
    },

    dischargeSummary: {
      status: "Approved for Discharge",
      proposedDischargeDate: "2026-10-16",
      criteriaAchieved: [
        "Consistent vocal loudness > 72 dB SPL achieved on conversational speech",
        "Safe swallow of soft-minced diet and liquids without coughing",
        "Freezing of Gait controlled using visual floor markers and laser rollator",
        "Family trained in amplitude-based movement cues and mealtime guidelines",
      ],
      functionalStatusAtDischarge:
        "High communicative confidence, safe oral nutrition, mobile with rollator walker, ready for home care.",
      summaryOfInterventions: "16 combined sessions of LSVT LOUD, LSVT BIG physical rehabilitation, and VitalStim completed.",
      physicianSignoff: "Signed off by Dr. Venkat Ramanan (Neurologist), Dr. Sandeep Varma (PT) & Dr. Ananya Sharma (SLP).",
    },

    homeManagement: {
      homeExerciseProgram: [
        "LSVT Daily Vocal Routine: 10 'AH' vowels held loud and long, 10 high pitch glides, 10 low pitch glides",
        "Recite 10 Functional Daily Phrases 3 times daily with maximum vocal effort",
        "Effortful swallow practice: 10 swallows with empty mouth prior to breakfast and dinner",
      ],
      safeSwallowingGuidelines: [
        "Take all medications with a spoonful of fruit puree or thickened water",
        "Sit completely upright in a high-backed dining chair",
        "Avoid eating when experiencing an 'OFF' motor freeze state",
      ],
      physicalMobilityHomePlan: [
        "LSVT BIG Daily Exercises: 10 Floor-to-Ceiling reaches, 10 Side-to-Side big steps, 10 Big Forward lunges",
        "Place high-contrast colored floor tape at kitchen and bathroom doorways to prevent freezing",
        "Walk 20 minutes daily with rollator walker keeping eyes looking ahead at eye level",
      ],
      caregiverSafetyInstructions:
        "Prompt the patient with the verbal cues 'Think LOUD' and 'Think BIG'. Never pull patient during a freezing episode; activate laser cue.",
      followUpSchedule: "Maintenance clinic check-in every 4 weeks. First follow-up review on 2026-11-14.",
      emergencyContactProtocol: "Clinic emergency desk +91 80082 27539 / Neurologist on call.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: ADMIN DASHBOARD (WEBSITE COLOR PALETTE + GUILD SERVICES BRANDING)
// ─────────────────────────────────────────────────────────────────────────────

function AdminDashboard() {
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("guild_admin_patients_v3");
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_PATIENTS;
  });

  const [selectedId, setSelectedId] = useState<string>(() => INITIAL_PATIENTS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"tabs" | "dossier">("tabs");

  const [activeTab, setActiveTab] = useState<
    "overview" | "physical_rehab" | "speech_assessment" | "therapy_modules" | "sessions" | "progress" | "discharge_home"
  >("overview");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSuccessMessage, setAddSuccessMessage] = useState<string | null>(null);
  const [isLogSessionModalOpen, setIsLogSessionModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("guild_admin_patients_v3", JSON.stringify(patients));
      } catch (err) {
        console.error("Failed to save patient records", err);
      }
    }
  }, [patients]);

  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedId) || patients[0];
  }, [patients, selectedId]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.therapistDetails.leadTherapist.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filterStatus === "All") return true;
      if (filterStatus === "Inpatient") return patient.status.includes("Inpatient");
      if (filterStatus === "PhysicalRehab")
        return patient.physicalRehabilitation && patient.physicalRehabilitation.ptSessionsAttended > 0;
      if (filterStatus === "VitalStim")
        return patient.vitalStimTherapy.channel1Current !== "N/A" && patient.vitalStimTherapy.channel1Current !== "";
      if (filterStatus === "Discharge")
        return patient.status === "Ready for Discharge" || patient.dischargeSummary.status === "Approved for Discharge";

      return true;
    });
  }, [patients, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    const total = patients.length;
    const inpatients = patients.filter((p) => p.status.includes("Inpatient")).length;
    const physicalRehabActive = patients.filter(
      (p) => p.physicalRehabilitation && p.physicalRehabilitation.ptSessionsAttended > 0
    ).length;
    const vitalStimActive = patients.filter(
      (p) => p.vitalStimTherapy.channel1Current !== "N/A" && p.vitalStimTherapy.channel1Current !== ""
    ).length;
    const totalSessionsDone = patients.reduce(
      (acc, p) => acc + p.sessionsAttended + (p.physicalRehabilitation?.ptSessionsAttended || 0),
      0
    );
    const avgRecovery = Math.round(
      patients.reduce((acc, p) => acc + p.progressReport.recoveryRatePercentage, 0) / (total || 1)
    );

    return { total, inpatients, physicalRehabActive, vitalStimActive, totalSessionsDone, avgRecovery };
  }, [patients]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Add Patient Form State
  const [formData, setFormData] = useState<Partial<PatientRecord>>({
    name: "",
    age: 52,
    gender: "Male",
    mrn: `MRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    admissionDate: new Date().toISOString().split("T")[0],
    roomNo: "305",
    ward: "Neuro-Physical Rehabilitation Wing",
    status: "Inpatient - Active",
    contactNumber: "+91 ",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "",
    primaryDiagnosis: "Post-Stroke Hemiparesis, Gait Impairment & Speech Dysarthria",
    secondaryDiagnosis: "Hypertension, Mild Dysphagia",
    referringPhysician: "Dr. K. S. Sundaram, MD, DM (Neuro)",
    severityLevel: "Moderate",
    medicalHistory: "Recent ischemic cerebrovascular event with right-sided motor and speech involvement.",
    currentMedications: ["Aspirin 75mg OD", "Atorvastatin 20mg HS"],
    allergies: ["None"],
    vitalSigns: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      spo2: "98%",
      respiratoryRate: "16 /min",
      temperature: "98.6° F",
    },
    clinicalPrecautions: "Fall precautions during transfers and gait training.",
    physicalRehabilitation: {
      mobilityStatus: "Ambulatory with quad cane; requires contact guard assist.",
      gaitAndBalance: "Hemiparetic gait pattern with reduced right step length.",
      rangeOfMotionAndTone: "Ashworth Grade 1+ right arm; right ankle dorsiflexion weakness.",
      bergBalanceScore: "BBS Score: 36 / 56 (Moderate fall risk)",
      functionalIndependenceMeasure: "FIM Motor: 60 / 91",
      physioInterventions: [
        "Body-Weight Supported Treadmill Gait Training",
        "Neuro-Developmental Therapy (NDT) for trunk symmetry",
        "Balance board and dynamic weight shifting",
      ],
      equipmentUtilized: "Parallel Bars, Treadmill, Gait Belt, Physio Mat.",
      attendingPhysiotherapist: "Dr. Sandeep K. Varma, MPT (Neuro)",
      ptSessionsPrescribed: 20,
      ptSessionsAttended: 1,
    },
    speechAssessment: {
      assessmentDate: new Date().toISOString().split("T")[0],
      assessmentTool: "Frenchay Dysarthria / WAB-R Evaluation",
      speechIntelligibility: "65% intelligible in conversational context",
      articulationScore: "Mild-to-moderate articulatory imprecision",
      voiceAndResonance: "Mild hypophonia with reduced breath support",
      oralMotorFunction: "Reduced lingual range of motion",
    },
    preTherapyDetails: {
      baselineCommunicationScore: "WAB Aphasia Quotient: 62.0",
      baselineSwallowingSafety: "FOIS Level 4: Total oral diet with special preparation",
      penetrationAspirationScale: "PAS Level 3",
      initialImpairments: "Gait instability and mild slurred speech on prolonged talking.",
    },
    therapyProgramDetails: {
      programGoal: "Independent ambulation and clear conversational speech",
      frequency: "5 sessions/week (Speech & Physical Rehab)",
      programDuration: "6 Weeks Comprehensive Rehab",
      focusAreas: ["Neuro-Physical Rehabilitation", "Speech Articulation", "VitalStim NMES"],
    },
    speechTherapy: {
      focusModules: ["Articulation Drills", "Breath Support", "Naming Drills"],
      articulationDrills: "Target phonemes and pacing drills",
      languageComprehension: "High-accuracy sentence comprehension",
      voiceTherapy: "LSVT principles for vocal loudness",
    },
    dysphagiaTherapy: {
      dietConsistency: "IDDSI Level 5 Minced & Moist / Level 2 Thickened",
      swallowManeuvers: ["Mendelsohn Maneuver", "Effortful Swallow", "Chin Tuck"],
      thermalTactileStimulation: "Chilled laryngeal stimulation",
      positioningAndPacing: "Upright 90 degrees during meals",
    },
    vitalStimTherapy: {
      channel1Current: "8.0 mA",
      channel2Current: "8.5 mA",
      pulseDuration: "300 µs at 80 Hz",
      electrodePlacement: "Submental and thyrohyoid dual anterior cervical placement",
      sessionDuration: "60 minutes concurrent with active swallow trials",
      toleranceAndPrecautions: "Good tolerance without complaints",
    },
    therapistDetails: {
      leadTherapist: "Dr. Ananya Sharma (SLP) & Dr. Sandeep Varma (PT)",
      licenseNo: "RCI-SLP/2021/8849 & IAP/MPT-7741",
      department: "Speech Pathology & Physical Rehabilitation",
      contact: "+91 94480 34102",
    },
    sessionsPrescribed: 20,
    sessionsAttended: 1,
    progressReport: {
      recoveryRatePercentage: 20,
      speechClarityGain: "Baseline assessment completed; articulation exercises initialized.",
      swallowingSafetyGain: "Safe soft diet intake confirmed.",
      physicalMobilityGain: "Ambulation with quad cane begun with therapist assist.",
      vitalStimMuscleToneGain: "Good initial motor response to submental NMES.",
      therapistClinicalImpression: "Patient is highly motivated with high rehabilitation potential.",
      nextMilestoneTarget: "Advance to independent unassisted transfers and 30m cane walking.",
    },
    dischargeSummary: {
      status: "In Progress",
      proposedDischargeDate: "2026-11-20",
      criteriaAchieved: ["Comprehensive evaluation completed and dual therapy program initiated"],
      functionalStatusAtDischarge: "Active Inpatient Multi-Disciplinary Therapy",
      summaryOfInterventions: "Physical Rehabilitation & Speech Therapy program initialized.",
      physicianSignoff: "Dr. K. S. Sundaram, MD, DM & Rehabilitation Team",
    },
    homeManagement: {
      homeExerciseProgram: [
        "Effortful swallows: 10 repetitions, 3 times daily",
        "Mendelsohn Maneuver: 5 repetitions twice daily",
      ],
      safeSwallowingGuidelines: [
        "Sit upright at 90 degrees for all feeds",
        "Small teaspoon portions only",
      ],
      physicalMobilityHomePlan: [
        "Sit-to-stand repetitions: 10 reps twice daily with family supervision",
        "Ankle pumps and knee extension exercises (15 reps each side)",
      ],
      caregiverSafetyInstructions: "Stand on the weaker side during transfers. Ensure clutter-free pathway.",
      followUpSchedule: "Daily inpatient rounds; outpatient review in 4 weeks.",
      emergencyContactProtocol: "Clinic Emergency SLP Helpline +91 80082 27539",
    },
  });

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `pat-${Date.now()}`;
    const newPatient: PatientRecord = {
      ...(formData as PatientRecord),
      id: newId,
      mrn: formData.mrn || `MRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name?.trim() || "New Clinical Patient",
      age: Number(formData.age) || 50,
      gender: formData.gender || "Male",
      roomNo: formData.roomNo || "305",
      ward: formData.ward || "Neuro Rehab",
      status: formData.status || "Inpatient - Active",
      sessionHistory: [
        {
          id: `s-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          sessionNumber: 1,
          therapist: formData.therapistDetails?.leadTherapist || "Rehabilitation Team",
          modality: "Baseline Physical Rehab & Speech Intake",
          durationMinutes: 60,
          exercises: "Gait & balance baseline screening, speech and swallowing diagnostic intake.",
          patientResponse: "Cooperative, completed initial intake with good tolerance.",
        },
      ],
    };

    setPatients([newPatient, ...patients]);
    setSelectedId(newId);
    setIsAddModalOpen(false);
    setAddSuccessMessage(`Patient record for "${newPatient.name}" created successfully!`);
    setTimeout(() => setAddSuccessMessage(null), 4500);
  };

  const [newSessionData, setNewSessionData] = useState({
    therapist: "Dr. Sandeep Varma (PT)",
    modality: "Physical Rehab: Gait Training & Core Stability",
    durationMinutes: 45,
    exercises: "Treadmill walking with harness support (200m), balance board weight shifts, quad cane practice.",
    patientResponse: "Good cadence, step symmetry improved, no loss of balance.",
  });

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const newSession: SessionRecord = {
      id: `s-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      sessionNumber: selectedPatient.sessionsAttended + 1,
      therapist: newSessionData.therapist,
      modality: newSessionData.modality,
      durationMinutes: Number(newSessionData.durationMinutes) || 45,
      exercises: newSessionData.exercises,
      patientResponse: newSessionData.patientResponse,
    };

    const isPt = newSessionData.modality.toLowerCase().includes("physical") ||
      newSessionData.modality.toLowerCase().includes("gait") ||
      newSessionData.modality.toLowerCase().includes("physio");

    const updatedPatients = patients.map((p) => {
      if (p.id === selectedPatient.id) {
        const newAttended = p.sessionsAttended + 1;
        const newPtAttended = isPt
          ? (p.physicalRehabilitation?.ptSessionsAttended || 0) + 1
          : p.physicalRehabilitation?.ptSessionsAttended || 0;
        const newRecovery = Math.min(98, p.progressReport.recoveryRatePercentage + 3);

        return {
          ...p,
          sessionsAttended: newAttended,
          physicalRehabilitation: {
            ...p.physicalRehabilitation,
            ptSessionsAttended: newPtAttended,
          },
          sessionHistory: [newSession, ...p.sessionHistory],
          progressReport: {
            ...p.progressReport,
            recoveryRatePercentage: newRecovery,
          },
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    setIsLogSessionModalOpen(false);
    setAddSuccessMessage(`Session #${newSession.sessionNumber} (${newSessionData.modality}) logged for ${selectedPatient.name}!`);
    setTimeout(() => setAddSuccessMessage(null), 4000);
  };

  return (
    <div
      data-admin-root="true"
      className="min-h-screen bg-[#fafaf7] text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-20 print:bg-white print:text-black print:p-0 print:pb-0"
    >
      {/* ─────────────────────────────────────────────────────────────────────────────
          GLOBAL CURSOR OVERRIDE STYLES (Clean visible cursor everywhere)
      ───────────────────────────────────────────────────────────────────────────── */}
      <style>{`
        html, body, [data-admin-root="true"], [data-admin-root="true"] * {
          cursor: default !important;
        }
        button, a, select, [role="button"], input[type="checkbox"], input[type="radio"], [data-clickable="true"] {
          cursor: pointer !important;
        }
        input[type="text"], input[type="number"], input[type="email"], textarea {
          cursor: text !important;
        }
        /* Clean scrollbars */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1ee;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TOP BRANDED HEADER (WITH ORIGINAL GUILD SERVICES LOGO)
      ───────────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs print:hidden">
        <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Branding with Original Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group text-slate-800 hover:opacity-95 transition-all min-w-0"
              title="Return to Guild Services Home"
            >
              <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-red-500 bg-white p-0.5 shadow-md h-9 w-9 sm:h-11 sm:w-11 group-hover:scale-105 transition-transform">
                <img
                  src={logo}
                  alt="Guild Services Logo"
                  className="h-full w-full object-cover scale-110 rounded-full"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-tight text-blue-950 truncate">
                    <span className="italic">Guild</span> Services<span className="text-red-600">.</span>
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] bg-red-50 text-red-700 font-extrabold px-1.5 sm:px-2.5 py-0.5 rounded-full border border-red-200 shadow-2xs shrink-0">
                    Clinical EHR
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="font-mono uppercase tracking-[0.2em] text-red-600 font-bold text-[8px] sm:text-[9px] shrink-0">
                    Guild Club
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline truncate">
                    Speech & Physical Rehabilitation Portal
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* View Mode Toggle: Interactive Tabs vs Full Formal Dossier */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner shrink-0">
            <button
              onClick={() => setViewMode("tabs")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "tabs"
                  ? "bg-white text-blue-950 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dashboard Tabs
            </button>
            <button
              onClick={() => setViewMode("dossier")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "dossier"
                  ? "bg-blue-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Medical Dossier</span>
            </button>
          </div>

          {/* Actions on Right */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
              title="Print Official Medical Dossier"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] shrink-0"
            >
              <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span><span className="hidden sm:inline">Add </span>Patient</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-blue-950 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shrink-0"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Main Website</span>
            </Link>
          </div>
        </div>

        {/* Mobile View Mode Switcher Strip */}
        <div className="md:hidden px-3 py-2 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg border border-slate-200 w-full">
            <button
              onClick={() => setViewMode("tabs")}
              className={`flex-1 py-1 rounded-md text-[11px] font-bold text-center transition-all ${
                viewMode === "tabs"
                  ? "bg-white text-blue-950 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dashboard Tabs
            </button>
            <button
              onClick={() => setViewMode("dossier")}
              className={`flex-1 py-1 rounded-md text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1 ${
                viewMode === "dossier"
                  ? "bg-blue-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Full Dossier</span>
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 shrink-0"
            title="Print"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Success Notification Banner */}
      {addSuccessMessage && (
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 print:hidden">
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-sm font-medium flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{addSuccessMessage}</span>
            </div>
            <button
              onClick={() => setAddSuccessMessage(null)}
              className="text-emerald-700 hover:text-emerald-950 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          WEBSITE BRANDED KPI METRICS STRIP (White + Royal Blue + Crimson + Amber)
      ───────────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">Active Patients</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-blue-950 font-mono">{stats.total}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Enrolled Clinical EHR</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">Inpatient Beds</span>
              <Bed className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-900 font-mono">{stats.inpatients}</div>
            <div className="text-[11px] text-indigo-600 font-medium mt-0.5">Neuro & Rehab Wards</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">Physical Rehab</span>
              <Accessibility className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-sky-800 font-mono">{stats.physicalRehabActive}</div>
            <div className="text-[11px] text-sky-600 font-medium mt-0.5">Gait & Mobility Protocols</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">VitalStim® NMES</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-800 font-mono">{stats.vitalStimActive}</div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">Dysphagia Protocol Active</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">Total Sessions</span>
              <Activity className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-teal-900 font-mono">{stats.totalSessionsDone}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Therapy hours completed</div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-4 rounded-2xl shadow-sm border border-blue-900">
            <div className="flex items-center justify-between text-blue-200 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Recovery</span>
              <Award className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{stats.avgRecovery}%</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Objective recovery gain</div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MAIN DASHBOARD CONTENT
      ───────────────────────────────────────────────────────────────────────────── */}
      <main className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ─────────────────────────────────────────────────────────────────────────
              LEFT COLUMN: PATIENT ROSTER DIRECTORY (4 cols)
          ───────────────────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-4 min-w-0 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 print:hidden">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-700" />
                <h2 className="font-bold text-blue-950 text-base">Patient Directory</h2>
              </div>
              <span className="text-xs font-mono font-bold bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                {filteredPatients.length} Active Patients
              </span>
            </div>

            {/* Search Input */}
            <div className="mt-3.5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, room #, diagnosis, therapist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Pills */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {[
                { id: "All", label: "All" },
                { id: "Inpatient", label: "Inpatient" },
                { id: "PhysicalRehab", label: "Physical Rehab" },
                { id: "VitalStim", label: "VitalStim®" },
                { id: "Discharge", label: "Discharge Ready" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all text-xs ${
                    filterStatus === tab.id
                      ? "bg-blue-950 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Patient Cards List (Clean, No ugly scrollbar) */}
            <div className="mt-3.5 space-y-2.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 custom-scroll">
              {filteredPatients.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No patient matches the search filter.
                </div>
              ) : (
                filteredPatients.map((patient) => {
                  const isSelected = patient.id === selectedPatient?.id;
                  const hasPhysicalRehab =
                    patient.physicalRehabilitation &&
                    patient.physicalRehabilitation.ptSessionsAttended > 0;
                  const hasVitalStim =
                    patient.vitalStimTherapy.channel1Current !== "N/A" &&
                    patient.vitalStimTherapy.channel1Current !== "";

                  return (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedId(patient.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-600 shadow-sm ring-1 ring-blue-600/30"
                          : "bg-white hover:bg-slate-50 border-slate-200/90"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-blue-950">{patient.name}</span>
                            <span className="text-[11px] font-mono text-slate-500 font-semibold">
                              {patient.age}y/{patient.gender[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded text-[10px]">
                              Room {patient.roomNo}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-500">{patient.mrn}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              patient.status.includes("Inpatient")
                                ? "bg-indigo-50 text-indigo-800 border border-indigo-200"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {patient.status.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-slate-700 line-clamp-1 font-medium">
                        {patient.primaryDiagnosis}
                      </div>

                      {/* Service Badges */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {hasPhysicalRehab && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md border border-sky-200">
                            <Accessibility className="w-2.5 h-2.5 text-sky-600" /> Physical Rehab
                          </span>
                        )}
                        {hasVitalStim && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                            <Zap className="w-2.5 h-2.5 text-amber-500" /> VitalStim®
                          </span>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                        <span>
                          Sessions: <strong className="text-blue-950 font-bold">{patient.sessionsAttended}/{patient.sessionsPrescribed}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${Math.min(100, (patient.sessionsAttended / patient.sessionsPrescribed) * 100)}%`,
                              }}
                            />
                          </div>
                          <span className="font-mono text-[10px] text-emerald-700 font-extrabold">
                            {patient.progressReport.recoveryRatePercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* ─────────────────────────────────────────────────────────────────────────
              RIGHT COLUMN: PATIENT SUMMARY & DOSSIER (8 cols)
          ───────────────────────────────────────────────────────────────────────── */}
          <section className="lg:col-span-8 min-w-0 space-y-4 sm:space-y-6">
            {/* Top Patient Summary Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 print:border-none print:shadow-none print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-700 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-blue-950/20 shrink-0">
                    {selectedPatient.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950 tracking-tight">
                        {selectedPatient.name}
                      </h1>
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                        {selectedPatient.mrn}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          selectedPatient.status.includes("Inpatient")
                            ? "bg-indigo-50 text-indigo-900 border border-indigo-200"
                            : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                        }`}
                      >
                        {selectedPatient.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-medium">
                      <span>Age: <strong className="text-blue-950 font-bold">{selectedPatient.age} Yrs</strong></span>
                      <span>•</span>
                      <span>Gender: <strong className="text-blue-950 font-bold">{selectedPatient.gender}</strong></span>
                      <span>•</span>
                      <span>
                        Room: <strong className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Room {selectedPatient.roomNo}</strong> ({selectedPatient.ward})
                      </span>
                      <span>•</span>
                      <span>Admitted: <strong className="text-blue-950">{selectedPatient.admissionDate}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => setIsLogSessionModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Session</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    title="Print This Dossier"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Diagnosis Alert Strip */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">
                    Primary Clinical Diagnosis
                  </span>
                  <p className="font-bold text-blue-950 text-sm mt-0.5">
                    {selectedPatient.primaryDiagnosis}
                  </p>
                  <p className="text-slate-600 text-[11px] mt-0.5 font-medium">
                    Secondary: {selectedPatient.secondaryDiagnosis}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 text-center shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold block">Severity</span>
                    <span
                      className={`font-extrabold text-xs ${
                        selectedPatient.severityLevel.includes("Severe")
                          ? "text-red-600"
                          : selectedPatient.severityLevel === "Moderate"
                            ? "text-amber-600"
                            : "text-blue-700"
                      }`}
                    >
                      {selectedPatient.severityLevel}
                    </span>
                  </div>
                  <div className="bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 text-center shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold block">Recovery Rate</span>
                    <span className="font-extrabold text-xs text-emerald-700 font-mono">
                      {selectedPatient.progressReport.recoveryRatePercentage}% Gain
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB SELECTOR CHIPS (Clean, No ugly scrollbar) */}
            {viewMode === "tabs" && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-2 print:hidden">
                <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {[
                    { id: "overview", label: "1. Overview & Vitals", icon: User },
                    { id: "physical_rehab", label: "2. Physical Rehabilitation", icon: Accessibility },
                    { id: "speech_assessment", label: "3. Speech Assessment", icon: Brain },
                    { id: "therapy_modules", label: "4. Dysphagia & VitalStim®", icon: Zap },
                    { id: "sessions", label: "5. Session Logs", icon: Activity },
                    { id: "progress", label: "6. Progress Report", icon: TrendingUp },
                    { id: "discharge_home", label: "7. Discharge & Home Care", icon: Home },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all text-xs ${
                          isActive
                            ? "bg-blue-950 text-white shadow-xs"
                            : "text-slate-600 hover:text-blue-950 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 1: OVERVIEW & MEDICAL RECORDS
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "overview") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base pb-3 border-b border-slate-100">
                    <User className="w-4 h-4 text-red-600" />
                    <h2>1. Patient Details & Room Allocation</h2>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block mb-1">Phone Contact</span>
                      <div className="flex items-center gap-2 font-extrabold text-blue-950">
                        <Phone className="w-3.5 h-3.5 text-blue-700" />
                        <span>{selectedPatient.contactNumber}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block mb-1">Email Address</span>
                      <div className="flex items-center gap-2 font-bold text-blue-950">
                        <Mail className="w-3.5 h-3.5 text-blue-700" />
                        <span className="truncate">{selectedPatient.email || "Not on file"}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block mb-1">Room & Bed No</span>
                      <div className="flex items-center gap-2 font-extrabold text-blue-950">
                        <Bed className="w-3.5 h-3.5 text-blue-700" />
                        <span>Room {selectedPatient.roomNo} ({selectedPatient.ward})</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block mb-1">Residential Address</span>
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{selectedPatient.address}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                      <span className="text-amber-800 font-extrabold block mb-1">Emergency Contact</span>
                      <div className="font-bold text-amber-950">
                        {selectedPatient.emergencyContactName} ({selectedPatient.emergencyContactRelation})
                      </div>
                      <div className="font-mono text-[11px] text-amber-800 mt-0.5">
                        {selectedPatient.emergencyContactPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vitals Grid & Medical Records */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base pb-3 border-b border-slate-100">
                    <HeartPulse className="w-4 h-4 text-red-600" />
                    <h2>Patient Medical Records & Vitals</h2>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Blood Pressure</span>
                      <p className="font-extrabold text-blue-950 text-sm mt-1 font-mono">{selectedPatient.vitalSigns.bloodPressure}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Heart Rate</span>
                      <p className="font-extrabold text-blue-950 text-sm mt-1 font-mono">{selectedPatient.vitalSigns.heartRate}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Oxygen SpO2</span>
                      <p className="font-extrabold text-emerald-700 text-sm mt-1 font-mono">{selectedPatient.vitalSigns.spo2}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Resp Rate</span>
                      <p className="font-extrabold text-blue-950 text-sm mt-1 font-mono">{selectedPatient.vitalSigns.respiratoryRate}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Body Temp</span>
                      <p className="font-extrabold text-blue-950 text-sm mt-1 font-mono">{selectedPatient.vitalSigns.temperature}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 font-bold text-blue-950 mb-2">
                        <FileText className="w-3.5 h-3.5 text-blue-700" />
                        <span>Medical & Surgical History</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-normal">{selectedPatient.medicalHistory}</p>
                      <div className="mt-3 pt-3 border-t border-slate-200 text-slate-600">
                        <span className="font-semibold">Referring Physician:</span>{" "}
                        <strong className="text-blue-950">{selectedPatient.referringPhysician}</strong>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 font-bold text-blue-950 mb-2">
                        <Pill className="w-3.5 h-3.5 text-indigo-700" />
                        <span>Current Active Medications</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-700">
                        {selectedPatient.currentMedications.map((med, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span>{med}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                          <span className="font-bold text-red-900">Allergies:</span>
                          <span className="text-red-700 font-semibold">
                            {selectedPatient.allergies.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Clinical Precautions: </span>
                      <span>{selectedPatient.clinicalPrecautions}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 2: PHYSICAL REHABILITATION SERVICE
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "physical_rehab") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-sky-200 shadow-xs p-6 ring-1 ring-sky-300/30">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-sky-100 border border-sky-300 text-sky-800 flex items-center justify-center font-bold">
                        <Accessibility className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-blue-950 font-extrabold text-base">
                          2. Physical Rehabilitation & Physiotherapy Service
                        </h2>
                        <span className="text-xs text-sky-700 font-semibold">
                          Neuro-Physiotherapy, Gait Retraining, Balance & Motor Functional Restoration
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-300">
                      {selectedPatient.physicalRehabilitation?.ptSessionsAttended} / {selectedPatient.physicalRehabilitation?.ptSessionsPrescribed} PT Sessions
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Mobility & Ambulation
                      </span>
                      <p className="font-bold text-blue-950">
                        {selectedPatient.physicalRehabilitation?.mobilityStatus || "Under Evaluation"}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Gait Cadence & Balance
                      </span>
                      <p className="font-bold text-blue-950">
                        {selectedPatient.physicalRehabilitation?.gaitAndBalance || "Standard cadence"}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Berg Balance Score (BBS)
                      </span>
                      <p className="font-extrabold text-emerald-800 font-mono">
                        {selectedPatient.physicalRehabilitation?.bergBalanceScore || "BBS: 40/56"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Range of Motion (ROM) & Tone
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.physicalRehabilitation?.rangeOfMotionAndTone}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                        <strong>Functional Independence:</strong> {selectedPatient.physicalRehabilitation?.functionalIndependenceMeasure}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Rehabilitation Technology & Equipment
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.physicalRehabilitation?.equipmentUtilized}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-blue-900 font-semibold">
                        <strong>Attending Physiotherapist:</strong> {selectedPatient.physicalRehabilitation?.attendingPhysiotherapist}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs">
                    <span className="font-bold text-sky-950 block mb-2">
                      Active Physical Rehabilitation Interventions Protocol
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedPatient.physicalRehabilitation?.physioInterventions.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-800">
                          <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 3: SPEECH ASSESSMENT & PRE-THERAPY
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "speech_assessment") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base">
                      <Brain className="w-4 h-4 text-purple-700" />
                      <h2>3. Speech Assessment & Pre-Therapy Details</h2>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Assessed: {selectedPatient.speechAssessment.assessmentDate}
                    </span>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                    <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block">
                      Diagnostic Battery & Assessment Tools Used
                    </span>
                    <p className="font-bold text-purple-950 text-sm mt-0.5">
                      {selectedPatient.speechAssessment.assessmentTool}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Speech Intelligibility & Clarity
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.speechAssessment.speechIntelligibility}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Articulation & Phonology Scoring
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.speechAssessment.articulationScore}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Voice, Resonance & Phonation
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.speechAssessment.voiceAndResonance}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-1">
                        Oral Motor Examination
                      </span>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {selectedPatient.speechAssessment.oralMotorFunction}
                      </p>
                    </div>
                  </div>

                  {/* Pre-Therapy Baselines */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h3 className="font-bold text-blue-950 text-xs uppercase tracking-wider mb-3">
                      Pre-Therapy Baseline Evaluation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950">
                        <span className="text-[10px] font-bold text-indigo-800 uppercase block">
                          Baseline Communication
                        </span>
                        <p className="font-bold text-indigo-950 mt-1">
                          {selectedPatient.preTherapyDetails.baselineCommunicationScore}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                        <span className="text-[10px] font-bold text-amber-800 uppercase block">
                          Swallowing Safety (FOIS)
                        </span>
                        <p className="font-bold text-amber-950 mt-1">
                          {selectedPatient.preTherapyDetails.baselineSwallowingSafety}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                        <span className="text-[10px] font-bold text-rose-800 uppercase block">
                          Penetration-Aspiration (PAS)
                        </span>
                        <p className="font-bold text-rose-950 mt-1">
                          {selectedPatient.preTherapyDetails.penetrationAspirationScale}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 4: DYSPHAGIA & VITALSTIM THERAPY
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "therapy_modules") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base pb-3 border-b border-slate-100">
                    <Utensils className="w-4 h-4 text-teal-700" />
                    <h2>4. Dysphagia & Swallowing Management</h2>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                    <span className="text-[10px] font-bold text-teal-900 uppercase block">
                      Prescribed Diet Consistency (IDDSI Framework)
                    </span>
                    <p className="font-bold text-teal-950 text-sm mt-0.5">
                      {selectedPatient.dysphagiaTherapy.dietConsistency}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-2">Compensatory Swallowing Maneuvers</span>
                      <ul className="space-y-1.5 text-slate-700">
                        {selectedPatient.dysphagiaTherapy.swallowManeuvers.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-2">Tactile Stimulation & Pacing</span>
                      <p className="text-slate-700 leading-relaxed mb-2">
                        <strong>Thermal-tactile:</strong> {selectedPatient.dysphagiaTherapy.thermalTactileStimulation}
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        <strong>Postural Pacing:</strong> {selectedPatient.dysphagiaTherapy.positioningAndPacing}
                      </p>
                    </div>
                  </div>
                </div>

                {/* VitalStim® NMES Therapy Card */}
                <div className="bg-white rounded-2xl border border-amber-300 shadow-xs p-6 ring-1 ring-amber-400/30">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
                      <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h2>VitalStim® Therapy (Neuromuscular Electrical Stimulation)</h2>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Targeted Protocol
                    </span>
                  </div>

                  {selectedPatient.vitalStimTherapy.channel1Current === "N/A" ? (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      {selectedPatient.vitalStimTherapy.toleranceAndPrecautions ||
                        "VitalStim therapy not indicated for this specific diagnosis."}
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4 text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-800 font-bold uppercase block">Channel 1 Current</span>
                          <span className="font-mono text-base font-extrabold text-amber-950 mt-1 block">
                            {selectedPatient.vitalStimTherapy.channel1Current}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-800 font-bold uppercase block">Channel 2 Current</span>
                          <span className="font-mono text-base font-extrabold text-amber-950 mt-1 block">
                            {selectedPatient.vitalStimTherapy.channel2Current}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-800 font-bold uppercase block">Pulse Parameters</span>
                          <span className="font-mono text-xs font-extrabold text-amber-950 mt-1 block">
                            {selectedPatient.vitalStimTherapy.pulseDuration}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-800 font-bold uppercase block">Session Duration</span>
                          <span className="font-mono text-xs font-extrabold text-amber-950 mt-1 block">
                            {selectedPatient.vitalStimTherapy.sessionDuration}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="font-bold text-blue-950 block mb-1">
                            Electrode Placement Configuration
                          </span>
                          <p className="text-slate-700 leading-relaxed font-normal">
                            {selectedPatient.vitalStimTherapy.electrodePlacement}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="font-bold text-blue-950 block mb-1">
                            Tolerance & Cardiac Safety Monitoring
                          </span>
                          <p className="text-slate-700 leading-relaxed font-normal">
                            {selectedPatient.vitalStimTherapy.toleranceAndPrecautions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 5: SESSION INFO & THERAPIST LOG
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "sessions") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base">
                      <Stethoscope className="w-4 h-4 text-blue-700" />
                      <h2>5. Therapist In-Charge & Session Attendance</h2>
                    </div>
                    <button
                      onClick={() => setIsLogSessionModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all shadow-xs print:hidden"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Session</span>
                    </button>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Attending Specialists</span>
                      <h3 className="font-extrabold text-blue-950 text-sm mt-0.5">
                        {selectedPatient.therapistDetails.leadTherapist}
                      </h3>
                      <p className="text-slate-600 mt-0.5 font-medium">
                        {selectedPatient.therapistDetails.department}
                      </p>
                      <p className="font-mono text-[11px] text-blue-800 mt-0.5 font-semibold">
                        License: {selectedPatient.therapistDetails.licenseNo} • Contact: {selectedPatient.therapistDetails.contact}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 shrink-0 text-center sm:text-right shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-bold block">Sessions Attended</span>
                      <div className="text-lg font-extrabold text-blue-950 mt-0.5 font-mono">
                        {selectedPatient.sessionsAttended} / {selectedPatient.sessionsPrescribed}
                        <span className="text-xs font-normal text-slate-500 ml-1">Sessions</span>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-700 block mt-0.5 font-mono">
                        {Math.round((selectedPatient.sessionsAttended / selectedPatient.sessionsPrescribed) * 100)}% Prescribed Course Completed
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                      <div
                        className="bg-gradient-to-r from-blue-700 to-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (selectedPatient.sessionsAttended / selectedPatient.sessionsPrescribed) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-extrabold text-blue-950 text-xs uppercase tracking-wider mb-3">
                      Complete Clinical Session History Log ({selectedPatient.sessionHistory.length})
                    </h3>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                          <tr>
                            <th className="py-2.5 px-3">#</th>
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">Modality / Service</th>
                            <th className="py-2.5 px-3">Therapist</th>
                            <th className="py-2.5 px-3">Duration</th>
                            <th className="py-2.5 px-3">Clinical Response & Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {selectedPatient.sessionHistory.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3 font-mono font-bold text-blue-700">#{s.sessionNumber}</td>
                              <td className="py-2.5 px-3 whitespace-nowrap font-mono">{s.date}</td>
                              <td className="py-2.5 px-3 font-bold text-blue-950">{s.modality}</td>
                              <td className="py-2.5 px-3">{s.therapist}</td>
                              <td className="py-2.5 px-3 font-mono">{s.durationMinutes}m</td>
                              <td className="py-2.5 px-3 text-slate-600 max-w-xs">{s.patientResponse}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 6: PROGRESS REPORT
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "progress") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <h2>6. Clinical Progress Report & Objective Recovery</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-semibold">Overall Recovery:</span>
                      <span className="font-mono text-sm font-extrabold bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full border border-emerald-300">
                        {selectedPatient.progressReport.recoveryRatePercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Speech Clarity & Communication
                      </span>
                      <p className="font-bold text-blue-950 leading-snug">
                        {selectedPatient.progressReport.speechClarityGain}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Swallowing Safety & FOIS Evolution
                      </span>
                      <p className="font-bold text-blue-950 leading-snug">
                        {selectedPatient.progressReport.swallowingSafetyGain}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Physical Mobility & Motor Gain
                      </span>
                      <p className="font-bold text-sky-800 leading-snug">
                        {selectedPatient.progressReport.physicalMobilityGain}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-blue-950 mb-1.5">
                      <FileCheck className="w-4 h-4 text-blue-700" />
                      <span>Attending Clinical Specialist Impression & Evaluation</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed text-sm">
                      {selectedPatient.progressReport.therapistClinicalImpression}
                    </p>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-950">Target for Next Milestone: </span>
                      <span className="text-slate-700">{selectedPatient.progressReport.nextMilestoneTarget}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────────────────
                SECTION 7: DISCHARGE SUMMARY & HOME MANAGEMENT
            ───────────────────────────────────────────────────────────────────────── */}
            {(viewMode === "dossier" || activeTab === "discharge_home") && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <h2>7. Discharge Summary & Medical Clearance</h2>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        selectedPatient.dischargeSummary.status === "Approved for Discharge" ||
                        selectedPatient.dischargeSummary.status === "Discharged"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      {selectedPatient.dischargeSummary.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block">Proposed Discharge Date</span>
                      <p className="font-mono font-extrabold text-blue-950 text-sm mt-0.5">
                        {selectedPatient.dischargeSummary.proposedDischargeDate}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block">Functional Status at Clearance</span>
                      <p className="font-bold text-blue-950 mt-0.5">
                        {selectedPatient.dischargeSummary.functionalStatusAtDischarge}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-bold text-blue-950 block mb-2">Discharge Criteria Achieved</span>
                    <ul className="space-y-2 text-slate-700">
                      {selectedPatient.dischargeSummary.criteriaAchieved.map((crit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-bold text-blue-950 block mb-1">
                      Summary of Completed Interventions
                    </span>
                    <p className="text-slate-700 leading-relaxed font-normal">
                      {selectedPatient.dischargeSummary.summaryOfInterventions}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                      <strong>Medical Clearance Sign-Off:</strong> {selectedPatient.dischargeSummary.physicianSignoff}
                    </div>
                  </div>
                </div>

                {/* Home Management Plan */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
                  <div className="flex items-center gap-2 text-blue-950 font-extrabold text-base pb-3 border-b border-slate-100">
                    <Home className="w-4 h-4 text-blue-700" />
                    <h2>8. Home Management & Caregiver Protocols</h2>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-2">
                        Home Speech Exercises
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        {selectedPatient.homeManagement.homeExerciseProgram.map((ex, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 border border-blue-200">
                              {i + 1}
                            </span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-2">
                        Physical Mobility Home Plan
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        {selectedPatient.homeManagement.physicalMobilityHomePlan.map((guide, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-800 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 border border-sky-200">
                              {i + 1}
                            </span>
                            <span>{guide}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-950 block mb-2">
                        Safe Swallowing Guidelines
                      </span>
                      <ul className="space-y-2 text-slate-700">
                        {selectedPatient.homeManagement.safeSwallowingGuidelines.map((guide, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                            <span>{guide}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <span className="font-bold block mb-1">Caregiver Safety & Fall Prevention Protocol</span>
                    <p className="leading-relaxed">{selectedPatient.homeManagement.caregiverSafetyInstructions}</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-bold block">Outpatient Follow-Up Review</span>
                      <p className="font-bold text-blue-950 mt-1">
                        {selectedPatient.homeManagement.followUpSchedule}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                      <span className="font-bold text-red-700 block">Emergency Clinic Helpline</span>
                      <p className="font-mono font-extrabold mt-1 text-red-900">
                        {selectedPatient.homeManagement.emergencyContactProtocol}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL: ADD NEW PATIENT
      ───────────────────────────────────────────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-slate-900">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-center shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-blue-950">Add Patient EHR Record</h2>
                  <p className="text-xs text-slate-500">
                    Enter clinical intake, Physical Rehabilitation, speech & VitalStim data
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePatient} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs custom-scroll">
              <div>
                <h3 className="font-bold text-blue-950 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100 flex items-center gap-1.5 mb-3">
                  <User className="w-3.5 h-3.5 text-blue-700" />
                  <span>1. Patient Demographics & Room Allocation</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      value={formData.age || 45}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Gender *</label>
                    <select
                      value={formData.gender || "Male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Room No *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 305"
                      value={formData.roomNo || ""}
                      onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Ward / Department</label>
                    <input
                      type="text"
                      value={formData.ward || ""}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactNumber || ""}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-950 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100 flex items-center gap-1.5 mb-3">
                  <Accessibility className="w-3.5 h-3.5 text-sky-700" />
                  <span>2. Physical Rehabilitation & Physiotherapy Intake</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Mobility / Ambulation Status</label>
                    <input
                      type="text"
                      placeholder="e.g. Ambulatory with quad cane"
                      value={formData.physicalRehabilitation?.mobilityStatus || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalRehabilitation: {
                            ...formData.physicalRehabilitation!,
                            mobilityStatus: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Berg Balance Scale / Score</label>
                    <input
                      type="text"
                      placeholder="e.g. BBS: 42 / 56"
                      value={formData.physicalRehabilitation?.bergBalanceScore || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalRehabilitation: {
                            ...formData.physicalRehabilitation!,
                            bergBalanceScore: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Lead Physiotherapist</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Sandeep Varma, MPT"
                      value={formData.physicalRehabilitation?.attendingPhysiotherapist || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalRehabilitation: {
                            ...formData.physicalRehabilitation!,
                            attendingPhysiotherapist: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-950 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100 flex items-center gap-1.5 mb-3">
                  <HeartPulse className="w-3.5 h-3.5 text-red-600" />
                  <span>3. Diagnosis, Speech & VitalStim NMES</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-bold mb-1">Primary Diagnosis *</label>
                    <input
                      type="text"
                      required
                      value={formData.primaryDiagnosis || ""}
                      onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">VitalStim (Ch1 / Ch2)</label>
                    <input
                      type="text"
                      placeholder="e.g. 8.0 mA / 8.5 mA"
                      value={formData.vitalStimTherapy?.channel1Current || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vitalStimTherapy: {
                            ...formData.vitalStimTherapy!,
                            channel1Current: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl shadow-md transition-all"
                >
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL: LOG CLINICAL SESSION
      ───────────────────────────────────────────────────────────────────────────── */}
      {isLogSessionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 text-xs text-slate-900 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-700" />
                <h3 className="font-extrabold text-blue-950 text-sm">
                  Log Session for {selectedPatient?.name}
                </h3>
              </div>
              <button
                onClick={() => setIsLogSessionModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSession} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Service / Modality *</label>
                <select
                  value={newSessionData.modality}
                  onChange={(e) => setNewSessionData({ ...newSessionData, modality: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                >
                  <option value="Physical Rehab: Treadmill Gait & Balance Training">
                    Physical Rehab: Treadmill Gait & Balance Training
                  </option>
                  <option value="Physical Rehab: Core Stability & Functional Transfers">
                    Physical Rehab: Core Stability & Functional Transfers
                  </option>
                  <option value="VitalStim NMES + Dysphagia Pureed Swallow">
                    VitalStim NMES + Dysphagia Pureed Swallow
                  </option>
                  <option value="Speech Articulation & Functional Communication">
                    Speech Articulation & Functional Communication
                  </option>
                  <option value="Combined Speech & Pediatric Gross Motor Gym">
                    Combined Speech & Pediatric Gross Motor Gym
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Attending Therapist</label>
                <input
                  type="text"
                  required
                  value={newSessionData.therapist}
                  onChange={(e) => setNewSessionData({ ...newSessionData, therapist: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  required
                  value={newSessionData.durationMinutes}
                  onChange={(e) =>
                    setNewSessionData({ ...newSessionData, durationMinutes: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Clinical Protocol & Exercises</label>
                <textarea
                  rows={2}
                  required
                  value={newSessionData.exercises}
                  onChange={(e) => setNewSessionData({ ...newSessionData, exercises: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Patient Response & Notes</label>
                <textarea
                  rows={2}
                  required
                  value={newSessionData.patientResponse}
                  onChange={(e) => setNewSessionData({ ...newSessionData, patientResponse: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogSessionModalOpen(false)}
                  className="px-3.5 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm"
                >
                  Save Session Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
