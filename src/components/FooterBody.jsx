import React from 'react';

const FooterBody = () => {
  const currentYear = new Date().getFullYear();

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
  };

  const columnStyle = {
    flex: 1,
    marginRight: '20px',
  };

  const sectionStyle = {
    margin: '5px 0',
    fontSize: '0.75rem',
  };

  const headingStyle = {
    margin: '5px 0',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  return (
    <footer style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      marginBottom:0,
      width: '100%',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex' }}>
        {/* First Div */}
        <div style={columnStyle}>
          <p style={headingStyle}>Get to know us</p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Frequently asked questions</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>About us</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Opportunities at Get to Style</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Press releases</a></p>
        </div>
        <div style={columnStyle}>
          <p style={headingStyle}>Make money with us</p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Join as a seller</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Protect your brand</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Sell under our brand</a></p>
        </div>
        <div style={columnStyle}>
          <p style={headingStyle}>Connect with us</p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Facebook</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Instagram</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Twitter</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Contact Us</a></p>
          <p style={sectionStyle}><a href="/" style={linkStyle}>Help and support</a></p>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <p style={{ ...sectionStyle, margin: '5px 20px' }}><a href="/" style={linkStyle}>Condition of use and sale</a></p>
          <p style={{ ...sectionStyle, margin: '5px 20px' }}><a href="/" style={linkStyle}>Privacy Notice</a></p>
          <p style={{ ...sectionStyle, margin: '5px 20px' }}><a href="/" style={linkStyle}>Internet based ads</a></p>
        </div>
        <p style={{ fontSize: '14px' }}>
          &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default FooterBody;
