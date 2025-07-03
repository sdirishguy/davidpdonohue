import pdfplumber
import json
import os
import re

PDF_PATH = os.path.join('..', 'assets', '2025CurrentResume-DavidDonohue.pdf')
OUTPUT_PATH = os.path.join('..', 'resume-app', 'src', 'components', 'resume_timeline.json')

def parse_header(text):
    # Assumes header is in the first 3 non-empty lines
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if len(lines) < 3:
        return {}
    name = lines[0]
    title = lines[1]
    contact_line = lines[2]

    # Attempt to extract location, phone, email, LinkedIn, website, github
    location = phone = email = linkedin = website = github = ""
    # Example: "Hobe Sound, FL | 619-517-4277 | donohue76@hotmail.com | LinkedIn.com/in/DavidPatrickDonohue"
    parts = [p.strip() for p in contact_line.split('|')]
    for part in parts:
        if "@" in part and email == "":
            email = part
        elif part.lower().startswith("linkedin"):
            linkedin = part if "://" in part else "https://" + part.replace(" ", "").replace("LinkedIn.com/", "linkedin.com/")
        elif part.lower().startswith("github"):
            github = part if "://" in part else "https://" + part
        elif part.lower().startswith("http"):
            website = part
        elif re.search(r"\d{3}[-\s]\d{3}[-\s]\d{4}", part):
            phone = part
        elif location == "":
            location = part

    return {
        "name": name,
        "title": title,
        "location": location,
        "phone": phone,
        "email": email,
        "linkedin": linkedin,
        "website": website,
        "github": github
    }

def extract_sections(text):
    titles = [
        'PROFESSIONAL SUMMARY',
        'SKILLS & TOOLS',
        'EXPERIENCE',
        'EDUCATION'
    ]
    pattern = '|'.join([re.escape(t) for t in titles])
    splits = re.split(rf'\n\s*({pattern})\s*\n', text)
    sections = {}
    current = None
    for part in splits:
        if part in titles:
            current = part
            sections[current] = ""
        elif current:
            sections[current] += part
    return sections

def parse_skills(text):
    skills = {}
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    key = None
    for line in lines:
        if ':' in line:
            key, vals = line.split(':', 1)
            skills[key.strip()] = [v.strip() for v in vals.split(',') if v.strip()]
        elif key:
            # For multi-line skills
            skills[key] += [v.strip() for v in line.split(',') if v.strip()]
    return skills

def parse_experience(text):
    jobs = []
    # Each entry starts with pipe-separated bold line, then bullet points
    entry_re = re.compile(
        r'([^\n•]+?)\s*\|\s*([^\n•]+?)\s*\|\s*([^\n•]+?)\s*\|\s*([^\n•]+)\n((?:\s*•.*\n?)+)', re.MULTILINE)
    for match in entry_re.finditer(text):
        company, title, location, dates, bullets = match.groups()
        bullet_points = [b.strip("• ").strip() for b in bullets.strip().split('\n') if b.strip()]
        jobs.append({
            "company": company.strip(),
            "title": title.strip(),
            "location": location.strip(),
            "dates": dates.strip(),
            "details": bullet_points
        })
    # Add handling for "Career Break" (not pipe-delimited)
    career_break = re.findall(r'(Career Break.*?)((?:\s*•.*\n?)+)', text, re.MULTILINE)
    for cb_title, bullets in career_break:
        bullet_points = [b.strip("• ").strip() for b in bullets.strip().split('\n') if b.strip()]
        jobs.append({
            "company": "",
            "title": cb_title.strip(),
            "location": "",
            "dates": "",
            "details": bullet_points
        })
    return jobs

def parse_education(text):
    edu = []
    # Each entry starts with a bold line (school) and bullet points
    entry_re = re.compile(r'([^\n•]+)\n((?:\s*•.*\n?)+)', re.MULTILINE)
    for match in entry_re.finditer(text):
        school, bullets = match.groups()
        bullet_points = [b.strip("• ").strip() for b in bullets.strip().split('\n') if b.strip()]
        edu.append({
            "school": school.strip(),
            "details": bullet_points
        })
    return edu

# Main script execution
with pdfplumber.open(PDF_PATH) as pdf:
    full_text = ""
    for page in pdf.pages:
        page_text = page.extract_text()
        if page_text: full_text += page_text + "\n"
    with open(os.path.join('..', 'assets', 'resume_raw.txt'), 'w', encoding='utf-8') as f:
        f.write(full_text)

# PARSE HEADER
header = parse_header(full_text)

# Parse remaining sections
sections = extract_sections(full_text)

summary = sections.get("PROFESSIONAL SUMMARY", "").strip()
skills = parse_skills(sections.get("SKILLS & TOOLS", ""))
experience = parse_experience(sections.get("EXPERIENCE", ""))
education = parse_education(sections.get("EDUCATION", ""))

result = {
    "header": header,
    "summary": summary,
    "skills": skills,
    "experience": experience,
    "education": education
}

with open(OUTPUT_PATH, "w", encoding="utf-8") as out:
    json.dump(result, out, indent=2)

print(f"Parsed resume data written to {OUTPUT_PATH}")
print("Check and edit the JSON for clarity or extra polish!")
