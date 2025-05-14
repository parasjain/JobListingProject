// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-top button functionality
window.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.id = 'back-to-top';
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.padding = '10px';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '5px';
    backToTopButton.style.backgroundColor = '#007BFF';
    backToTopButton.style.color = 'white';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});

// Form validation example
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.border = '2px solid red';
            } else {
                input.style.border = '';
            }
        });
        if (!isValid) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });
});

// Job search and filtering system using plain JavaScript
window.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function () {
            const query = searchBar.value.toLowerCase();
            document.querySelectorAll('.job-card').forEach(function (card) {
                const jobTitle = card.querySelector('h2').textContent.toLowerCase();
                if (jobTitle.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Placeholder for user authentication (mockup)
const users = [];
function registerUser(username, password) {
    users.push({ username, password });
    alert('User registered successfully!');
}
function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login successful!');
    } else {
        alert('Invalid credentials!');
    }
}

// Header and Footer Templates
function injectHeaderFooter() {
    const headerHTML = `
        <header style="background:#007BFF;color:#fff;padding:1em 0;text-align:center;">
            <nav>
                <a href='index.html' style='color:#fff;margin:0 1em;'>Home</a>
                <a href='job-listings.html' style='color:#fff;margin:0 1em;'>Jobs</a>
                <a href='employer-dashboard.html' style='color:#fff;margin:0 1em;'>Employer Dashboard</a>
                <a href='job-seeker-dashboard.html' style='color:#fff;margin:0 1em;'>Job Seeker Dashboard</a>
                <a href='contact.html' style='color:#fff;margin:0 1em;'>Contact</a>
            </nav>
        </header>
    `;
    const footerHTML = `
        <footer style="background:#222;color:#fff;padding:1em 0;text-align:center;position:relative;bottom:0;width:100%;margin-top:2em;">
            &copy; 2025 Job Profile. All rights reserved.
        </footer>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Call on DOMContentLoaded
window.addEventListener('DOMContentLoaded', injectHeaderFooter);

// Example dynamic job data
const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote', description: 'Build modern UIs.' },
    { id: 2, title: 'Backend Developer', company: 'Data Corp', location: 'New York', description: 'Work on APIs and databases.' },
    { id: 3, title: 'Full Stack Engineer', company: 'Webify', location: 'San Francisco', description: 'End-to-end web solutions.' }
];

// Utility: Get all jobs (static + posted)
function getAllJobs() {
    const postedJobs = JSON.parse(localStorage.getItem('jobPostings')) || [];
    // Merge static jobs and posted jobs
    return [...jobs, ...postedJobs];
}

// Update: Dynamically render job listings from localStorage
function renderJobListings() {
    const listingsContainer = document.getElementById('job-listings');
    if (!listingsContainer) return;
    const allJobs = getAllJobs();
    if (allJobs.length === 0) {
        listingsContainer.innerHTML = '<p>No jobs available.</p>';
        return;
    }
    listingsContainer.innerHTML = allJobs.map((job, idx) => `
        <div class='job-card'>
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <button onclick="viewJobDetails(${idx}, 'job-listings')">View Details</button>
        </div>
    `).join('');
}

// Update: View job details by index from localStorage
function viewJobDetails(idx, source) {
    const allJobs = getAllJobs();
    const job = allJobs[idx];
    if (!job) return;
    localStorage.setItem('selectedJob', JSON.stringify(job));
    window.location.href = 'job-details.html';
}

// Employer Dashboard: Render jobs with checkboxes and delete options
function renderEmployerJobs() {
    const jobPostingsDiv = document.querySelector('.job-postings');
    if (!jobPostingsDiv) return;
    const postedJobs = JSON.parse(localStorage.getItem('jobPostings')) || [];
    if (postedJobs.length === 0) {
        jobPostingsDiv.innerHTML = '<h2>Your Job Postings</h2><p>No job postings yet.</p>';
        return;
    }
    jobPostingsDiv.innerHTML = `
        <h2>Your Job Postings</h2>
        <button id="delete-selected">Delete Selected</button>
        <button id="delete-all">Delete All</button>
        <div id="employer-job-list">
            ${postedJobs.map((job, idx) => `
                <div class="job-card">
                    <input type="checkbox" class="select-job" data-idx="${idx}">
                    <h2>${job.title}</h2>
                    <p>Company: ${job.company}</p>
                    <p>Location: ${job.location}</p>
                    <p>Type: ${job.type}</p>
                    <p>${job.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('delete-selected').onclick = function() {
        const checkboxes = document.querySelectorAll('.select-job:checked');
        const indices = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-idx')));
        const newJobs = postedJobs.filter((_, idx) => !indices.includes(idx));
        localStorage.setItem('jobPostings', JSON.stringify(newJobs));
        renderEmployerJobs();
        renderJobListings();
    };
    document.getElementById('delete-all').onclick = function() {
        localStorage.removeItem('jobPostings');
        renderEmployerJobs();
        renderJobListings();
    };
}

// Employer Dashboard: Handle job posting form
function setupEmployerDashboard() {
    const postJobButton = document.getElementById('post-job-btn');
    const jobPostingsDiv = document.querySelector('.job-postings');
    if (!postJobButton || !jobPostingsDiv) return;
    renderEmployerJobs();
    postJobButton.onclick = function() {
        const formHTML = `
            <form id="post-job-form">
                <label for="job-title">Job Title:</label>
                <input type="text" id="job-title" name="job-title" required>
                <label for="company-name">Company Name:</label>
                <input type="text" id="company-name" name="company-name" required>
                <label for="location">Location:</label>
                <input type="text" id="location" name="location" required>
                <label for="job-type">Job Type:</label>
                <select id="job-type" name="job-type" required>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                </select>
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
                <button type="submit">Submit</button>
            </form>
        `;
        jobPostingsDiv.innerHTML = formHTML;
        const form = document.getElementById('post-job-form');
        form.onsubmit = function(e) {
            e.preventDefault();
            const jobTitle = document.getElementById('job-title').value;
            const companyName = document.getElementById('company-name').value;
            const location = document.getElementById('location').value;
            const jobType = document.getElementById('job-type').value;
            const description = document.getElementById('description').value;
            const postedJobs = JSON.parse(localStorage.getItem('jobPostings')) || [];
            postedJobs.push({ title: jobTitle, company: companyName, location, type: jobType, description });
            localStorage.setItem('jobPostings', JSON.stringify(postedJobs));
            alert('Job posted successfully!');
            renderEmployerJobs();
            renderJobListings();
        };
    };
}

// Call dynamic renderers on relevant pages
window.addEventListener('DOMContentLoaded', function() {
    renderJobListings();
    setupEmployerDashboard();
});