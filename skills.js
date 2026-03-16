const skillsData = [
    { name: 'Java', level: 4 },
    { name: 'Spring Boot', level: 3 },
    { name: 'JavaScript', level: 4 },
    { name: 'HTML/CSS', level: 3 },
    { name: 'Database (SQL)', level: 5 },
    { name: 'Non-relational databases', level: 4},
    { name: 'Git', level: 5},
    { name: 'Python', level: 2},
    { name: 'Dart', level: 5},
    { name: '.NET', level: 3 },
    { name: 'Flutter', level: 5},
    { name:'C++', level: 3}
];

const experiencesData = [
    {
        title: 'Junior Software Developer | OT Consulting',
        period: '05/2021 - 02/2023',
        details: [
            "Sviluppo e Application Maintenance di backend per cliente bancario, con interventi sul sistema ESB e microservizi Java.",
            "Sviluppo applicativo custom Java Spring Boot per notifiche degli eventi in tempo reale."
        ]
    },
    {
        title: 'Freelance Software Developer',
        period: '03/2023 - Presente',
        details: [
            "Realizzazione di siti web, API e automazioni in JavaScript, Node.js e Python.",
            "Supporto a PMI per migrazione su cloud e integrazioni con servizi esterni."
        ]
    }
];

const detailsData = [
    { label: 'GitHub', url: 'https://github.com/lucaturretti', icon: '🧑🏻‍💻' },{
        label: 'LinkedIn', url: 'https://www.linkedin.com/in/luca-turretti/', icon: '🔗'
    }
];

function renderDetails() {
    const detailsList = document.getElementById('details-list');
    if (!detailsList) return;

    detailsList.innerHTML = '';

    detailsData.forEach(detail => {
        const detailItem = document.createElement('li');
        const label = document.createElement('span');
        label.textContent = `${detail.label}: `;

        const link = document.createElement('a');
        link.href = detail.url;
        link.textContent = detail.url;
        link.target = '_blank';

        detailItem.appendChild(label);
        detailItem.appendChild(link);
        detailsList.appendChild(detailItem);
    });
}

function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;

    skillsList.innerHTML = '';

    skillsData.forEach(skill => {
        const skillBlock = document.createElement('div');
        skillBlock.className = 'skill';

        const skillName = document.createElement('span');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;

        const container = document.createElement('div');
        container.className = 'skill-bar-container';

        const bar = document.createElement('div');
        bar.className = 'skill-bar';
        bar.dataset.level = String(skill.level);

        container.appendChild(bar);
        skillBlock.appendChild(skillName);
        skillBlock.appendChild(container);
        skillsList.appendChild(skillBlock);
    });
}

function renderExperiences() {
    const experienceList = document.getElementById('experience-list');
    if (!experienceList) return;

    experienceList.innerHTML = '';
    experiencesData.forEach(exp => {
        const expCard = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = exp.title;

        const period = document.createElement('p');
        period.textContent = exp.period;

        const ul = document.createElement('ul');
        exp.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });

        expCard.appendChild(title);
        expCard.appendChild(period);
        expCard.appendChild(ul);
        experienceList.appendChild(expCard);
    });
}

function animateSkills() {
    const competenzeSection = document.querySelector('.competenze');
    if (!competenzeSection) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const skillBars = entry.target.querySelectorAll('.skill-bar-container');
            skillBars.forEach(container => {
                const bar = container.querySelector('.skill-bar');
                if (!bar) return;
                const level = parseInt(bar.dataset.level, 10) || 0;
                const skillPercentage = (level / 5) * 100 + '%';
                bar.style.setProperty('--skill-level', skillPercentage);
                bar.classList.add('is-animated');

                for (let i = 1; i <= 5; i += 1) {
                    const marker = document.createElement('span');
                    marker.className = 'skill-level-marker';
                    marker.textContent = i;
                    marker.style.left = `${(i / 5) * 100}%`;
                    if (i <= level) marker.classList.add('active');
                    container.appendChild(marker);
                }
            });

            obs.unobserve(entry.target);
        });
    }, {
        root: null,
        threshold: 0.1
    });

    observer.observe(competenzeSection);
}

function insertRipple(x, y, theme) {
    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = theme === 'dark' ? 'rgba(250, 250, 250, 0.3)' : 'rgba(17, 24, 39, 0.3)';
    const largestEdge = Math.max(window.innerWidth, window.innerHeight);
    ripple.style.width = `${largestEdge * 1.4}px`;
    ripple.style.height = `${largestEdge * 1.4}px`;
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.opacity = '0.4';
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        ripple.style.opacity = '0';
    });

    setTimeout(() => {
        ripple.remove();
    }, 450);
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const checked = currentTheme === 'dark';
    toggle.checked = checked;

    toggle.addEventListener('change', (event) => {
        const nextTheme = toggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);

        const rect = toggle.getBoundingClientRect();
        insertRipple(rect.left + rect.width / 2, rect.top + rect.height / 2, nextTheme);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDetails();
    renderExperiences();
    renderSkills();
    animateSkills();
    setupThemeToggle();
});
