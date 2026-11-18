'use client';
import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async ({ tag = '', industry = '' } = {}) => {
    setLoading(true);
    setError(null);
    try {
      let url = 'http://localhost:5000/api/jobs?count=20';
      if (tag) url += `&tag=${tag}`;
      if (industry) url += `&industry=${industry}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError('Could not load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#00c896', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Find Remote Jobs
        </h1>
        <p style={{ color: '#aaa' }}>Browse the latest remote opportunities worldwide</p>
      </div>

      <SearchBar onSearch={fetchJobs} />

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#00c896' }}>
          <p style={{ fontSize: '1.2rem' }}>Loading jobs...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b6b' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
          <p>No jobs found. Try a different search.</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1rem',
      }}>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
