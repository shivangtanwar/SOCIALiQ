const express = require('express');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS, JS)
app.use(express.static('public'));

// Sample route to render the landing page with dynamic data
app.get('/', (req, res) => {
    res.render('landing-page', {
        title: 'Welcome to SOCIALiQ',
        navbarBrand: 'SOCIALiQ',
        navHome: 'Home',
        navAbout: 'About Us',
        navServices: 'Services',
        navContact: 'Contact',
        heroTitle: 'Connecting People, Empowering Ideas',
        heroDescription: 'SOCIALiQ is the platform that bridges the gap between innovation and community.',
        ctaLink: '/sign-up',
        ctaText: 'Get Started',
        featuresTitle: 'Our Features',
        feature1Title: 'Smart Analytics',
        feature1Description: 'Track your data insights with ease.',
        feature1Image: 'feature1.jpg',
        feature2Title: 'Real-Time Reports',
        feature2Description: 'Access real-time reports to make quicker decisions.',
        feature2Image: 'feature2.jpg',
        feature3Title: 'Customizable Dashboard',
        feature3Description: 'Personalize your dashboard for a better experience.',
        feature3Image: 'feature3.jpg',
        testimonialsTitle: 'What Our Users Say',
        testimonial1Quote: 'SOCIALiQ transformed our operations.',
        testimonial1Author: 'Jane Doe, CEO of DataCorp',
        testimonial2Quote: 'The best platform for social data analysis.',
        testimonial2Author: 'John Smith, Founder of TechStart',
        contactTitle: 'Contact Us',
        namePlaceholder: 'Your Name',
        emailPlaceholder: 'Your Email',
        messagePlaceholder: 'Your Message',
        submitButtonText: 'Send Message',
        currentYear: new Date().getFullYear(),
        footerText: 'SOCIALiQ - All Rights Reserved'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
