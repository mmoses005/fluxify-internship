import { useState } from 'react';
import './App.css';

// Sub-component: Avatar
const Avatar = ({ image, name }) => {
  return (
    <div className="avatar">
      <img src={image} alt={`${name}'s avatar`} />
    </div>
  );
};

// Sub-component: Bio
const Bio = ({ bio }) => {
  return (
    <div className="bio">
      <p>{bio}</p>
    </div>
  );
};

// Sub-component: Badge (conditional rendering)
const Badge = ({ available }) => {
  return (
    <>
      {available && (
        <span className="badge available">
          ✅ Available for hire
        </span>
      )}
    </>
  );
};

// Main ProfileCard component
const ProfileCard = ({ name, role, bio, avatar, available }) => {
  return (
    <div className="profile-card">
      <Avatar image={avatar} name={name} />
      <div className="info">
        <h2>{name}</h2>
        <h3>{role}</h3>
        <Bio bio={bio} />
        <Badge available={available} />
      </div>
    </div>
  );
};

// Task 2: SkillsList component with .map() and conditional rendering
const SkillsList = ({ skills }) => {
  return (
    <div className="skills-list">
      <h3>📚 Skills & Tools</h3>
      
      {/* Conditional rendering: No items found message */}
      {skills.length === 0 ? (
        <p className="empty-message">⚠️ No items found</p>
      ) : (
        <ul>
          {skills.map((skill, index) => (
            /* 
              React iba ikenera unique keys kugirango ibone neza ibintu byahinduwe, 
              byongeweho, cyangwa byakuvweho. Ibi bifasha React kugira ngo itange 
              performance nziza ikirinda guhindura ibintu bitahindutse muri DOM.
            */
            <li key={index}>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// App component - contains everything
function App() {
  // Data for 3 different profile cards
  const profiles = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      bio: 'Passionate about creating beautiful and responsive web applications with 7+ years of experience.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      available: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      bio: 'Building scalable applications with React, Node.js, and cloud technologies.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      available: false
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UI/UX Developer',
      bio: 'Bridging the gap between design and development with accessible components.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      available: true
    }
  ];

  // Data for skills list (Task 2)
  const skills = ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git', 'Node.js'];
  
  // Example of empty skills array to test "No items found" message
  const emptySkills = [];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 Developer Profiles</h1>
        <p>Meet our talented team of developers</p>
      </header>

      {/* Task 1: Profile Cards Section */}
      <section className="profiles-section">
        <h2>👥 Team Members</h2>
        <div className="profile-container">
          {profiles.map(profile => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              role={profile.role}
              bio={profile.bio}
              avatar={profile.avatar}
              available={profile.available}
            />
          ))}
        </div>
      </section>

      {/* Task 2: Skills List Section - with data */}
      <section className="skills-section">
        <h2>🛠️ Technical Skills</h2>
        <SkillsList skills={skills} />
      </section>

      {/* Task 2: Example with empty list to show "No items found" */}
      <section className="skills-section">
        <h2>📋 Pending Skills (Empty List Demo)</h2>
        <SkillsList skills={emptySkills} />
      </section>
    </div>
  );
}

export default App;