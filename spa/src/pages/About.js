import React from 'react';

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a fictional company created for this demo React SPA application.</p>
      <p>Our mission is to provide great products at affordable prices.</p>
      <div style={{ marginTop: '20px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
          nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl 
          nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl 
          aliquam nisl, eget aliquam nisl nisl eget nisl.
        </p>
        <p style={{ marginTop: '10px' }}>
          Founded in 2023, we've been serving customers with excellence ever since.
        </p>
      </div>
    </div>
  );
}

export default About;
