import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#18181b',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  lineHeight: '1.8',
  color: '#a1a1aa'
};

const detail = { 
  color: '#f97316', 
  marginTop: '25px', 
  marginBottom: '10px' 
}

const title = { 
  color: '#fff',
   marginBottom: '20px', 
   borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '15px' 
  }

const margin = { 
  marginBottom: '20px' 
}

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2 style={title}>
        Legal & Site Disclaimer
      </h2>
      
      <p style={margin}>
        The data, interfaces, and graphical components represented across the FlyCart domain strictly act uniquely as an educational development platform. This codebase models rigorous application structures and architectures for purely demonstrative, portfolio-oriented engineering usage.
      </p>

      <h4 style={detail}>1. Accuracy of Materials</h4>
      <p style={{margin}}>
        The materials spanning the FlyCart interface may heavily include dynamic technical, typographical, or dummy photographic elements. Product matrices mapped in the DB pipeline do absolutely not correlate to strictly real physical outputs and are safely populated via generic Unsplash imagery protocols.
      </p>

      <h4 style={detail}>2. Payment Processing Restrictions</h4>
      <p style={margin}>
        No authentic financial variables are handled natively within this environment. All payment endpoints forcefully bind exclusively to external testing-based networks (Sandbox Razorpay environments). No exact deductibles exist.
      </p>

      <h4 style={detail}>3. External Binding Links</h4>
      <p style={margin}>
        FlyCart operates completely independent domains and takes strictly zero absolute parameter responsibility over the specific contents or behaviors populated via external routing anchors generated implicitly by third-party configurations. 
      </p>
    </div>
  );
};

export default Disclaimer;