// Enhanced Tutorials System with Multi-level Access
const tutorialsData = {
    freeTutorials: [
        {
            id: 1,
            title: "Basic PC Troubleshooting Guide",
            description: "Learn to fix common computer issues like slow performance, startup problems, and basic hardware diagnostics.",
            duration: "15 min",
            level: "Beginner",
            category: "Hardware",
            videoUrl: "#"
        },
        {
            id: 2,
            title: "Laptop Maintenance & Cleaning",
            description: "Proper cleaning techniques and maintenance routines to extend your laptop's lifespan and performance.",
            duration: "12 min",
            level: "Beginner",
            category: "Maintenance",
            videoUrl: "#"
        },
        {
            id: 3,
            title: "Windows 11 Optimization",
            description: "Speed up your Windows 11 with these optimization techniques and performance tweaks.",
            duration: "20 min",
            level: "Intermediate",
            category: "Software",
            videoUrl: "#"
        },
        {
            id: 4,
            title: "Virus Removal & Protection",
            description: "Complete guide to removing viruses, malware, and protecting your system from future threats.",
            duration: "18 min",
            level: "Intermediate",
            category: "Security",
            videoUrl: "#"
        },
        {
            id: 5,
            title: "Data Backup Strategies",
            description: "Learn how to properly backup your important data and files using various methods and tools.",
            duration: "25 min",
            level: "Beginner",
            category: "Data Management",
            videoUrl: "#"
        },
        {
            id: 6,
            title: "SSD Installation Guide",
            description: "Step-by-step tutorial on installing and configuring SSDs for better performance.",
            duration: "22 min",
            level: "Intermediate",
            category: "Hardware",
            videoUrl: "#"
        },
        {
            id: 7,
            title: "Router Setup & Security",
            description: "Secure your home network properly with correct router configuration and security settings.",
            duration: "16 min",
            level: "Beginner",
            category: "Networking",
            videoUrl: "#"
        }
    ],

    professionalCourses: [
        {
            id: 101,
            title: "PC Hardware Fundamentals",
            icon: "💻",
            level: "Beginner",
            description: "Comprehensive course covering computer components, assembly, and basic troubleshooting.",
            duration: "6 weeks",
            price: 75000,
            coursePassword: "pc2024fund",
            features: [
                "Computer components identification",
                "Step-by-step assembly guide",
                "Basic troubleshooting techniques",
                "Hardware maintenance best practices",
                "Certificate of completion"
            ],
            modules: [
                { id: 1, title: "Introduction to PC Hardware", duration: "1h 15m", completed: false },
                { id: 2, title: "Motherboards and Processors", duration: "1h 30m", completed: false },
                { id: 3, title: "Memory and Storage", duration: "1h 20m", completed: false },
                { id: 4, title: "Power Supply and Cooling", duration: "1h 10m", completed: false },
                { id: 5, title: "PC Assembly Practical", duration: "2h 00m", completed: false }
            ]
        },
        {
            id: 102,
            title: "Advanced PC Repair",
            icon: "🔧",
            level: "Intermediate",
            description: "Advanced troubleshooting, component-level repair, and diagnostic techniques for professionals.",
            duration: "8 weeks",
            price: 120000,
            coursePassword: "advpc2024",
            features: [
                "Advanced diagnostic procedures",
                "Component-level repair techniques",
                "Power supply and motherboard repair",
                "Data recovery methods",
                "Professional certification"
            ],
            modules: [
                { id: 1, title: "Advanced Diagnostics", duration: "1h 45m", completed: false },
                { id: 2, title: "Power Supply Systems", duration: "1h 30m", completed: false },
                { id: 3, title: "Motherboard Repair", duration: "2h 00m", completed: false },
                { id: 4, title: "Data Recovery Techniques", duration: "1h 50m", completed: false }
            ]
        },
        {
            id: 103,
            title: "Laptop Repair Specialist",
            icon: "📱",
            level: "Intermediate",
            description: "Specialized training in laptop disassembly, repair, and component replacement.",
            duration: "10 weeks",
            price: 150000,
            coursePassword: "laptop2024",
            features: [
                "Laptop disassembly techniques",
                "Screen and keyboard replacement",
                "Motherboard troubleshooting",
                "Battery and power management",
                "Specialist certification"
            ],
            modules: [
                { id: 1, title: "Laptop Disassembly", duration: "1h 30m", completed: false },
                { id: 2, title: "Screen Replacement", duration: "1h 45m", completed: false },
                { id: 3, title: "Keyboard and Touchpad", duration: "1h 20m", completed: false },
                { id: 4, title: "Motherboard Diagnostics", duration: "2h 15m", completed: false }
            ]
        }
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    checkUserAccess();
    setupEventListeners();
    updateCartCount();
});

function checkUserAccess() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        // If somehow user got here without login, redirect to login
        window.location.href = 'tutorials-login.html';
        return;
    }
    
    // User is logged in, load content
    loadUserContent();
}

function loadUserContent() {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('user-name').textContent = user.name || user.fname || 'User';
    
    // Load free tutorials
    loadFreeTutorials();
    
    // Check if user has enrolled courses
    checkEnrolledCourses();
}

function loadFreeTutorials() {
    const tutorialsGrid = document.getElementById('free-tutorials-grid');
    
    tutorialsGrid.innerHTML = tutorialsData.freeTutorials.map(tutorial => `
        <div class="tutorial-card">
            <div class="tutorial-thumbnail">
                <div class="play-icon">▶</div>
                <div class="tutorial-badge">FREE</div>
            </div>
            <div class="tutorial-content">
                <h3>${tutorial.title}</h3>
                <p>${tutorial.description}</p>
                <div class="tutorial-meta">
                    <span>⏱️ ${tutorial.duration}</span>
                    <span>📊 ${tutorial.level}</span>
                    <span>🏷️ ${tutorial.category}</span>
                </div>
                <div class="tutorial-actions">
                    <button class="btn btn-primary" onclick="watchTutorial(${tutorial.id})">Watch Now</button>
                    <button class="btn btn-outline" onclick="shareTutorial(${tutorial.id})">Share</button>
                </div>
            </div>
        </div>
    `).join('');
}

function checkEnrolledCourses() {
    const user = JSON.parse(localStorage.getItem('user'));
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    const userEnrollments = enrollments.filter(e => e.userEmail === user.email && e.status === 'approved');
    
    const fullCoursesSection = document.getElementById('full-courses-section');
    const coursesAccessGrid = document.getElementById('courses-access-grid');
    
    if (userEnrollments.length > 0) {
        // User has enrolled courses
        fullCoursesSection.style.display = 'block';
        
        coursesAccessGrid.innerHTML = userEnrollments.map(enrollment => {
            const course = tutorialsData.professionalCourses.find(c => c.id === enrollment.courseId);
            return `
                <div class="course-access-card">
                    <div class="course-access-header">
                        <div class="course-icon">${course.icon}</div>
                        <h4>${course.title}</h4>
                        <span class="access-badge">✅ Approved</span>
                    </div>
                    <div class="course-access-content">
                        <p>${course.description}</p>
                        <div class="course-progress">
                            <span>Progress: 25%</span>
                            <div class="progress-bar-small">
                                <div class="progress-fill" style="width: 25%"></div>
                            </div>
                        </div>
                        <div class="course-access-actions">
                            <button class="btn btn-primary" onclick="accessFullCourse(${course.id})">
                                Continue Learning
                            </button>
                            <button class="btn btn-outline" onclick="viewCourseMaterials(${course.id})">
                                Course Materials
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function showEnrollmentOptions() {
    const modal = document.getElementById('enrollment-modal');
    const coursesOptions = document.getElementById('courses-options');
    
    coursesOptions.innerHTML = tutorialsData.professionalCourses.map(course => `
        <div class="course-option-card">
            <div class="course-option-header">
                <div class="course-icon">${course.icon}</div>
                <h4>${course.title}</h4>
                <span class="course-level">${course.level}</span>
            </div>
            <div class="course-option-content">
                <p>${course.description}</p>
                <div class="course-features-mini">
                    ${course.features.slice(0, 3).map(feature => `<span>✓ ${feature}</span>`).join('')}
                </div>
                <div class="course-pricing-mini">
                    <div class="price">MWK ${course.price.toLocaleString()}</div>
                    <div class="duration">${course.duration}</div>
                </div>
                <button class="btn btn-primary" onclick="startEnrollment(${course.id})">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
    
    modal.style.display = 'block';
}

function startEnrollment(courseId) {
    const course = tutorialsData.professionalCourses.find(c => c.id === courseId);
    
    // Close enrollment options modal
    document.getElementById('enrollment-modal').style.display = 'none';
    
    // Redirect to enrollment process (you can use the previous enrollment modal system here)
    // For now, let's simulate direct enrollment for demo
    simulateEnrollment(course);
}

function simulateEnrollment(course) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Create enrollment record
    const enrollment = {
        courseId: course.id,
        courseTitle: course.title,
        userEmail: user.email,
        userName: user.name || user.fname,
        enrollmentDate: new Date().toISOString(),
        status: 'approved', // For demo, auto-approve
        amount: course.price,
        coursePassword: course.coursePassword
    };
    
    // Save enrollment
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    enrollments.push(enrollment);
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
    
    showNotification(`🎉 Successfully enrolled in ${course.title}! You can now access the full course.`);
    
    // Reload to show enrolled courses
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function accessFullCourse(courseId) {
    // Redirect to full course page with course context
    window.location.href = `full-course.html?course=${courseId}`;
}

function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

function watchTutorial(tutorialId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('Please login to watch tutorials');
        window.location.href = 'tutorials-login.html';
        return;
    }
    
    const tutorial = tutorialsData.freeTutorials.find(t => t.id === tutorialId);
    if (tutorial) {
        showNotification(`Starting tutorial: ${tutorial.title}`);
        // In a real app, this would open the video player
        // window.open(tutorial.videoUrl, '_blank');
    }
}

function shareTutorial(tutorialId) {
    const tutorial = tutorialsData.freeTutorials.find(t => t.id === tutorialId);
    if (tutorial && navigator.share) {
        navigator.share({
            title: tutorial.title,
            text: tutorial.description,
            url: window.location.href
        });
    } else {
        alert('Share feature not available in this browser');
    }
}

function viewCourseMaterials(courseId) {
    const course = tutorialsData.professionalCourses.find(c => c.id === courseId);
    if (course) {
        showNotification(`Opening materials for: ${course.title}`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}