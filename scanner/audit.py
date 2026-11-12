#!/usr/bin/env python3
"""
RightSkills Security Audit Scanner (CI rule-based analyzer)
Scans skill markdown files for prompt injection, hidden unicode, shell execution, and exfiltration.
Outputs scan-results.json for frontend consumption.
"""

import os
import re
import json
import sys

SUSPICIOUS_PATTERNS = [
    (r'curl\s+.*\|.*sh', 'C | sh execution detected'),
    (r'wget\s+.*\|.*sh', 'Wget | sh execution detected'),
    (r'base64\s+-d', 'Base64 decoding detected'),
    (r'eval\(', 'Eval execution detected'),
    (r'IGNORE\s+PREVIOUS\s+INSTRUCTIONS', 'Prompt injection pattern detected'),
    (r'SYSTEM\s+OVERRIDE', 'System override prompt injection detected'),
    (r'[\u200b\u200c\u200d\u2060\ufeff]', 'Zero-width or hidden unicode characters detected')
]

def audit_skill(skill_dir):
    findings = []
    skill_md_path = os.path.join(skill_dir, 'SKILL.md')
    
    if not os.path.exists(skill_md_path):
        return {'grade': 'F', 'findings': ['SKILL.md missing']}
        
    with open(skill_md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for line_num, line in enumerate(content.splitlines(), 1):
        for pattern, desc in SUSPICIOUS_PATTERNS:
            if re.search(pattern, line, re.IGNORECASE):
                findings.append(f"Line {line_num}: {desc}")
                
    # Determine grade
    if not findings:
        grade = 'A'
    elif len(findings) <= 2:
        grade = 'B'
    elif len(findings) <= 4:
        grade = 'C'
    else:
        grade = 'D'
        
    return {
        'grade': grade,
        'findings': findings
    }

def main():
    skills_root = sys.argv[1] if len(sys.argv) > 1 else 'skills'
    results = {}
    
    if not os.path.exists(skills_root):
        print(f"Skills directory {skills_root} not found.")
        sys.exit(1)
        
    for item in os.listdir(skills_root):
        skill_path = os.path.join(skills_root, item)
        if os.path.isdir(skill_path):
            results[item] = audit_skill(skill_path)
            
    # Save output to api/v1/scan-results.json
    output_path = os.path.join('api', 'v1', 'scan-results.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
        
    print(f"Security audit complete. Results saved to {output_path}")
    print(json.dumps(results, indent=2))

if __name__ == '__main__':
    main()
