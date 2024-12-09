const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const BLOCK_SIZE = 20; // 각 블록 크기
const ROWS = canvas.height / BLOCK_SIZE;
const COLUMNS = canvas.width / BLOCK_SIZE;

let snake = [{ x: 5, y: 5 }];
let direction = 'RIGHT';
let food = { x: 0, y: 0 };
let score = 0;
let gameOver = false;

// 랜덤 위치에 음식을 생성
function generateFood() {
    food.x = Math.floor(Math.random() * COLUMNS);
    food.y = Math.floor(Math.random() * ROWS);
}

// 게임판 그리기
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면을 지움

    // 뱀 그리기
    snake.forEach(segment => {
        ctx.fillStyle = "#00FF00"; // 뱀 색상
        ctx.fillRect(segment.x * BLOCK_SIZE, segment.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    });

    // 음식 그리기
    ctx.fillStyle = "#FF6347"; // 음식 색상
    ctx.fillRect(food.x * BLOCK_SIZE, food.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    // 점수 표시
    document.getElementById("score").textContent = `점수: ${score}`;
}

// 뱀을 이동시키기
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;

    snake.unshift(head); // 머리를 추가
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood(); // 음식을 먹으면 새로운 음식 생성
    } else {
        snake.pop(); // 꼬리 제거
    }
}

// 게임 오버 확인
function checkGameOver() {
    let head = snake[0];

    // 벽에 충돌하거나 자기 자신과 충돌한 경우 게임 오버
    if (head.x < 0 || head.x >= COLUMNS || head.y < 0 || head.y >= ROWS) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// 키보드 입력 처리
document.addEventListener("keydown", function(event) {
    if (gameOver) return;

    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 게임 루프
function gameLoop() {
    if (gameOver) {
        document.getElementById("gameOver").style.display = "block";
        return;
    }

    moveSnake();
    if (checkGameOver()) {
        gameOver = true;
        document.getElementById("gameOver").style.display = "block";
        return;
    }

    drawBoard();
    setTimeout(gameLoop, 100); // 0.1초마다 게임 루프 실행
}

// 게임 초기화
function resetGame() {
    snake = [{ x: 5, y: 5 }];
    direction = 'RIGHT';
    score = 0;
    gameOver = false;
    document.getElementById("gameOver").style.display = "none";
    generateFood();
    gameLoop();
}

generateFood();
resetGame();