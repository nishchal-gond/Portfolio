import Link from 'next/link';

import type { SkillGroup } from '@/data/resume/skills';
import { createHeadingId } from '@/lib/anchors';

interface SkillsProps {
  groups: SkillGroup[];
}

/**
 * Skills as evidence rather than self-ratings: each group lists its tools and
 * links to the project cards where they were used.
 */
export default function Skills({ groups }: SkillsProps) {
  return (
    <div className="skills">
      <div className="title">
        <h2>Skills</h2>
      </div>
      <div className="skill-groups">
        {groups.map((group) => (
          <section key={group.name} className="skill-group">
            <h3 className="skill-group-title">{group.name}</h3>
            <div className="skill-group-body">
              <ul className="skill-tags">
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-tag">
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="skill-group-proof">
                Used in{' '}
                {group.usedIn.map((title, i) => (
                  <span key={title}>
                    {i > 0 && (i === group.usedIn.length - 1 ? ' and ' : ', ')}
                    <Link href={`/projects/#${createHeadingId(title)}`}>
                      {title}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
