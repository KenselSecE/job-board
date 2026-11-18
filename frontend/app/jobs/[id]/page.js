'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function JobDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const found = data.jobs.find(j => String(j.id) === String(id));
        if (!found) throw new Error('Job not found');
        setJob(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#00c896' }}>
      <p style={{ fontSize: '1.2rem' }}>Loading job details...</p>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#ff6b6b' }}>
      <p>{error}</p>
      <button onClick={() => router.push('/')} style={backBtnStyle}>← Back to Jobs</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={backBtnStyle}>← Back</button>

      <div style={{
        backgroundColor: '#1b2f3e',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid #2a4a5e',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={job.companyName}
              style={{ width: '60px', height: '60px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '8px', padding: '4px' }}
            />
          )}
          <div>
            <h1 style={{ color: '#00c896', fontSize: '1.5rem', marginBottom: '0.3rem' }}>{job.jobTitle}</h1>
            <p style={{ color: '#aaa', fontSize: '1rem' }}>{job.companyName}</p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={tagStyle}>{job.jobType}</span>
          <span style={tagStyle}>{job.jobGeo}</span>
          <span style={tagStyle}>{job.jobLevel}</span>
          {job.jobIndustry && <span style={tagStyle}>{job.jobIndustry}</span>}
        </div>

        {/* Salary */}
        {job.salaryMin && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#00c896', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()} {job.salaryCurrency} / {job.salaryPeriod}
            </p>
          </div>
        )}

        {/* Divider */}
        <hr style={{ borderColor: '#2a4a5e', marginBottom: '1.5rem' }} />

        {/* Description */}
        <div
          style={{ color: '#ccc', lineHeight: '1.7', fontSize: '0.95rem' }}
          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
        />

        {/* Apply Button */}
        <div style={{ marginTop: '2rem' }}>
          
            href={job.url} <a
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#00c896',
              color: '#0f1923',
              padding: '0.8rem 2rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'inline-block',
            }}
          >
            Apply on Jobicy
          </a>
        </div>
      </div>
    </div>
  );
}

const backBtnStyle = {
  backgroundColor: 'transparent',
  color: '#00c896',
  border: '1px solid #00c896',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  marginBottom: '1.5rem',
  fontSize: '0.9rem',
};

const tagStyle = {
  backgroundColor: '#0f1923',
  color: '#00c896',
  padding: '0.2rem 0.6rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  border: '1px solid #00c896',
};
