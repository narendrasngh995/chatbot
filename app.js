// SDEC Nexus AI - Main Application Logic

class SDECNexusApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.theme = 'dark';
        this.chatHistory = [];
        this.studyMaterials = [];
        this.exams = [];
        this.tasks = [];
        this.notices = [];
        this.studentProfile = {
            name: 'Student',
            branch: '',
            semester: ''
        };

        this.init();
    }

    init() {
        this.loadFromStorage();
        this.initializeData();
        this.setupEventListeners();
        this.updateDashboard();
    }

    // === Knowledge Base ===
    knowledgeBase = {
        // AKTU Information
        aktu: {
            keywords: ['aktu', 'university', 'apj', 'abdul kalam'],
            responses: [
                {
                    trigger: ['what is aktu', 'about aktu', 'tell me about aktu'],
                    answer: `**Dr. A.P.J. Abdul Kalam Technical University (AKTU)**

AKTU, formerly known as Uttar Pradesh Technical University (UPTU), is a public collegiate university in Lucknow, Uttar Pradesh, India. It was established in 2000 and renamed in 2015.

**Key Facts:**
• One of the largest technical universities in India
• Affiliates over 800 colleges across Uttar Pradesh
• Offers B.Tech, M.Tech, MBA, MCA, and Pharmacy programs
• Named after India's former President Dr. A.P.J. Abdul Kalam
• AKTU conducts semester examinations for all affiliated colleges

**Official Website:** https://aktu.ac.in

Is there something specific about AKTU you'd like to know?`
                },
                {
                    trigger: ['aktu exam', 'examination', 'exam pattern'],
                    answer: `**AKTU Examination System**

AKTU follows a semester-based examination system:

**Internal Assessment (30 marks):**
• Mid-semester exam: 15 marks
• Assignments/Quizzes: 10 marks
• Attendance: 5 marks

**End Semester Exam (70 marks):**
• Duration: 3 hours
• Theory papers: 70 marks
• Practical/Lab exams: As per course structure

**Grading System:**
• O (Outstanding): 90-100
• A+ (Excellent): 80-89
• A (Very Good): 70-79
• B+ (Good): 60-69
• B (Above Average): 50-59
• C (Average): 40-49
• F (Fail): Below 40

For the latest exam schedule, check the official AKTU website.`
                },
                {
                    trigger: ['aktu result', 'check result', 'result date'],
                    answer: `**AKTU Results**

To check your AKTU results:

1. Visit the official AKTU website: https://aktu.ac.in
2. Navigate to the "Results" section
3. Select your program (B.Tech, M.Tech, etc.)
4. Enter your Roll Number
5. Submit to view your result

**Important Notes:**
• Results are typically announced 30-45 days after exams
• For the exact result date, check official AKTU notifications
• Keep your enrollment number and date of birth ready
• Download and save your result immediately

**Note:** I cannot provide the exact result date as it varies each semester. Please check the official AKTU website or your college notice board for announcements.`
                }
            ]
        },

        // SDEC Information
        sdec: {
            keywords: ['sdec', 'sunder deep', 'college', 'campus'],
            responses: [
                {
                    trigger: ['about sdec', 'what is sdec', 'sunder deep'],
                    answer: `**Sunder Deep Engineering College (SDEC)**

Sunder Deep Engineering College is an AKTU-affiliated engineering college offering quality technical education.

**Programs Offered (Subject to Verification):**
• Computer Science & Engineering (CSE)
• Computer Science with AI & ML (CSE-AIML)
• Information Technology
• Electronics & Communication Engineering
• Mechanical Engineering
• Civil Engineering
• Electrical Engineering

**Note:** This is demonstration data. For verified information about available programs, admission procedures, and facilities, please:
• Visit the official SDEC website
• Contact the college administration directly
• Check the latest AKTU affiliation records

Would you like to know about any specific department or facility?`
                },
                {
                    trigger: ['admission', 'how to get admission', 'eligibility'],
                    answer: `**SDEC Admission Information (General Guidelines)**

**B.Tech Eligibility:**
• Passed 10+2 with Physics, Chemistry, and Mathematics
• Minimum 45% marks (40% for reserved categories)
• Valid entrance exam score (JEE Main/UPSEE)

**Admission Process (Typical):**
1. Qualify entrance examination
2. Participate in AKTU counseling
3. Choice filling and seat allocation
4. Document verification
5. Fee payment and enrollment

**Required Documents (Typical):**
• 10th & 12th mark sheets
• Transfer certificate
• Migration certificate
• Character certificate
• Entrance exam scorecard
• Caste certificate (if applicable)
• Aadhar card and photographs

**Important:** This is general information. For current admission procedures, fees, and important dates, please contact the SDEC admission office directly or visit their official website.`
                }
            ]
        },

        // Computer Science Topics
        computerScience: {
            keywords: ['programming', 'data structure', 'algorithm', 'coding', 'computer', 'software'],
            responses: [
                {
                    trigger: ['data structure', 'linked list', 'array', 'stack', 'queue'],
                    answer: `**Data Structures - Quick Guide**

**What are Data Structures?**
Data structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently.

**Common Data Structures:**

**1. Array:**
• Fixed-size collection of elements
• Fast access by index
• Example: int arr[5] = {1, 2, 3, 4, 5};

**2. Linked List:**
• Dynamic size, elements connected by pointers
• Efficient insertion/deletion
• Types: Singly, Doubly, Circular

**3. Stack:**
• Last In First Out (LIFO)
• Operations: push, pop, peek
• Uses: Function calls, undo operations

**4. Queue:**
• First In First Out (FIFO)
• Operations: enqueue, dequeue
• Uses: Task scheduling, breadth-first search

**5. Tree:**
• Hierarchical structure
• Binary Tree, BST, AVL Tree
• Uses: File systems, databases

**6. Graph:**
• Nodes connected by edges
• Uses: Social networks, maps, routing

**Exam Tip:** Focus on implementation, time complexity, and real-world applications of each data structure.

Would you like a detailed explanation of any specific data structure?`
                },
                {
                    trigger: ['algorithm', 'sorting', 'searching', 'complexity'],
                    answer: `**Algorithms - Essential Concepts**

**What is an Algorithm?**
A step-by-step procedure for solving a problem or performing a computation.

**Common Algorithms:**

**Sorting Algorithms:**
• Bubble Sort: O(n²) - Simple but inefficient
• Selection Sort: O(n²) - Finds minimum repeatedly
• Insertion Sort: O(n²) - Builds sorted array gradually
• Merge Sort: O(n log n) - Divide and conquer
• Quick Sort: O(n log n) avg - Very efficient in practice

**Searching Algorithms:**
• Linear Search: O(n) - Check each element
• Binary Search: O(log n) - Works on sorted arrays

**Time Complexity:**
• O(1) - Constant time
• O(log n) - Logarithmic
• O(n) - Linear
• O(n log n) - Linearithmic
• O(n²) - Quadratic
• O(2ⁿ) - Exponential

**Space Complexity:**
Memory used by an algorithm relative to input size.

**Exam Strategy:**
1. Understand logic, not just memorize
2. Practice tracing with examples
3. Know time and space complexity
4. Write clean, commented code

Need help with a specific algorithm?`
                },
                {
                    trigger: ['oops', 'object oriented', 'class', 'inheritance'],
                    answer: `**Object-Oriented Programming (OOP)**

**Core Concepts:**

**1. Class and Object:**
• Class: Blueprint for creating objects
• Object: Instance of a class
\`\`\`
class Student {
    String name;
    int rollNo;
}
Student s1 = new Student();
\`\`\`

**2. Encapsulation:**
• Bundling data and methods together
• Data hiding using private access modifiers
• Access through getters and setters

**3. Inheritance:**
• Acquiring properties from parent class
• Promotes code reusability
• Types: Single, Multiple, Multilevel, Hierarchical

**4. Polymorphism:**
• One interface, multiple implementations
• Method Overloading: Same name, different parameters
• Method Overriding: Redefining parent class method

**5. Abstraction:**
• Hiding implementation details
• Abstract classes and interfaces
• Focus on what object does, not how

**Benefits:**
• Code reusability
• Modularity
• Easier maintenance
• Better organization

**Exam Focus:** Be ready to write code examples and explain real-world applications of each concept.`
                }
            ]
        },

        // Study and Exam Help
        studyHelp: {
            keywords: ['study', 'prepare', 'exam', 'revision', 'learn'],
            responses: [
                {
                    trigger: ['how to study', 'study tips', 'preparation'],
                    answer: `**Effective Study Strategies for Engineering**

**1. Time Management:**
• Create a realistic study timetable
• Prioritize subjects based on difficulty and exam dates
• Use the Pomodoro Technique: 25 min study, 5 min break

**2. Active Learning:**
• Don't just read - write, explain, teach
• Make your own notes in simple language
• Create mind maps for complex topics
• Practice numerical problems yourself

**3. For Theory Subjects:**
• Understand concepts, don't memorize blindly
• Create short notes for quick revision
• Use acronyms and mnemonics
• Explain topics in your own words

**4. For Practical Subjects:**
• Practice coding daily
• Implement data structures from scratch
• Solve previous year questions
• Debug and understand errors

**5. Revision Strategy:**
• Revise within 24 hours of learning
• Weekly revision of all topics
• Focus on weak areas
• Final revision 2-3 days before exam

**6. Exam Day Tips:**
• Read questions carefully
• Attempt known questions first
• Manage time (don't spend too long on one question)
• Leave space for corrections

Would you like a personalized study plan?`
                },
                {
                    trigger: ['exam preparation', 'prepare for exam', 'exam tips'],
                    answer: `**AKTU Exam Preparation Guide**

**Timeline: 30 Days Before Exam**

**Week 1-2: Foundation**
• Complete syllabus overview
• Identify important topics (use PYQs)
• Start making short notes
• Focus on understanding, not speed

**Week 3: Deep Dive**
• Study unit-wise in detail
• Solve numerical problems
• Practice diagrams and derivations
• Clarify doubts immediately

**Week 4: Intensive Revision**
• Revise all units twice
• Solve previous year papers (minimum 5)
• Time yourself while solving
• Practice writing answers in exam format

**Last 3 Days:**
• Revise short notes only
• Practice important diagrams
• Memorize definitions and formulas
• Stay calm and confident

**Subject-Specific Tips:**

**Theory Subjects:**
• Focus on unit-wise important questions
• Write definitions exactly as in textbooks
• Draw neat, labeled diagrams
• Attempt all questions

**Numerical Subjects:**
• Practice at least 50 problems per subject
• Remember formulas and their applications
• Show all steps clearly
• Double-check calculations

**Programming:**
• Practice code writing on paper
• Remember syntax and library functions
• Explain logic in comments
• Test with sample inputs

Remember: Consistent effort beats last-minute cramming!`
                }
            ]
        },

        // General Academic
        general: {
            keywords: ['help', 'question', 'doubt'],
            responses: [
                {
                    trigger: ['hello', 'hi', 'hey'],
                    answer: `Hello! Welcome to SDEC Nexus AI. I'm here to help you with:

• AKTU exam information and preparation
• SDEC college information
• Study materials and resources
• Exam planning and scheduling
• Academic doubts and concepts
• Programming and technical topics

How can I assist you today?`
                },
                {
                    trigger: ['thanks', 'thank you'],
                    answer: `You're welcome! Happy to help. Feel free to ask if you have more questions. Good luck with your studies! 📚`
                }
            ]
        }
    };

    // === Chatbot Logic ===
    findResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();

        // Search through all categories
        for (const category in this.knowledgeBase) {
            const { responses } = this.knowledgeBase[category];

            for (const responseItem of responses) {
                // Check if any trigger matches
                const matched = responseItem.trigger.some(trigger =>
                    message.includes(trigger.toLowerCase())
                );

                if (matched) {
                    return responseItem.answer;
                }
            }
        }

        // Keyword-based category detection
        if (message.includes('aktu') || message.includes('university')) {
            return `I can help you with AKTU-related questions! Try asking:
• What is AKTU?
• AKTU exam pattern
• How to check AKTU results
• AKTU examination system

Or ask me something specific about AKTU.`;
        }

        if (message.includes('sdec') || message.includes('college')) {
            return `I can provide information about SDEC! Try asking:
• About SDEC
• SDEC admission process
• Available branches
• College facilities

What would you like to know about SDEC?`;
        }

        if (message.includes('study') || message.includes('prepare')) {
            return `I can help you with study strategies! Try asking:
• How to prepare for exams
• Study tips for engineering
• Time management strategies
• Revision techniques

What aspect of studying would you like help with?`;
        }

        if (message.includes('program') || message.includes('code')) {
            return `I can help with programming concepts! Try asking:
• Explain data structures
• Algorithm complexity
• OOP concepts
• Specific programming doubts

What programming topic would you like to learn about?`;
        }

        // Default response
        return `I'm here to help with academic questions! I can assist you with:

**AKTU Information:**
• Examination system and patterns
• Results and grading
• University policies

**SDEC College:**
• Courses and departments
• Admission information
• Campus facilities

**Study Help:**
• Exam preparation strategies
• Subject explanations
• Time management

**Technical Topics:**
• Data Structures & Algorithms
• Programming concepts
• Computer Science subjects

**Other Features:**
• Browse study materials in the Library
• Plan your exams in the Planner
• Check official notices

Please ask me a specific question, and I'll do my best to help!`;
    }

    sendMessage(message) {
        if (!message.trim()) return;

        // Add user message to chat
        this.addChatMessage('user', message);

        // Show typing indicator
        setTimeout(() => {
            const response = this.findResponse(message);
            this.addChatMessage('bot', response);

            // Save chat history
            this.chatHistory.push({
                user: message,
                bot: response,
                timestamp: new Date().toISOString()
            });
            this.saveToStorage();
        }, 500);
    }

    addChatMessage(type, message) {
        const chatMessages = document.getElementById('chat-messages');

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = type === 'bot' ? 'AI' : 'U';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        // Format message with markdown-like syntax
        const formattedMessage = this.formatMessage(message);
        bubble.innerHTML = formattedMessage;

        if (type === 'bot') {
            const actions = document.createElement('div');
            actions.className = 'chat-actions';

            const copyBtn = document.createElement('button');
            copyBtn.className = 'chat-action-btn';
            copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"></path>
                </svg>
                Copy
            `;
            copyBtn.onclick = () => this.copyMessage(message);

            actions.appendChild(copyBtn);
            bubble.appendChild(actions);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(message) {
        // Convert markdown-like syntax to HTML
        let formatted = message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bull;')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        return `<p>${formatted}</p>`;
    }

    copyMessage(message) {
        navigator.clipboard.writeText(message.replace(/\*\*/g, ''));
        // Could add a toast notification here
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            this.sendMessage(message);
            input.value = '';
            input.style.height = 'auto';
        }
    }

    handleChatKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendChatMessage();
        }
    }

    clearChat() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = `
            <div class="chat-welcome">
                <div class="welcome-avatar">
                    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="28" fill="url(#grad3)"/>
                        <path d="M32 8L8 20V44L32 56L56 44V20L32 8Z" stroke="white" stroke-width="2" fill="none"/>
                        <circle cx="32" cy="32" r="8" fill="white"/>
                        <defs>
                            <linearGradient id="grad3" x1="4" y1="4" x2="60" y2="60">
                                <stop offset="0%" stop-color="#667eea"/>
                                <stop offset="100%" stop-color="#764ba2"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Hello! I'm your SDEC Nexus AI Assistant</h3>
                <p>I can help you with academic questions, course materials, exam preparation, AKTU information, and more. How can I assist you today?</p>
                <div class="suggested-prompts">
                    <button class="prompt-chip" onclick="app.sendMessage('What is AKTU?')">What is AKTU?</button>
                    <button class="prompt-chip" onclick="app.sendMessage('Help me prepare for exams')">Help me prepare for exams</button>
                    <button class="prompt-chip" onclick="app.sendMessage('Explain data structures')">Explain data structures</button>
                    <button class="prompt-chip" onclick="app.sendMessage('Show exam timetable')">Show exam timetable</button>
                </div>
            </div>
        `;
        this.chatHistory = [];
        this.saveToStorage();
    }

    // === Navigation ===
    navigateTo(page) {
        // Update active page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        // Update navigation items
        document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        this.currentPage = page;

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 1024) {
            this.sidebar.classList.remove('show');
        }

        // Update page-specific content
        if (page === 'library') {
            this.renderLibrary();
        } else if (page === 'planner') {
            this.renderPlanner();
        } else if (page === 'notices') {
            this.renderNotices();
        } else if (page === 'dashboard') {
            this.updateDashboard();
        }
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('show');
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.body.className = `${this.theme}-theme`;
        this.saveToStorage();
    }

    enterApp() {
        document.getElementById('landing-screen').classList.remove('active');
        document.getElementById('main-app').classList.add('active');
    }

    // === Student Profile ===
    updateProfile() {
        const name = document.getElementById('student-name');
        const branch = document.getElementById('student-branch').value;
        const semester = document.getElementById('student-semester').value;

        this.studentProfile.branch = branch;
        this.studentProfile.semester = semester;

        this.saveToStorage();
        this.updateDashboard();
        this.renderLibrary();
    }

    // === Dashboard ===
    updateDashboard() {
        // Update stats
        document.getElementById('stat-materials').textContent = this.studyMaterials.length;
        document.getElementById('stat-exams').textContent = this.exams.length;
        document.getElementById('stat-notices').textContent = this.notices.filter(n => {
            const noticeDate = new Date(n.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return noticeDate > weekAgo;
        }).length;

        // Update deadlines
        this.renderDashboardDeadlines();
    }

    renderDashboardDeadlines() {
        const container = document.getElementById('dashboard-deadlines');
        const upcomingExams = this.exams
            .filter(e => new Date(e.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        if (upcomingExams.length === 0) {
            container.innerHTML = '<div class="empty-state">No upcoming deadlines</div>';
            return;
        }

        container.innerHTML = upcomingExams.map(exam => `
            <div class="deadline-item">
                <div>
                    <div style="font-weight: 500;">${exam.subject}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${exam.type}</div>
                </div>
                <div style="font-size: 0.85rem; color: var(--accent-primary);">
                    ${this.formatDate(exam.date)}
                </div>
            </div>
        `).join('');
    }

    // === Study Library ===
    renderLibrary() {
        const container = document.getElementById('library-content');
        let filtered = this.studyMaterials;

        // Apply filters
        const branchFilter = document.getElementById('filter-branch').value;
        const semesterFilter = document.getElementById('filter-semester').value;
        const searchFilter = document.getElementById('filter-search').value.toLowerCase();

        if (branchFilter) {
            filtered = filtered.filter(m => m.branch === branchFilter);
        }
        if (semesterFilter) {
            filtered = filtered.filter(m => m.semester === semesterFilter);
        }
        if (searchFilter) {
            filtered = filtered.filter(m =>
                m.title.toLowerCase().includes(searchFilter) ||
                m.subject.toLowerCase().includes(searchFilter) ||
                (m.description && m.description.toLowerCase().includes(searchFilter))
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card" style="grid-column: 1 / -1;">
                    <div class="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-bottom: 1rem; opacity: 0.3;">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z" stroke-width="2"/>
                        </svg>
                        <p>No study materials found for the selected filters.</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your filters or add materials from the Admin Panel.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(material => `
            <div class="material-card">
                <div class="material-header">
                    <span class="material-type">${material.type}</span>
                </div>
                <h4 class="material-title">${material.title}</h4>
                <div class="material-meta">
                    <span>${material.branch}</span>
                    <span>•</span>
                    <span>Semester ${material.semester}</span>
                    <span>•</span>
                    <span>${material.subject}</span>
                </div>
                ${material.description ? `<p class="material-description">${material.description}</p>` : ''}
                <div class="material-actions">
                    <button class="material-btn" onclick="app.viewMaterial('${material.id}')">
                        View
                    </button>
                    <button class="material-btn" onclick="app.bookmarkMaterial('${material.id}')">
                        Bookmark
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterLibrary() {
        this.renderLibrary();
    }

    viewMaterial(id) {
        const material = this.studyMaterials.find(m => m.id === id);
        if (material) {
            alert(`Viewing: ${material.title}\n\nIn a production version, this would open the study material file or display its contents.`);
        }
    }

    bookmarkMaterial(id) {
        alert('Material bookmarked! (This feature saves materials for quick access)');
    }

    // === Exam Planner ===
    addExam(event) {
        event.preventDefault();

        const subject = document.getElementById('exam-subject').value;
        const date = document.getElementById('exam-date').value;
        const type = document.getElementById('exam-type').value;

        const exam = {
            id: Date.now().toString(),
            subject,
            date,
            type,
            created: new Date().toISOString()
        };

        this.exams.push(exam);
        this.saveToStorage();
        this.renderPlanner();
        this.updateDashboard();

        event.target.reset();
    }

    deleteExam(id) {
        this.exams = this.exams.filter(e => e.id !== id);
        this.saveToStorage();
        this.renderPlanner();
        this.updateDashboard();
    }

    renderPlanner() {
        const examList = document.getElementById('exam-list');

        const upcomingExams = this.exams
            .filter(e => new Date(e.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingExams.length === 0) {
            examList.innerHTML = '<div class="empty-state">No upcoming exams scheduled</div>';
        } else {
            examList.innerHTML = upcomingExams.map(exam => {
                const daysUntil = this.getDaysUntil(exam.date);
                return `
                    <div class="exam-item">
                        <div class="exam-info">
                            <div class="exam-subject">${exam.subject}</div>
                            <div class="exam-meta">${exam.type} • ${this.formatDate(exam.date)}</div>
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <div class="exam-countdown">${daysUntil} days</div>
                            <button class="delete-btn" onclick="app.deleteExam('${exam.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 6L6 18M6 6l12 12" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        this.renderTasks();
    }

    addTask(event) {
        event.preventDefault();

        const text = document.getElementById('task-input').value;

        const task = {
            id: Date.now().toString(),
            text,
            completed: false,
            created: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveToStorage();
        this.renderTasks();

        event.target.reset();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToStorage();
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');

        if (this.tasks.length === 0) {
            taskList.innerHTML = '<div class="empty-state">No tasks for today</div>';
            return;
        }

        taskList.innerHTML = this.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-info" style="display: flex; gap: 0.75rem; align-items: center; flex: 1;">
                    <input
                        type="checkbox"
                        ${task.completed ? 'checked' : ''}
                        onchange="app.toggleTask('${task.id}')"
                        style="width: 18px; height: 18px; cursor: pointer;"
                    >
                    <div class="task-text">${task.text}</div>
                </div>
                <button class="delete-btn" onclick="app.deleteTask('${task.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    // === Notices ===
    switchNoticeTab(tab) {
        document.querySelectorAll('.notices-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        this.currentNoticeTab = tab;
        this.renderNotices();
    }

    renderNotices() {
        const container = document.getElementById('notices-content');
        let filtered = this.notices;

        const tab = this.currentNoticeTab || 'all';
        if (tab !== 'all') {
            filtered = filtered.filter(n => {
                if (tab === 'sdec') return n.org === 'SDEC';
                if (tab === 'aktu') return n.org === 'AKTU';
                if (tab === 'exam') return n.category === 'exam';
                return true;
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div class="empty-state">
                        <p>No notices available in this category.</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check back later for updates or add notices from the Admin Panel.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(notice => `
            <div class="notice-card">
                <div class="notice-header">
                    <span class="notice-badge">${notice.org}</span>
                </div>
                <h3 class="notice-title">${notice.title}</h3>
                <div class="notice-meta">
                    ${notice.category} • ${this.formatDate(notice.date)}
                </div>
                <p class="notice-description">${notice.description}</p>
                ${notice.url ? `
                    <a href="${notice.url}" target="_blank" class="notice-link">
                        View Official Notice
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke-width="2"/>
                        </svg>
                    </a>
                ` : ''}
            </div>
        `).join('');
    }

    // === Admin Panel ===
    switchAdminTab(tab) {
        document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`admin-${tab}`).classList.add('active');

        if (tab === 'knowledge') {
            this.updateKnowledgeStats();
        }
    }

    addMaterial(event) {
        event.preventDefault();

        const material = {
            id: Date.now().toString(),
            title: document.getElementById('material-title').value,
            branch: document.getElementById('material-branch').value,
            semester: document.getElementById('material-semester').value,
            subject: document.getElementById('material-subject').value,
            type: document.getElementById('material-type').value,
            description: document.getElementById('material-description').value,
            created: new Date().toISOString()
        };

        this.studyMaterials.push(material);
        this.saveToStorage();
        this.updateDashboard();

        event.target.reset();
        alert('Study material added successfully!');
    }

    addNotice(event) {
        event.preventDefault();

        const notice = {
            id: Date.now().toString(),
            title: document.getElementById('notice-title').value,
            org: document.getElementById('notice-org').value,
            category: document.getElementById('notice-category').value,
            description: document.getElementById('notice-description').value,
            url: document.getElementById('notice-url').value,
            date: new Date().toISOString()
        };

        this.notices.push(notice);
        this.saveToStorage();
        this.updateDashboard();

        event.target.reset();
        alert('Notice published successfully!');
    }

    updateKnowledgeStats() {
        let topicCount = 0;
        let responseCount = 0;

        for (const category in this.knowledgeBase) {
            const { responses } = this.knowledgeBase[category];
            topicCount++;
            responseCount += responses.length;
        }

        document.getElementById('kb-topics').textContent = topicCount;
        document.getElementById('kb-responses').textContent = responseCount;
    }

    // === Utility Functions ===
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    getDaysUntil(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(dateString);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // === Local Storage ===
    saveToStorage() {
        const data = {
            theme: this.theme,
            studentProfile: this.studentProfile,
            chatHistory: this.chatHistory,
            studyMaterials: this.studyMaterials,
            exams: this.exams,
            tasks: this.tasks,
            notices: this.notices
        };
        localStorage.setItem('sdecNexusData', JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('sdecNexusData');
        if (stored) {
            const data = JSON.parse(stored);
            this.theme = data.theme || 'dark';
            this.studentProfile = data.studentProfile || this.studentProfile;
            this.chatHistory = data.chatHistory || [];
            this.studyMaterials = data.studyMaterials || [];
            this.exams = data.exams || [];
            this.tasks = data.tasks || [];
            this.notices = data.notices || [];

            document.body.className = `${this.theme}-theme`;

            if (this.studentProfile.branch) {
                document.getElementById('student-branch').value = this.studentProfile.branch;
            }
            if (this.studentProfile.semester) {
                document.getElementById('student-semester').value = this.studentProfile.semester;
            }
        }
    }

    // === Demo Data Initialization ===
    initializeData() {
        // Add demo materials if none exist
        if (this.studyMaterials.length === 0) {
            this.studyMaterials = [
                {
                    id: '1',
                    title: 'Data Structures & Algorithms - Complete Notes',
                    branch: 'CSE',
                    semester: '3',
                    subject: 'Data Structures',
                    type: 'notes',
                    description: 'Comprehensive notes covering arrays, linked lists, stacks, queues, trees, and graphs with examples.'
                },
                {
                    id: '2',
                    title: 'OOP Previous Year Questions',
                    branch: 'CSE',
                    semester: '3',
                    subject: 'Object Oriented Programming',
                    type: 'pyq',
                    description: 'Collection of previous year questions from 2019-2024 with solutions.'
                },
                {
                    id: '3',
                    title: 'Digital Electronics Lab Manual',
                    branch: 'ECE',
                    semester: '4',
                    subject: 'Digital Electronics',
                    type: 'practical',
                    description: 'Complete practical file with circuit diagrams and observations.'
                },
                {
                    id: '4',
                    title: 'DBMS Quick Revision Notes',
                    branch: 'CSE',
                    semester: '5',
                    subject: 'Database Management Systems',
                    type: 'revision',
                    description: 'Short notes for quick revision covering normalization, SQL, and transactions.'
                }
            ];
        }

        // Add demo notices if none exist
        if (this.notices.length === 0) {
            this.notices = [
                {
                    id: '1',
                    title: 'End Semester Examination Form Submission',
                    org: 'AKTU',
                    category: 'exam',
                    description: 'Students are required to fill the examination form for odd semester 2024-25 before the last date. Late fee will be applicable after the deadline.',
                    url: 'https://aktu.ac.in',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: '2',
                    title: 'Technical Fest Registration Open',
                    org: 'SDEC',
                    category: 'general',
                    description: 'Annual technical fest "TechXpo 2025" registration is now open. Participate in coding competitions, hackathons, and tech talks.',
                    url: '',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: '3',
                    title: 'Academic Calendar for Even Semester 2024-25',
                    org: 'AKTU',
                    category: 'academic',
                    description: 'The academic calendar for even semester 2024-25 has been released. Check important dates for internals, practicals, and end semester exams.',
                    url: 'https://aktu.ac.in',
                    date: new Date().toISOString()
                }
            ];
        }

        this.saveToStorage();
    }

    // === Event Listeners ===
    setupEventListeners() {
        this.sidebar = document.getElementById('sidebar');

        // Navigation
        document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });

        // Auto-resize chat input
        const chatInput = document.getElementById('chat-input');
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!this.sidebar.contains(e.target) &&
                    !e.target.closest('.sidebar-toggle')) {
                    this.sidebar.classList.remove('show');
                }
            }
        });
    }
}

// Initialize app
const app = new SDECNexusApp();
