// Full Course Access System
let currentCourse = null;

document.addEventListener('DOMContentLoaded', function() {
    checkCourseAccess();
    setupCourseEventListeners();
});

function checkCourseAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('course'));
    
    const user = JSON.parse(localStorage.getItem('user'));
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    
    const enrollment = enrollments.find(e => 
        e.courseId === courseId && 
        e.userEmail === user.email && 
        e.status === 'approved'
    );
    
    if (enrollment) {
        // User has access, load course content
        currentCourse = tutorialsData.professionalCourses.find(c => c.id === courseId);
        showCourseContent();
    } else {
        // Show login prompt
        document.getElementById('course-login-prompt').style.display = 'block';
    }
}

function showCourseContent() {
    document.getElementById('course-login-prompt').style.display = 'none';
    document.getElementById('full-course-content').style.display = 'block';
    
    // Load course data
    document.getElementById('course-title').textContent = currentCourse.title;
    document.getElementById('course-description').textContent = currentCourse.description;
    
    loadCourseModules();
    loadCourseResources();
}

function loadCourseModules() {
    const modulesList = document.getElementById('modules-list');
    
    modulesList.innerHTML = currentCourse.modules.map(module => `
        <div class="module-item ${module.completed ? 'completed' : ''}" onclick="loadModule(${module.id})">
            <div class="module-status">${module.completed ? '✓' : '○'}</div>
            <div class="module-info">
                <h4>${module.title}</h4>
                <span>${module.duration}</span>
            </div>
        </div>
    `).join('');
}

function loadModule(moduleId) {
    const module = currentCourse.modules.find(m => m.id === moduleId);
    
    document.getElementById('video-placeholder').style.display = 'none';
    document.getElementById('video-content').style.display = 'block';
    
    document.getElementById('current-module-title').textContent = module.title;
    document.getElementById('video-duration').textContent = module.duration;
}

// Course login form handler
document.getElementById('course-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('course-email').value;
    const password = document.getElementById('course-password').value;
    
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    const enrollment = enrollments.find(e => 
        e.userEmail === email && 
        e.coursePassword === password
    );
    
    if (enrollment) {
        currentCourse = tutorialsData.professionalCourses.find(c => c.id === enrollment.courseId);
        showCourseContent();
        showNotification('✅ Course access granted!');
    } else {
        alert('Invalid course credentials. Please check your email and course password.');
    }
});