import { useState, useRef } from "react";
import HeroSlideshow from "@/components/HeroSlideshow";
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Heart, 
  Download, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Linkedin,
  Layout,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface Reference {
  id: string;
  name: string;
  title: string;
  organization: string;
  phone: string;
  email: string;
}

type CVTemplate = 'classic' | 'modern' | 'executive' | 'creative';

const templates: { id: CVTemplate; name: string; description: string; preview: string }[] = [
  { 
    id: 'classic', 
    name: 'Classic', 
    description: 'Traditional and professional, perfect for corporate roles',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Clean and contemporary with a sidebar layout',
    preview: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  { 
    id: 'executive', 
    name: 'Executive', 
    description: 'Elegant and sophisticated for senior positions',
    preview: 'bg-gradient-to-br from-amber-100 to-amber-200'
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Bold and unique for creative industries',
    preview: 'bg-gradient-to-br from-purple-100 to-purple-200'
  }
];

const CVBuilder = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>('classic');
  
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    summary: ""
  });

  // Education
  const [education, setEducation] = useState<Education[]>([
    { id: "1", institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "" }
  ]);

  // Experience
  const [experience, setExperience] = useState<Experience[]>([
    { id: "1", company: "", position: "", startDate: "", endDate: "", description: "" }
  ]);

  // Skills
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "", level: "Intermediate" }
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<string[]>([""]);

  // Hobbies
  const [hobbies, setHobbies] = useState<string[]>([""]);

  // References
  const [references, setReferences] = useState<Reference[]>([
    { id: "1", name: "", title: "", organization: "", phone: "", email: "" }
  ]);

  const addEducation = () => {
    setEducation([...education, { 
      id: Date.now().toString(), 
      institution: "", 
      degree: "", 
      field: "", 
      startYear: "", 
      endYear: "", 
      grade: "" 
    }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(e => e.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addExperience = () => {
    setExperience([...experience, { 
      id: Date.now().toString(), 
      company: "", 
      position: "", 
      startDate: "", 
      endDate: "", 
      description: "" 
    }]);
  };

  const removeExperience = (id: string) => {
    if (experience.length > 1) {
      setExperience(experience.filter(e => e.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: "", level: "Intermediate" }]);
  };

  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const addHobby = () => {
    setHobbies([...hobbies, ""]);
  };

  const removeHobby = (index: number) => {
    if (hobbies.length > 1) {
      setHobbies(hobbies.filter((_, i) => i !== index));
    }
  };

  const updateHobby = (index: number, value: string) => {
    const updated = [...hobbies];
    updated[index] = value;
    setHobbies(updated);
  };

  const addReference = () => {
    setReferences([...references, { 
      id: Date.now().toString(), 
      name: "", 
      title: "", 
      organization: "", 
      phone: "", 
      email: "" 
    }]);
  };

  const removeReference = (id: string) => {
    if (references.length > 1) {
      setReferences(references.filter(r => r.id !== id));
    }
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(references.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const getTemplateStyles = (template: CVTemplate) => {
    const baseStyles = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @media print { body { padding: 20px; } }
    `;

    switch (template) {
      case 'classic':
        return `
          ${baseStyles}
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
          .header { text-align: center; border-bottom: 2px solid #800020; padding-bottom: 20px; margin-bottom: 30px; }
          .name { font-size: 32px; font-weight: bold; color: #800020; margin-bottom: 5px; }
          .title { font-size: 18px; color: #666; margin-bottom: 15px; }
          .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; font-size: 14px; }
          .contact-item { display: flex; align-items: center; gap: 5px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #800020; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; }
          .summary { text-align: justify; }
          .item { margin-bottom: 15px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; }
          .item-title { font-weight: bold; font-size: 16px; }
          .item-subtitle { font-style: italic; color: #666; }
          .item-date { color: #888; font-size: 14px; }
          .item-description { margin-top: 5px; }
          .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag { background: #f5f5f5; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
          .achievements-list, .hobbies-list { list-style-type: disc; padding-left: 20px; }
          .reference { margin-bottom: 15px; }
          .reference-name { font-weight: bold; }
          .reference-title { font-style: italic; color: #666; }
        `;
      case 'modern':
        return `
          ${baseStyles}
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; color: #2d3748; max-width: 800px; margin: 0 auto; padding: 0; display: flex; }
          .sidebar { width: 280px; background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 40px 25px; min-height: 100vh; }
          .main-content { flex: 1; padding: 40px 30px; background: #fff; }
          .name { font-size: 28px; font-weight: 700; margin-bottom: 5px; }
          .title { font-size: 14px; opacity: 0.9; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px; }
          .contact { margin-bottom: 30px; }
          .contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 13px; }
          .sidebar-section { margin-bottom: 25px; }
          .sidebar-section-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid rgba(255,255,255,0.3); }
          .skill-item { background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 4px; margin-bottom: 6px; font-size: 13px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 700; color: #1e3a5f; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #1e3a5f; }
          .summary { color: #4a5568; line-height: 1.7; }
          .item { margin-bottom: 18px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
          .item-title { font-weight: 600; font-size: 15px; color: #2d3748; }
          .item-subtitle { color: #1e3a5f; font-size: 14px; }
          .item-date { color: #718096; font-size: 13px; }
          .item-description { color: #4a5568; font-size: 14px; margin-top: 5px; }
          .achievements-list, .hobbies-list { list-style-type: none; padding-left: 0; }
          .achievements-list li, .hobbies-list li { position: relative; padding-left: 18px; margin-bottom: 6px; font-size: 14px; }
          .achievements-list li:before, .hobbies-list li:before { content: "▸"; position: absolute; left: 0; color: #1e3a5f; }
          .reference { margin-bottom: 12px; }
          .reference-name { font-weight: 600; font-size: 14px; }
          .reference-title { color: #718096; font-size: 13px; }
        `;
      case 'executive':
        return `
          ${baseStyles}
          body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; line-height: 1.7; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 50px; background: #fff; }
          .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px double #b8860b; }
          .name { font-size: 38px; font-weight: 400; color: #1a1a1a; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px; }
          .title { font-size: 16px; color: #b8860b; letter-spacing: 2px; margin-bottom: 20px; }
          .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 25px; font-size: 13px; color: #555; }
          .contact-item { display: flex; align-items: center; gap: 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 14px; font-weight: 600; color: #b8860b; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 1px solid #e0d5b8; }
          .summary { text-align: justify; font-style: italic; color: #333; padding: 15px 25px; background: #fdfbf7; border-left: 3px solid #b8860b; }
          .item { margin-bottom: 20px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; }
          .item-title { font-weight: 600; font-size: 16px; color: #1a1a1a; }
          .item-subtitle { color: #666; font-size: 14px; }
          .item-date { color: #999; font-size: 13px; font-style: italic; }
          .item-description { margin-top: 8px; color: #444; }
          .skills-grid { display: flex; flex-wrap: wrap; gap: 12px; }
          .skill-tag { background: #fdfbf7; border: 1px solid #e0d5b8; padding: 6px 16px; font-size: 13px; color: #555; }
          .achievements-list, .hobbies-list { list-style-type: none; padding-left: 0; }
          .achievements-list li, .hobbies-list li { position: relative; padding-left: 20px; margin-bottom: 8px; }
          .achievements-list li:before, .hobbies-list li:before { content: "◆"; position: absolute; left: 0; color: #b8860b; font-size: 10px; top: 4px; }
          .reference { margin-bottom: 15px; padding-left: 15px; border-left: 2px solid #e0d5b8; }
          .reference-name { font-weight: 600; }
          .reference-title { color: #666; font-size: 14px; }
        `;
      case 'creative':
        return `
          ${baseStyles}
          body { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 0; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; text-align: center; }
          .name { font-size: 36px; font-weight: 300; margin-bottom: 8px; letter-spacing: 2px; }
          .title { font-size: 18px; font-weight: 500; opacity: 0.9; margin-bottom: 20px; }
          .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; font-size: 14px; }
          .contact-item { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 6px 14px; border-radius: 20px; }
          .content { padding: 40px; }
          .section { margin-bottom: 35px; }
          .section-title { font-size: 13px; font-weight: 700; color: #667eea; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
          .section-title:after { content: ""; flex: 1; height: 2px; background: linear-gradient(90deg, #667eea, transparent); }
          .summary { color: #555; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%); border-radius: 12px; }
          .item { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
          .item-title { font-weight: 600; font-size: 16px; color: #333; }
          .item-subtitle { color: #667eea; font-size: 14px; font-weight: 500; }
          .item-date { color: #999; font-size: 13px; background: #f0f0f0; padding: 3px 10px; border-radius: 10px; }
          .item-description { color: #666; font-size: 14px; }
          .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 18px; border-radius: 25px; font-size: 13px; font-weight: 500; }
          .achievements-list, .hobbies-list { list-style-type: none; padding-left: 0; display: flex; flex-wrap: wrap; gap: 10px; }
          .achievements-list li, .hobbies-list li { background: #f5f7fa; padding: 8px 16px; border-radius: 8px; font-size: 14px; }
          .reference { margin-bottom: 15px; padding: 15px; background: #f5f7fa; border-radius: 10px; }
          .reference-name { font-weight: 600; color: #667eea; }
          .reference-title { color: #666; font-size: 14px; }
        `;
      default:
        return baseStyles;
    }
  };

  const generateCVContent = (template: CVTemplate) => {
    const educationHTML = education.filter(e => e.institution).map(e => `
      <div class="item">
        <div class="item-header">
          <div>
            <div class="item-title">${e.degree}${e.field ? ` in ${e.field}` : ''}</div>
            <div class="item-subtitle">${e.institution}</div>
          </div>
          <div class="item-date">${e.startYear}${e.endYear ? ` - ${e.endYear}` : ''}</div>
        </div>
        ${e.grade ? `<div class="item-description">Grade: ${e.grade}</div>` : ''}
      </div>
    `).join('');

    const experienceHTML = experience.filter(e => e.company).map(e => `
      <div class="item">
        <div class="item-header">
          <div>
            <div class="item-title">${e.position}</div>
            <div class="item-subtitle">${e.company}</div>
          </div>
          <div class="item-date">${e.startDate}${e.endDate ? ` - ${e.endDate}` : ''}</div>
        </div>
        ${e.description ? `<div class="item-description">${e.description}</div>` : ''}
      </div>
    `).join('');

    const skillsHTML = skills.filter(s => s.name).map(s => 
      template === 'modern' 
        ? `<div class="skill-item">${s.name} (${s.level})</div>`
        : `<span class="skill-tag">${s.name} (${s.level})</span>`
    ).join('');

    const achievementsHTML = achievements.filter(a => a).map(a => `<li>${a}</li>`).join('');
    const hobbiesHTML = hobbies.filter(h => h).map(h => `<li>${h}</li>`).join('');
    
    const referencesHTML = references.filter(r => r.name).map(r => `
      <div class="reference">
        <div class="reference-name">${r.name}</div>
        <div class="reference-title">${r.title}${r.organization ? `, ${r.organization}` : ''}</div>
        ${r.phone ? `<div>📱 ${r.phone}</div>` : ''}
        ${r.email ? `<div>📧 ${r.email}</div>` : ''}
      </div>
    `).join('');

    if (template === 'modern') {
      return `
        <div class="sidebar">
          <div class="name">${personalInfo.fullName}</div>
          ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
          
          <div class="contact">
            ${personalInfo.email ? `<div class="contact-item">📧 ${personalInfo.email}</div>` : ''}
            ${personalInfo.phone ? `<div class="contact-item">📱 ${personalInfo.phone}</div>` : ''}
            ${personalInfo.address ? `<div class="contact-item">📍 ${personalInfo.address}</div>` : ''}
            ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
            ${personalInfo.website ? `<div class="contact-item">🌐 ${personalInfo.website}</div>` : ''}
          </div>
          
          ${skills.some(s => s.name) ? `
            <div class="sidebar-section">
              <div class="sidebar-section-title">Skills</div>
              ${skillsHTML}
            </div>
          ` : ''}
          
          ${hobbies.some(h => h) ? `
            <div class="sidebar-section">
              <div class="sidebar-section-title">Interests</div>
              <ul class="hobbies-list">${hobbiesHTML}</ul>
            </div>
          ` : ''}
        </div>
        
        <div class="main-content">
          ${personalInfo.summary ? `
            <div class="section">
              <div class="section-title">About Me</div>
              <p class="summary">${personalInfo.summary}</p>
            </div>
          ` : ''}
          
          ${experience.some(e => e.company) ? `
            <div class="section">
              <div class="section-title">Experience</div>
              ${experienceHTML}
            </div>
          ` : ''}
          
          ${education.some(e => e.institution) ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${educationHTML}
            </div>
          ` : ''}
          
          ${achievements.some(a => a) ? `
            <div class="section">
              <div class="section-title">Achievements</div>
              <ul class="achievements-list">${achievementsHTML}</ul>
            </div>
          ` : ''}
          
          ${references.some(r => r.name) ? `
            <div class="section">
              <div class="section-title">References</div>
              ${referencesHTML}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (template === 'creative') {
      return `
        <div class="header">
          <div class="name">${personalInfo.fullName}</div>
          ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
          <div class="contact">
            ${personalInfo.email ? `<span class="contact-item">📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span class="contact-item">📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.address ? `<span class="contact-item">📍 ${personalInfo.address}</span>` : ''}
            ${personalInfo.linkedin ? `<span class="contact-item">💼 ${personalInfo.linkedin}</span>` : ''}
          </div>
        </div>
        
        <div class="content">
          ${personalInfo.summary ? `
            <div class="section">
              <div class="section-title">Profile</div>
              <p class="summary">${personalInfo.summary}</p>
            </div>
          ` : ''}
          
          ${experience.some(e => e.company) ? `
            <div class="section">
              <div class="section-title">Experience</div>
              ${experienceHTML}
            </div>
          ` : ''}
          
          ${education.some(e => e.institution) ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${educationHTML}
            </div>
          ` : ''}
          
          ${skills.some(s => s.name) ? `
            <div class="section">
              <div class="section-title">Skills</div>
              <div class="skills-grid">${skillsHTML}</div>
            </div>
          ` : ''}
          
          ${achievements.some(a => a) ? `
            <div class="section">
              <div class="section-title">Achievements</div>
              <ul class="achievements-list">${achievementsHTML}</ul>
            </div>
          ` : ''}
          
          ${hobbies.some(h => h) ? `
            <div class="section">
              <div class="section-title">Interests</div>
              <ul class="hobbies-list">${hobbiesHTML}</ul>
            </div>
          ` : ''}
          
          ${references.some(r => r.name) ? `
            <div class="section">
              <div class="section-title">References</div>
              ${referencesHTML}
            </div>
          ` : ''}
        </div>
      `;
    }

    // Classic and Executive templates share similar structure
    return `
      <div class="header">
        <div class="name">${personalInfo.fullName}</div>
        ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
        <div class="contact">
          ${personalInfo.email ? `<span class="contact-item">📧 ${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span class="contact-item">📱 ${personalInfo.phone}</span>` : ''}
          ${personalInfo.address ? `<span class="contact-item">📍 ${personalInfo.address}</span>` : ''}
          ${personalInfo.linkedin ? `<span class="contact-item">💼 ${personalInfo.linkedin}</span>` : ''}
          ${personalInfo.website ? `<span class="contact-item">🌐 ${personalInfo.website}</span>` : ''}
        </div>
      </div>

      ${personalInfo.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p class="summary">${personalInfo.summary}</p>
        </div>
      ` : ''}

      ${education.some(e => e.institution) ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${educationHTML}
        </div>
      ` : ''}

      ${experience.some(e => e.company) ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${experienceHTML}
        </div>
      ` : ''}

      ${skills.some(s => s.name) ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-grid">${skillsHTML}</div>
        </div>
      ` : ''}

      ${achievements.some(a => a) ? `
        <div class="section">
          <div class="section-title">Achievements & Awards</div>
          <ul class="achievements-list">${achievementsHTML}</ul>
        </div>
      ` : ''}

      ${hobbies.some(h => h) ? `
        <div class="section">
          <div class="section-title">Hobbies & Interests</div>
          <ul class="hobbies-list">${hobbiesHTML}</ul>
        </div>
      ` : ''}

      ${references.some(r => r.name) ? `
        <div class="section">
          <div class="section-title">References</div>
          ${referencesHTML}
        </div>
      ` : ''}
    `;
  };

  const handleDownload = () => {
    if (!personalInfo.fullName) {
      toast.error("Please enter your full name before downloading");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow popups to download your CV");
      return;
    }

    const cvHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${personalInfo.fullName} - CV</title>
        <style>${getTemplateStyles(selectedTemplate)}</style>
      </head>
      <body>
        ${generateCVContent(selectedTemplate)}
      </body>
      </html>
    `;

    printWindow.document.write(cvHTML);
    printWindow.document.close();
    printWindow.print();
    toast.success("CV ready for download! Use 'Save as PDF' in the print dialog.");
  };

  return (
    <div className="min-h-screen">
      <HeroSlideshow
        title="CV/Resume Builder"
        subtitle="Create a professional CV to kickstart your career"
      />

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Build Your Professional CV</h2>
              <p className="text-lg text-muted-foreground">
                Whether you're a student applying for your first job or an alumni updating your career profile, 
                our CV builder helps you create a polished, professional resume that stands out.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Template Selector */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Layout className="h-6 w-6 text-primary" />
                Choose Your Template
              </h3>
              <p className="text-muted-foreground mb-6">Select a professional design that best represents your style</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedTemplate === template.id 
                        ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {/* Template Preview */}
                    <div className={`aspect-[3/4] ${template.preview} p-3`}>
                      <div className="h-full bg-white/90 rounded-lg shadow-sm p-2 flex flex-col">
                        {/* Mini header */}
                        <div className={`h-6 rounded mb-2 ${
                          template.id === 'classic' ? 'bg-[#800020]' :
                          template.id === 'modern' ? 'bg-[#1e3a5f]' :
                          template.id === 'executive' ? 'bg-[#b8860b]' :
                          'bg-gradient-to-r from-[#667eea] to-[#764ba2]'
                        }`} />
                        {/* Mini content lines */}
                        <div className="space-y-1.5 flex-1">
                          <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                          <div className="h-1.5 bg-gray-200 rounded w-full" />
                          <div className="h-1.5 bg-gray-200 rounded w-5/6" />
                          <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                          <div className="mt-2 h-1 bg-gray-300 rounded w-1/2" />
                          <div className="h-1.5 bg-gray-200 rounded w-full" />
                          <div className="h-1.5 bg-gray-200 rounded w-4/5" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Selected indicator */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                    
                    {/* Template info */}
                    <div className="p-3 bg-background">
                      <h4 className="font-semibold text-foreground">{template.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CV Builder Form */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden md:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden md:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span className="hidden md:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span className="hidden md:inline">Awards</span>
                </TabsTrigger>
                <TabsTrigger value="hobbies" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="hidden md:inline">Hobbies</span>
                </TabsTrigger>
                <TabsTrigger value="references" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">References</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <StaggeredContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            placeholder="e.g., John Mwangi Kamau"
                            value={personalInfo.fullName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            placeholder="e.g., Software Developer, Teacher, Accountant"
                            value={personalInfo.title}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" /> Phone
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+254 700 000 000"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> Address
                        </Label>
                        <Input
                          id="address"
                          placeholder="City, County, Kenya"
                          value={personalInfo.address}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" /> LinkedIn Profile
                          </Label>
                          <Input
                            id="linkedin"
                            placeholder="linkedin.com/in/yourname"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" /> Personal Website
                          </Label>
                          <Input
                            id="website"
                            placeholder="yourwebsite.com"
                            value={personalInfo.website}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          placeholder="Write a brief summary about yourself, your goals, and what you bring to the table..."
                          rows={4}
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </StaggeredContainer>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Education History
                      </span>
                      <Button onClick={addEducation} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Education
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
                        {education.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-destructive"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution Name</Label>
                            <Input
                              placeholder="e.g., Kianjokoma Secondary School"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree/Certificate</Label>
                            <Input
                              placeholder="e.g., KCSE, Bachelor's Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="e.g., Computer Science, Business"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Grade/GPA</Label>
                            <Input
                              placeholder="e.g., A-, B+, 3.5 GPA"
                              value={edu.grade}
                              onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Year</Label>
                            <Input
                              placeholder="e.g., 2018"
                              value={edu.startYear}
                              onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Year</Label>
                            <Input
                              placeholder="e.g., 2022 or Present"
                              value={edu.endYear}
                              onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Work Experience
                      </span>
                      <Button onClick={addExperience} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Experience
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
                        {experience.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-destructive"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company/Organization</Label>
                            <Input
                              placeholder="e.g., Kenya Power, Safaricom"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Position/Role</Label>
                            <Input
                              placeholder="e.g., Software Developer, Teacher"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              placeholder="e.g., January 2020"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              placeholder="e.g., December 2023 or Present"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Job Description</Label>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Skills
                      </span>
                      <Button onClick={addSkill} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Skill
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <Input
                            placeholder="e.g., Microsoft Office, Python, Leadership"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          />
                        </div>
                        <select
                          className="px-3 py-2 border rounded-md bg-background"
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        {skills.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Achievements & Awards
                      </span>
                      <Button onClick={addAchievement} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Achievement
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                          <Input
                            placeholder="e.g., Best Student Award 2023, KCSE Top Performer"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                          />
                        </div>
                        {achievements.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeAchievement(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hobbies */}
              <TabsContent value="hobbies">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        Hobbies & Interests
                      </span>
                      <Button onClick={addHobby} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Hobby
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                          <Input
                            placeholder="e.g., Football, Reading, Music, Coding"
                            value={hobby}
                            onChange={(e) => updateHobby(index, e.target.value)}
                          />
                        </div>
                        {hobbies.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeHobby(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* References */}
              <TabsContent value="references">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        References
                      </span>
                      <Button onClick={addReference} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Reference
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {references.map((ref) => (
                      <div key={ref.id} className="p-4 border rounded-lg space-y-4 relative">
                        {references.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-destructive"
                            onClick={() => removeReference(ref.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                              placeholder="e.g., Dr. Jane Wanjiku"
                              value={ref.name}
                              onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Title/Position</Label>
                            <Input
                              placeholder="e.g., Principal, Manager"
                              value={ref.title}
                              onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Organization</Label>
                          <Input
                            placeholder="e.g., Kianjokoma Secondary School"
                            value={ref.organization}
                            onChange={(e) => updateReference(ref.id, 'organization', e.target.value)}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input
                              placeholder="+254 700 000 000"
                              value={ref.phone}
                              onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              placeholder="reference@email.com"
                              value={ref.email}
                              onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Download Button */}
            <div className="mt-8 flex justify-center">
              <Button onClick={handleDownload} size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download CV as PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">CV Writing Tips</h2>
              <StaggeredContainer className="grid md:grid-cols-2 gap-6">
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">✅ Do's</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Keep it concise (1-2 pages maximum)</li>
                        <li>• Use action verbs (Led, Developed, Managed)</li>
                        <li>• Quantify achievements with numbers</li>
                        <li>• Tailor your CV for each job application</li>
                        <li>• Proofread for spelling and grammar</li>
                        <li>• Include relevant keywords from job descriptions</li>
                      </ul>
                    </CardContent>
                  </Card>
                </StaggeredItem>
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">❌ Don'ts</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Don't include false information</li>
                        <li>• Avoid personal pronouns (I, me, my)</li>
                        <li>• Don't use unprofessional email addresses</li>
                        <li>• Skip irrelevant work experience</li>
                        <li>• Don't include salary expectations</li>
                        <li>• Avoid generic objective statements</li>
                      </ul>
                    </CardContent>
                  </Card>
                </StaggeredItem>
              </StaggeredContainer>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CVBuilder;
