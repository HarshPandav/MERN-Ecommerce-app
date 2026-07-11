import React from "react";

const About = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0d0d0d",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },

    hero: {
      background: "linear-gradient(135deg, #000000, #1a1a1a)",
      textAlign: "center",
      padding: "80px 20px",
      borderBottom: "3px solid #ff6600",
    },

    heroTitle: {
      fontSize: "48px",
      marginBottom: "15px",
      color: "#ff6600",
    },

    heroText: {
      fontSize: "18px",
      color: "#cccccc",
      maxWidth: "650px",
      margin: "0 auto",
      lineHeight: "1.6",
    },

    section: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "70px 20px",
    },

    title: {
      textAlign: "center",
      fontSize: "34px",
      color: "#ff6600",
      marginBottom: "20px",
    },

    description: {
      textAlign: "center",
      fontSize: "17px",
      color: "#b3b3b3",
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "0 auto 50px",
    },

    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "25px",
    },

    mission: {
      backgroundColor: "#151515",
      textAlign: "center",
      padding: "60px 20px",
      borderTop: "2px solid #ff6600",
    },

    missionTitle: {
      color: "#ff6600",
      fontSize: "32px",
      marginBottom: "15px",
    },

    missionText: {
      color: "#bbbbbb",
      fontSize: "17px",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.7",
    },

    highlight: {
      color: "#ff6600",
    },
  };

  return (
    <div style={styles.container}>

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          About FlyCart
        </h1>

        <p style={styles.heroText}>
          Shop smarter. Shop faster. Experience quality products with
          <span style={styles.highlight}> FlyCart</span>.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.title}>Who We Are</h2>

        <p style={styles.description}>
          FlyCart is a modern eCommerce platform designed to make online
          shopping simple, fast, and reliable. We bring quality products,
          affordable prices, and a smooth shopping experience directly to
          our customers.
        </p>
      </section>

      <section style={styles.mission}>
        <h2 style={styles.missionTitle}>Our Mission</h2>

        <p style={styles.missionText}>
          Our mission is to build a trusted online shopping platform where
          customers can discover quality products, enjoy affordable prices,
          and shop with confidence.
        </p>
      </section>
    </div>
  );
};

export default About;