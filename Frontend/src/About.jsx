import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Weirdest Foods</h1>
      <p style={styles.tagline}>
        Exploring the world's most bizarre and fascinating dishes
      </p>

      <section style={styles.section}>
        <h2>🌍 Our Mission</h2>
        <p>
          We aim to explore the unusual and unexpected side of global cuisine. From century eggs in China to Sardinia’s infamous Casu Marzu, we celebrate the strange, the fermented, and the fearsome — not to shock, but to spark curiosity and cultural understanding.
        </p>
      </section>

      <section style={styles.section}>
        <h2>🍽️ Why We Exist</h2>
        <p>
          Food is more than sustenance — it’s storytelling. Every weird dish has a history, a ritual, and a reason. We believe that by exploring these foods, we gain insight into the people and traditions that created them.
        </p>
      </section>

      <section style={styles.section}>
        <h2>🧠 What You’ll Find</h2>
        <ul>
          <li>Curated profiles of the world’s strangest dishes</li>
          <li>Cultural context and historical background</li>
          <li>Visual galleries to see the foods up close</li>
          <li>User reactions and community ratings</li>
          <li>“Would You Try It?” polls to engage your taste buds</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>👋 Who We Are</h2>
        <p>
          We’re a small team of food explorers, designers, and storytellers based in India, driven by a love for culinary oddities and digital creativity. Our goal is to make the weird wonderful — and maybe even appetizing.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'black',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  tagline: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
};

export default AboutPage;
