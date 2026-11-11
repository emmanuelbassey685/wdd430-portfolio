CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('opensource', 'school')),
  technologies TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  link VARCHAR(500)
);

INSERT INTO projects (title, description, type, technologies, link)
VALUES
  (
    'Kizuna Rail',
    'A railway booking application that lets users explore train services and manage travel bookings.',
    'school',
    ARRAY['JavaScript', 'Node.js', 'Express', 'EJS', 'MongoDB'],
    'https://github.com/24on7store/cse341-team7-project'
  ),
  (
    'Ocean Wave Development',
    'A corporate website presenting marine, offshore, engineering, procurement, and project management services.',
    'school',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Vite'],
    'https://github.com/emmanuelbassey685/Ocean-Wave-Development-Company-Nigeria-Limited'
  )
ON CONFLICT (title) DO NOTHING;
