const questions = [
    {
        question: "Câu 1. Sự khác biệt cốt lõi của Social Selling là gì?",
        answers: [
            "A. Tập trung quảng cáo trả phí",
            "B. Chào bán trực tiếp",
            "C. Xây dựng giá trị & niềm tin trước khi bán",
            "D. Loại bỏ tư vấn"
        ],
        correct: 2
    },
    {
        question: "Câu 2. Insight chuyển đổi gồm:",
        answers: [
            "A. Trend – Music – Visual",
            "B. Pain – Fear – Trigger",
            "C. Age – Gender – Location",
            "D. View – Like – Share"
        ],
        correct: 1
    },
    {
        question: "Câu 3. Vì sao video phải “đúng ngay từ đầu”?",
        answers: [
            "A. Do chi phí cao",
            "B. Người xem quyết định trong 1–3 giây",
            "C. TikTok chỉ xét 3 giây đầu",
            "D. Video sẽ bị xóa"
        ],
        correct: 1
    },
    {
        question: "Câu 4. Công thức video đúng là:",
        answers: [
            "A. Trend – Nhạc – Link",
            "B. Hook – Problem – Solution – Proof – CTA",
            "C. Intro – Giá – Mua",
            "D. Story – Joke – End"
        ],
        correct: 1
    },
    {
        question: "Câu 5. Vai trò chính của Proof là:",
        answers: [
            "A. Làm đẹp video",
            "B. Tăng thời lượng",
            "C. Tạo hiệu ứng",
            "D. Xây dựng niềm tin"
        ],
        correct: 3
    },
    {
        question: "Câu 6. Phong cách giao tiếp hiệu quả là:",
        answers: [
            "A. Quảng cáo chuyên nghiệp",
            "B. Tư vấn tự nhiên, gần gũi",
            "C. Dùng thuật ngữ khó",
            "D. Không nói"
        ],
        correct: 1
    },
    {
        question: "Câu 7. Thuật toán TikTok ưu tiên:",
        answers: [
            "A. Follower",
            "B. Completion rate & tương tác",
            "C. Video cũ",
            "D. Ads"
        ],
        correct: 1
    },
    {
        question: "Câu 8. Hành vi dễ bị ban:",
        answers: [
            "A. Video ngắn",
            "B. Sử dụng hình ảnh “before/after” để quảng cáo sản phẩm nhiều lần trên TikTok Shop",
            "C. Không rep comment",
            "D. Dùng nhạc"
        ],
        correct: 1
    },
    {
        question: "Câu 9. Vai trò của phụ đề là gì?",
        answers: [
            "A. Bắt buộc pháp lý",
            "B. Tăng chất lượng 4K",
            "C. Che lỗi",
            "D. Tăng khả năng hiểu & xem không cần âm thanh"
        ],
        correct: 3
    },
    {
        question: "Câu 10. Cách tăng click bio link:",
        answers: [
            "A. Spam link",
            "B. Không nhắc",
            "C. CTA rõ ràng + kích thích tò mò",
            "D. Bắt tự tìm"
        ],
        correct: 2
    },
    {
        question: "Câu 11. Khách nói: “Sợ mua về không hiệu quả”. Insight đúng là:",
        answers: [
            "A. Pain: thiếu tiền",
            "B. Fear: không hiệu quả, cần proof",
            "C. Trigger: giảm giá",
            "D. Pain: không biết mua"
        ],
        correct: 1
    },
    {
        question: "Câu 12. Hook nào hiệu quả nhất?",
        answers: [
            "A. “Sản phẩm này rất tốt”",
            "B. “Bạn có gặp vấn đề không?”",
            "C. “90% người đang sai ở bước này…”",
            "D. “Hôm nay review…”"
        ],
        correct: 2
    },
    {
        question: "Câu 13. Video nhiều view nhưng không có đơn, nguyên nhân chính là gì?",
        answers: [
            "A. Thiếu follower",
            "B. Không xử lý fear",
            "C. Video ngắn",
            "D. Không ads"
        ],
        correct: 1
    },
    {
        question: "Câu 14. CTA nào hiệu quả nhất?",
        answers: [
            "A. Link bio",
            "B. Mua ngay",
            "C. Comment “TƯ VẤN” để được hỗ trợ",
            "D. Xem thêm"
        ],
        correct: 2
    },
    {
        question: "Câu 15. Đâu là proof tốt nhất?",
        answers: [
            "A. Hiệu ứng đẹp",
            "B. Nhạc hay",
            "C. Feedback khách hàng thật",
            "D. Filter"
        ],
        correct: 2
    },
    {
        question: "Câu 16. Video bị “kẹt view” thường do:",
        answers: [
            "A. Thiếu follower",
            "B. Completion rate thấp",
            "C. Không chạy ads",
            "D. Caption ngắn"
        ],
        correct: 1
    }
];

// Variables
let currentQuestionIndex = 0;
let scoreViews = 0;
let correctCount = 0;
let timeLeft = 15;
let timerInterval;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const viewsDisplay = document.getElementById('views');
const questionNumDisplay = document.getElementById('current-question-num');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const inlineFeedback = document.getElementById('inline-feedback');
const timerText = document.getElementById('timer-text');
const timerBar = document.getElementById('timer-bar');
const questionContainer = document.querySelector('.question-container');

const finalViews = document.getElementById('final-views');
const finalCorrect = document.getElementById('final-correct');
const playerTitle = document.getElementById('player-title');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

function switchScreen(screenToHide, screenToShow) {
    screenToHide.classList.remove('active');
    screenToShow.classList.add('active');
}

function startGame() {
    currentQuestionIndex = 0;
    scoreViews = 0;
    correctCount = 0;
    updateScoreBoard();
    switchScreen(startScreen, quizScreen);
    loadQuestion();
}

function resetGame() {
    clearInterval(timerInterval);
    switchScreen(resultScreen, startScreen);
}

function updateScoreBoard() {
    viewsDisplay.innerText = scoreViews;
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimerUI();
    
    inlineFeedback.className = 'inline-feedback hidden';
    inlineFeedback.innerText = '';
    
    // Add fade-in effect
    questionContainer.classList.remove('fade-in-content');
    answersContainer.classList.remove('fade-in-content');
    void questionContainer.offsetWidth; // trigger reflow
    questionContainer.classList.add('fade-in-content');
    answersContainer.classList.add('fade-in-content');

    const q = questions[currentQuestionIndex];
    questionNumDisplay.innerText = currentQuestionIndex + 1;
    questionText.innerText = q.question;
    
    answersContainer.innerHTML = '';
    
    q.answers.forEach((ans, index) => {
        const btn = document.createElement('button');
        btn.classList.add('answer-btn');
        btn.innerText = ans;
        btn.addEventListener('click', () => handleAnswer(index, btn));
        answersContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    timerText.innerText = timeLeft + 's';
    const percent = (timeLeft / 15) * 100;
    timerBar.style.width = percent + '%';
}

function handleTimeout() {
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => btn.disabled = true);
    
    const q = questions[currentQuestionIndex];
    allBtns[q.correct].classList.add('correct');
    
    showFeedback(false, true);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 3000);
}

function handleAnswer(selectedIndex, btnElement) {
    clearInterval(timerInterval);
    // Disable all buttons initially
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => btn.disabled = true);

    const q = questions[currentQuestionIndex];
    const isCorrect = (selectedIndex === q.correct);

    if (isCorrect) {
        btnElement.classList.add('correct');
        scoreViews += 1000;
        correctCount++;
        showFeedback(true);
    } else {
        btnElement.classList.add('incorrect');
        // Highlight correct answer
        allBtns[q.correct].classList.add('correct');
        showFeedback(false);
    }
    
    updateScoreBoard();

    // Next question delay (3s)
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 3000);
}

function showFeedback(isCorrect, isTimeout = false) {
    inlineFeedback.className = 'inline-feedback'; // remove hidden

    if (isCorrect) {
        inlineFeedback.innerText = '🚀 LÊN XU HƯỚNG! +1000 Views';
        inlineFeedback.classList.add('feedback-success');
    } else {
        inlineFeedback.innerText = '⚠️ "FLOP" RỒI! Cố lên bạn êi';
        inlineFeedback.classList.add('feedback-error');
    }
}

function showResult() {
    switchScreen(quizScreen, resultScreen);
    
    finalViews.innerText = scoreViews;
    finalCorrect.innerText = correctCount;

    // Logic tính danh hiệu như yêu cầu
    let title = "";
    if (correctCount >= 15) {
        title = "Bậc thầy Social Selling";
    } else if (correctCount >= 11) {
        title = "Chiến thần nghìn đơn";
    } else if (correctCount >= 6) {
        title = "Idol đang lên";
    } else {
        title = "Newbie thực tập";
    }
    
    playerTitle.innerText = title;
}
