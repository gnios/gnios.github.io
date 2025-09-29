import React from 'react'
import resumeData from '@/data/resume.json'

export default function ResumeHTML({ className = '' }) {
  return (
    <div className={`resume-html ${className}`}>
      {/* Header */}
      <div className="resume-header">
        <div className="resume-header-content">
          <div className="resume-header-left">
            <h1 className="resume-name">{resumeData.basics.name}</h1>
            <h2 className="resume-title">{resumeData.basics.label}</h2>
            <div className="resume-contact">
              <p>{resumeData.basics.email}</p>
              <p>
                {resumeData.basics.location.city}, {resumeData.basics.location.countryCode}
              </p>
            </div>
          </div>
          <div className="resume-header-right">
            {resumeData.basics.profiles.map((profile, index) => (
              <p key={index} className="resume-profile">
                <strong>{profile.network}:</strong> {profile.username}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="resume-section">
        <h3 className="resume-section-title">Resumo Profissional</h3>
        <p className="resume-summary">{resumeData.basics.summary}</p>
      </div>

      {/* Two Column Layout */}
      <div className="resume-two-column">
        {/* Left Column */}
        <div className="resume-left-column">
          {/* Experience */}
          <div className="resume-section">
            <h3 className="resume-section-title">Experiência Profissional</h3>
            {resumeData.work.map((job, index) => (
              <div key={index} className="resume-job">
                <div className="resume-job-header">
                  <div>
                    <h4 className="resume-job-title">{job.position}</h4>
                    <h5 className="resume-job-company">{job.name}</h5>
                  </div>
                  <span className="resume-job-date">
                    {new Date(job.startDate).getFullYear()} -{' '}
                    {job.endDate ? new Date(job.endDate).getFullYear() : 'Presente'}
                  </span>
                </div>
                <p className="resume-job-description">{job.summary}</p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="resume-job-highlights">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="resume-section">
            <h3 className="resume-section-title">Educação</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="resume-education">
                <div className="resume-education-header">
                  <div>
                    <h4 className="resume-education-degree">{edu.area}</h4>
                    <h5 className="resume-education-institution">{edu.institution}</h5>
                  </div>
                  <span className="resume-education-date">
                    {new Date(edu.startDate).getFullYear()} -{' '}
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Presente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="resume-right-column">
          {/* Skills */}
          <div className="resume-section">
            <h3 className="resume-section-title">Habilidades</h3>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="resume-skill-category">
                <h4 className="resume-skill-category-name">{skill.name}</h4>
                <div className="resume-skills-container">
                  {skill.keywords.map((keyword, keywordIndex) => (
                    <span key={keywordIndex} className="resume-skill-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="resume-section">
            <h3 className="resume-section-title">Idiomas</h3>
            {resumeData.languages.map((language, index) => (
              <div key={index} className="resume-language">
                <span className="resume-language-name">{language.language}</span>
                <span className="resume-language-level">{language.fluency}</span>
              </div>
            ))}
          </div>

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="resume-section">
              <h3 className="resume-section-title">Projetos</h3>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="resume-project">
                  <h4 className="resume-project-name">{project.name}</h4>
                  <p className="resume-project-description">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
