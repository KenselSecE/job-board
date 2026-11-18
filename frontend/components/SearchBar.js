'use client';

export default function SearchBar({ onSearch }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Search by keyword..."
        id="keyword"
        style={inputStyle}
      />
      <select id="industry" style={inputStyle}>
        <option value="">All Industries</option>
        <option value="dev">Development</option>
        <option value="design-multimedia">Design</option>
        <option value="marketing">Marketing</option>
        <option value="data-science">Data Science</option>
        <option value="accounting-finance">Finance</option>
        <option value="hr">HR</option>
        <option value="supporting">Support</option>
      </select>
      <select id="jobType" style={inputStyle}>
        <option value="">All Types</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="freelance">Freelance</option>
      </select>
      <button
        onClick={() => {
          const tag = document.getElementById('keyword').value.trim();
          const industry = document.getElementById('industry').value;
          onSearch({ tag, industry });
        }}
        style={buttonStyle}
      >
        Search
      </button>
    </div>
  );
}

const inputStyle = {
  backgroundColor: '#1b2f3e',
  border: '1px solid #2a4a5e',
  borderRadius: '8px',
  color: '#e0e0e0',
  padding: '0.6rem 1rem',
  fontSize: '0.9rem',
  flex: '1',
  minWidth: '160px',
};

const buttonStyle = {
  backgroundColor: '#00c896',
  color: '#0f1923',
  border: 'none',
  borderRadius: '8px',
  padding: '0.6rem 1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '0.9rem',
};
