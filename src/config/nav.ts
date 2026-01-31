import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRightLeft,
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
  },
  {
    title: "Multi-Persona",
    href: "/multi-persona",
    icon: Puzzle,
  },
  {
    title: "Failure Simulation",
    href: "/failure-simulation",
    icon: ShieldAlert,
  },
  {
    title: "Knowledge Gaps",
    href: "/knowledge-gaps",
    icon: GraduationCap,
  },
  {
    title: "Anti-Patterns",
    href: "/anti-patterns",
    icon: HeartPulse,
  },
  {
    title: "Skill Ancestry",
    href: "/skill-ancestry",
    icon: GitCommit,
  },
];
