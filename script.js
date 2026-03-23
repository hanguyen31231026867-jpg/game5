const questions = [
    { question: "Câu 1. Sự khác biệt cốt lõi của Social Selling là gì?", answers: ["A. Xây dựng giá trị & niềm tin trước khi bán", "B. Tập trung quảng cáo trả phí", "C. Chào bán trực tiếp", "D. Loại bỏ tư vấn"], correct: 0 },
    { question: "Câu 2. Insight chuyển đổi gồm:", answers: ["A. Trend – Music – Visual", "B. View – Like – Share", "C. Age – Gender – Location", "D. Pain – Fear – Trigger"], correct: 3 },
    { question: "Câu 3. Vì sao video phải “đúng ngay từ đầu”?", answers: ["A. Người xem quyết định trong 1–3 giây", "B. TikTok chỉ xét 3 giây đầu", "C. Do chi phí cao", "D. Video sẽ bị xóa"], correct: 0 },
    { question: "Câu 4. Công thức video đúng là:", answers: ["A. Story – Joke – End", "B. Intro – Giá – Mua", "C. Hook – Problem – Solution – Proof – CTA", "D. Trend – Nhạc – Link"], correct: 2 },
    { question: "Câu 5. Vai trò chính của Proof là:", answers: ["A. Làm đẹp video", "B. Tăng thời lượng", "C. Tạo hiệu ứng", "D. Xây dựng niềm tin"], correct: 3 },
    { question: "Câu 6. Phong cách giao tiếp hiệu quả là:", answers: ["A. Tư vấn tự nhiên, gần gũi", "B. Quảng cáo chuyên nghiệp", "C. Dùng thuật ngữ khó", "D. Không nói"], correct: 0 },
    { question: "Câu 7. Thuật toán TikTok ưu tiên:", answers: ["A. Video cũ", "B. Ads", "C. Follower", "D. Completion rate & tương tác"], correct: 3 },
    { question: "Câu 8. Hành vi dễ bị ban:", answers: ["A. Video ngắn", "B. Dùng nhạc", "C. Sử dụng hình ảnh “before/after” để quảng cáo sản phẩm nhiều lần trên TikTok Shop", "D. Không rep comment"], correct: 2 },
    { question: "Câu 9. Vai trò của phụ đề là gì?", answers: ["A. Bắt buộc pháp lý", "B. Tăng chất lượng 4K", "C. Che lỗi", "D. Tăng khả năng hiểu & xem không cần âm thanh"], correct: 3 },
    { question: "Câu 10. Cách tăng click bio link:", answers: ["A. Spam link", "B. CTA rõ ràng + kích thích tò mò", "C. Không nhắc", "D. Bắt tự tìm"], correct: 1 },
    { question: "Câu 11. Khách nói: “Sợ mua về không hiệu quả”. Insight đúng là:", answers: ["A. Fear: không hiệu quả, cần proof", "B. Pain: thiếu tiền", "C. Trigger: giảm giá", "D. Pain: không biết mua"], correct: 0 },
    { question: "Câu 12. Hook nào hiệu quả nhất?", answers: ["A. “Sản phẩm này rất tốt”", "B. “Bạn có gặp vấn đề không?”", "C. “Hôm nay review…”", "D. “90% người đang sai ở bước này…”"], correct: 3 },
    { question: "Câu 13. Video nhiều view nhưng không có đơn, nguyên nhân chính là gì?", answers: ["A. Thiếu follower", "B. Video ngắn", "C. Không xử lý fear", "D. Không ads"], correct: 2 },
    { question: "Câu 14. CTA nào hiệu quả nhất?", answers: ["A. Link bio", "B. Comment “TƯ VẤN” để được hỗ trợ", "C. Mua ngay", "D. Xem thêm"], correct: 1 },
    { question: "Câu 15. Đâu là proof tốt nhất?", answers: ["A. Hiệu ứng đẹp", "B. Feedback khách hàng thật", "C. Nhạc hay", "D. Filter"], correct: 1 },
    { question: "Câu 16. Video bị “kẹt view” thường do:", answers: ["A. Thiếu follower", "B. Không chạy ads", "C. Completion rate thấp", "D. Caption ngắn"], correct: 2 }
];

let currentQuestionIndex = 0;
let scoreViews = 0;
let correctCount = 0;
let timeLeft = 15;
let timerInterval;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
let confettiCtx;
if(confettiCanvas) confettiCtx = confettiCanvas.getContext('2d');
const viewsDisplay = document.getElementById('views');
const questionNumDisplay = document.getElementById('current-question-num');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const timerText = document.getElementById('timer-text');
const timerBar = document.getElementById('timer-bar');
const bottomBanner = document.getElementById('bottom-banner');
const feedbackText = document.getElementById('feedback-text');
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const finalViews = document.getElementById('final-views');
const finalCorrect = document.getElementById('final-correct');
const playerTitle = document.getElementById('player-title');

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

function switchScreen(screenToHide, screenToShow) {
    screenToHide.classList.add('fade-out');
    setTimeout(() => {
        screenToHide.classList.remove('active');
        screenToHide.classList.remove('fade-out');
        screenToShow.classList.add('active');
    }, 400);
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
    
    bottomBanner.classList.remove('show');
    
    leftPanel.classList.remove('fade-in-content');
    rightPanel.classList.remove('fade-in-content');
    void leftPanel.offsetWidth;
    leftPanel.classList.add('fade-in-content');
    rightPanel.classList.add('fade-in-content');

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
    }, 4000);
}

function handleAnswer(selectedIndex, btnElement) {
    clearInterval(timerInterval);
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
        allBtns[q.correct].classList.add('correct');
        showFeedback(false);
    }
    
    updateScoreBoard();

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 4000);
}

function showFeedback(isCorrect, isTimeout = false) {
    bottomBanner.classList.add('show');
    feedbackText.className = '';

    if (isCorrect) {
        feedbackText.innerText = 'Good job! +1000 views';
        feedbackText.classList.add('text-success');
    } else {
        feedbackText.innerText = '💀 CỐ LÊN BẠN ÊI!';
        feedbackText.classList.add('text-error');
    }
}

function showResult() {
    switchScreen(quizScreen, resultScreen);
    if (!confettiCtx && confettiCanvas) confettiCtx = confettiCanvas.getContext('2d');
    
    animateValue(finalViews, 0, scoreViews, 1500);
    animateValue(finalCorrect, 0, correctCount, 1500);

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

    if (correctCount >= 11) {
        startConfetti();
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Simple Confetti Implementation
let confettiParticles = [];
let confettiAnimationId;

function startConfetti() {
    confettiCanvas.width = resultScreen.offsetWidth || window.innerWidth;
    confettiCanvas.height = resultScreen.offsetHeight || window.innerHeight;
    confettiParticles = [];
    
    for(let i=0; i<150; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 4,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 + 2,
            color: Math.random() > 0.5 ? '#FE2C55' : '#25F4EE',
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
            tiltAngle: 0
        });
    }
    
    if(confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    renderConfetti();

    setTimeout(() => {
        cancelAnimationFrame(confettiAnimationId);
        confettiCtx.clearRect(0,0, confettiCanvas.width, confettiCanvas.height);
    }, 3000);
}

function renderConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.tiltAngle) + p.dy);
        p.x += Math.sin(p.tiltAngle) * 2;

        confettiCtx.beginPath();
        confettiCtx.lineWidth = p.r;
        confettiCtx.strokeStyle = p.color;
        confettiCtx.moveTo(p.x + p.tilt + p.r, p.y);
        confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        confettiCtx.stroke();
    });
    confettiAnimationId = requestAnimationFrame(renderConfetti);
}
