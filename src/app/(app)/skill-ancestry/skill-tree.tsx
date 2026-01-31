'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface Skill {
  id: string;
  name: string;
  level: number;
  dependencies: string[];
  position: { x: number; y: number };
}

interface SkillTreeData {
  [key: string]: Skill[];
}

const skillData: SkillTreeData = {
  Programming: [
    { id: 'vars', name: 'Variables', level: 1, dependencies: [], position: { x: 50, y: 10 } },
    { id: 'loops', name: 'Loops', level: 2, dependencies: ['vars'], position: { x: 30, y: 30 } },
    { id: 'funcs', name: 'Functions', level: 2, dependencies: ['vars'], position: { x: 70, y: 30 } },
    { id: 'objects', name: 'Objects', level: 3, dependencies: ['funcs'], position: { x: 50, y: 50 } },
    { id: 'async', name: 'Async/Await', level: 4, dependencies: ['objects', 'loops'], position: { x: 70, y: 70 } },
    { id: 'react', name: 'React', level: 5, dependencies: ['async'], position: { x: 50, y: 90 } },
  ],
  Mathematics: [
    { id: 'arith', name: 'Arithmetic', level: 1, dependencies: [], position: { x: 50, y: 10 } },
    { id: 'algebra', name: 'Algebra', level: 2, dependencies: ['arith'], position: { x: 50, y: 30 } },
    { id: 'geom', name: 'Geometry', level: 2, dependencies: ['arith'], position: { x: 20, y: 30 } },
    { id: 'trig', name: 'Trigonometry', level: 3, dependencies: ['algebra', 'geom'], position: { x: 35, y: 55 } },
    { id: 'calculus', name: 'Calculus', level: 4, dependencies: ['trig'], position: { x: 50, y: 80 } },
  ],
};

const SkillNode = ({ skill }: { skill: Skill }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    style={{
      left: `${skill.position.x}%`,
      top: `${skill.position.y}%`,
      transform: 'translate(-50%, -50%)',
    }}
    className="absolute"
  >
    <div className="flex items-center justify-center p-3 text-center text-sm font-medium bg-card text-card-foreground rounded-lg border shadow-sm min-w-[120px]">
      {skill.name}
    </div>
  </motion.div>
);

const Line = ({ from, to }: { from: Skill; to: Skill }) => {
  const dx = to.position.x - from.position.x;
  const dy = to.position.y - from.position.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke="hsl(var(--border))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
  );
};


export const SkillTree = ({ domain }: { domain: 'Programming' | 'Mathematics' }) => {
  const skills = skillData[domain];
  const skillsById = skills.reduce((acc, skill) => {
    acc[skill.id] = skill;
    return acc;
  }, {} as Record<string, Skill>);

  return (
    <div className="relative w-full h-[500px] bg-muted/20 rounded-lg border">
      {skills.map(skill => (
        <React.Fragment key={skill.id}>
          {skill.dependencies.map(depId => (
            <Line key={`${depId}-${skill.id}`} from={skillsById[depId]} to={skill} />
          ))}
        </React.Fragment>
      ))}
      {skills.map(skill => (
        <SkillNode key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
