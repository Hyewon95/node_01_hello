// 노드는 브라우저 밖에서 실행되므로 터미널 창에서 실행한다
var express = require('express'); // html 문서의 <script src="../js/script.js"></script>와 같은 역할. 단, 경로가 없음. var express = require('express/index.js');와 같이 작성 가능
var app = express();
var path = require('path'); 
// console.log(app);

// express에서 서버를 만드는 명령 : listen
app.listen(3000, function(){ // 3000 포트를 노드 포트로 만들겠다
    console.log('http://127.0.0.1:3000'); // 노드 창에 주소가 적혀있다면 서버가 돌고 있다는 의미이다
});

// POST방식으로 요청을 받으려면 기본적으로 들어가야 할 내용
app.use(express.json()); // post방식으로 들어오는 모든 request를 자바스크립트가 읽을 수 있도록 json 형태의 계층 구조로 만들어준다
app.use(express.urlencoded({extended: false}));

// path.join()  : 두 인자를 결합시켜준다.
// __dirname : 노드가 지원하는 글로벌 변수로 현재 디렉토리를 절대 경로로 보여준다
// console.log(path.join(__dirname, './public'));
app.use('/', express.static(path.join(__dirname, './public')));

// 1. get 방식
// get방식으로 /hello에 요청이 들어오면 다음과 같이 응답한다 서버가 구동되고 있는 현재, 다음의 수정된 내용까지 브라우저에 반영하기 위해서는 노드 창에서 나왔다가 다시 들어가줘야 한다
app.get('/hello', function(req, res){ // req : 요청과 관련된 모든게 담겨 있는 객체, res : 응답과 관련된 모든게 담겨 있는 객체
    res.send('<html><head><title>Hi</title></head><body><h1>Hello World</h1></body></html>');
});

app.get('/sample', function(req, res){
    var title='샘플페이지';
    var content='Hello 샘플';
    var html=`
    <!DOCTYPE html>
    <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1>${content}</h1>
        </body>
    </html>
    `;
    res.send(html);
});

// 2. query 방식
app.get('/search', function(req, res){
    var q = req.query.q;
    res.send(`<h1>당신이 요청한 쿼리는 ${q}입니다.</h1>`);
});

// 3. params 방식
app.get('/user/:id', function(req, res){
    var id = req.params.id;
    res.send(`<h1>안녕하세요! ${id}님</h1>`);
});

// 4. post 방식
app.post('/join', function(req, res){
    var userid = req.body.userid;
    var userpw = req.body.userpw;
    res.send(`<h1>${userid} / ${userpw}</h1>`);
});