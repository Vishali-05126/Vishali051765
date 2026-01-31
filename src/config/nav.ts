import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRightLeft,
  AudioWaveform,
  BrainCircuit,
  ClipboardList,
  Cpu,
  GitCommit,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Puzzle,
  ShieldAlert,
  Sliders,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChangelog?: boolean;
  imageId?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reverse Teaching",
    href: "/reverse-teaching",
    icon: ArrowRightLeft,
    imageId: "reverse-teaching-card",
  },
  {
    title: "Multi-Persona",
    href: "/multi-persona",
    icon: Puzzle,
    imageId: "multi-persona-card",
  },
  {
    title: "Failure Simulation",
    href: "/failure-simulation",
    icon: ShieldAlert,
    imageId: "failure-sim-card",
  },
  {
    title: "Knowledge Gaps",
    href: "/knowledge-gaps",
    icon: GraduationCap,
    imageId: "gaps-card",
  },
  {
    title: "Anti-Patterns",
    href: "/anti-patterns",
    icon: HeartPulse,
    imageId: "anti-patterns-card",
  },
  {
    title: "Assistive Reader",
    href: "/assistive-reader",
    icon: AudioWaveform,
    imageId: "assistive-reader-card",
  },
  {
    title: "Skill Ancestry",
    href: "/skill-ancestry",
    icon: GitCommit,
    imageId: "ancestry-card",
  },
];
